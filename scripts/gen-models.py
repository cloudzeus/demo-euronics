#!/usr/bin/env python3
"""Builds to-scale AR boxes (GLB for Android/WebXR, USDZ for iOS Quick Look)
for every product in models.json: a W×H×D box (metres) standing on the floor,
the product photo on the front face, neutral sides. Textures ≤ 512px so each
model stays ~50 KB.
Usage: python3 scripts/gen-models.py models.json public/models
Needs: pillow, usd-core (pip)."""
import json, os, struct, sys, tempfile
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
rows = json.load(open(src))

def face_texture(row, w, h):
    """Front texture with the face's aspect ratio: cutout (or photo) contained on white."""
    path = "public" + (row["cutout"] or row["image"])
    im = Image.open(path).convert("RGBA")
    W = 512; H = max(64, min(1024, int(512 * h / w)))
    canvas = Image.new("RGB", (W, H), (245, 245, 245))
    im.thumbnail((int(W * 0.96), int(H * 0.96)))
    canvas.paste(im, ((W - im.width) // 2, (H - im.height) // 2), im if im.mode == "RGBA" else None)
    return canvas

def box_geometry(w, h, d):
    """Returns (front, rest) each as (positions, normals, uvs, indices). Y up, floor at y=0, front at +z."""
    x, y, z = w / 2, h, d / 2
    def quad(p0, p1, p2, p3, n):
        return [p0, p1, p2, p3], [n] * 4, [(0, 1), (1, 1), (1, 0), (0, 0)], [0, 1, 2, 0, 2, 3]
    faces = {
        "front": quad((-x, 0, z), (x, 0, z), (x, y, z), (-x, y, z), (0, 0, 1)),
        "back": quad((x, 0, -z), (-x, 0, -z), (-x, y, -z), (x, y, -z), (0, 0, -1)),
        "left": quad((-x, 0, -z), (-x, 0, z), (-x, y, z), (-x, y, -z), (-1, 0, 0)),
        "right": quad((x, 0, z), (x, 0, -z), (x, y, -z), (x, y, z), (1, 0, 0)),
        "top": quad((-x, y, z), (x, y, z), (x, y, -z), (-x, y, -z), (0, 1, 0)),
        "bottom": quad((-x, 0, -z), (x, 0, -z), (x, 0, z), (-x, 0, z), (0, -1, 0)),
    }
    front = faces["front"]
    P, N, U, I = [], [], [], []
    for k in ("back", "left", "right", "top", "bottom"):
        p, n, u, i = faces[k]
        base = len(P)
        P += p; N += n; U += u; I += [base + j for j in i]
    return front, (P, N, U, I)

def pack(fmt, items):
    return b"".join(struct.pack(fmt, *it) if isinstance(it, tuple) else struct.pack(fmt, it) for it in items)

def write_glb(path, w, h, d, tex: Image.Image):
    front, rest = box_geometry(w, h, d)
    buf = bytearray(); views = []; accessors = []
    def add_view(data, target=None):
        while len(buf) % 4: buf.append(0)
        views.append({"buffer": 0, "byteOffset": len(buf), "byteLength": len(data), **({"target": target} if target else {})})
        buf.extend(data); return len(views) - 1
    def add_acc(view, ctype, count, atype, mn=None, mx=None):
        a = {"bufferView": view, "componentType": ctype, "count": count, "type": atype}
        if mn is not None: a["min"], a["max"] = mn, mx
        accessors.append(a); return len(accessors) - 1
    prims = []
    for (P, N, U, I), mat in ((front, 0), (rest, 1)):
        pv = add_view(pack("<3f", P), 34962); nv = add_view(pack("<3f", N), 34962); uv = add_view(pack("<2f", U), 34962); iv = add_view(pack("<H", I), 34963)
        mn = [min(p[k] for p in P) for k in range(3)]; mx = [max(p[k] for p in P) for k in range(3)]
        prims.append({"attributes": {"POSITION": add_acc(pv, 5126, len(P), "VEC3", mn, mx), "NORMAL": add_acc(nv, 5126, len(N), "VEC3"), "TEXCOORD_0": add_acc(uv, 5126, len(U), "VEC2")}, "indices": add_acc(iv, 5123, len(I), "SCALAR"), "material": mat})
    import io
    jpg = io.BytesIO(); tex.save(jpg, "JPEG", quality=82); img_view = add_view(jpg.getvalue())
    gltf = {
        "asset": {"version": "2.0", "generator": "euronics-demo gen-models.py"},
        "scene": 0, "scenes": [{"nodes": [0]}], "nodes": [{"mesh": 0, "name": "product"}],
        "meshes": [{"primitives": prims}],
        "materials": [
            {"name": "front", "pbrMetallicRoughness": {"baseColorTexture": {"index": 0}, "metallicFactor": 0.0, "roughnessFactor": 0.6}},
            {"name": "body", "pbrMetallicRoughness": {"baseColorFactor": [0.92, 0.92, 0.93, 1.0], "metallicFactor": 0.05, "roughnessFactor": 0.7}},
        ],
        "textures": [{"source": 0, "sampler": 0}], "samplers": [{"magFilter": 9729, "minFilter": 9987}],
        "images": [{"bufferView": img_view, "mimeType": "image/jpeg"}],
        "bufferViews": views, "accessors": accessors, "buffers": [{"byteLength": len(buf)}],
    }
    js = json.dumps(gltf, separators=(",", ":")).encode()
    while len(js) % 4: js += b" "
    while len(buf) % 4: buf.append(0)
    total = 12 + 8 + len(js) + 8 + len(buf)
    with open(path, "wb") as f:
        f.write(struct.pack("<III", 0x46546C67, 2, total))
        f.write(struct.pack("<II", len(js), 0x4E4F534A)); f.write(js)
        f.write(struct.pack("<II", len(buf), 0x004E4942)); f.write(buf)

def write_usdz(path, w, h, d, tex: Image.Image, key):
    from pxr import Usd, UsdGeom, UsdShade, Sdf, Gf, UsdUtils
    tmp = tempfile.mkdtemp()
    texpath = os.path.join(tmp, f"{key}.jpg"); tex.save(texpath, "JPEG", quality=82)
    usd = os.path.join(tmp, f"{key}.usdc")
    stage = Usd.Stage.CreateNew(usd)
    UsdGeom.SetStageUpAxis(stage, UsdGeom.Tokens.y); UsdGeom.SetStageMetersPerUnit(stage, 1.0)
    root = UsdGeom.Xform.Define(stage, "/Product"); stage.SetDefaultPrim(root.GetPrim())
    front, rest = box_geometry(w, h, d)
    def mesh(name, geo, mat):
        P, N, U, I = geo
        m = UsdGeom.Mesh.Define(stage, f"/Product/{name}")
        m.CreatePointsAttr([Gf.Vec3f(*p) for p in P]); m.CreateNormalsAttr([Gf.Vec3f(*n) for n in N]); m.SetNormalsInterpolation("vertex")
        m.CreateFaceVertexCountsAttr([3] * (len(I) // 3)); m.CreateFaceVertexIndicesAttr(I)
        st = UsdGeom.PrimvarsAPI(m).CreatePrimvar("st", Sdf.ValueTypeNames.TexCoord2fArray, UsdGeom.Tokens.vertex); st.Set([Gf.Vec2f(*u) for u in U])
        m.CreateSubdivisionSchemeAttr("none"); UsdShade.MaterialBindingAPI.Apply(m.GetPrim()).Bind(mat)
    def material(name, texture):
        mat = UsdShade.Material.Define(stage, f"/Product/Materials/{name}")
        sh = UsdShade.Shader.Define(stage, f"/Product/Materials/{name}/PBR"); sh.CreateIdAttr("UsdPreviewSurface")
        sh.CreateInput("roughness", Sdf.ValueTypeNames.Float).Set(0.6); sh.CreateInput("metallic", Sdf.ValueTypeNames.Float).Set(0.0)
        if texture:
            rd = UsdShade.Shader.Define(stage, f"/Product/Materials/{name}/stReader"); rd.CreateIdAttr("UsdPrimvarReader_float2"); rd.CreateInput("varname", Sdf.ValueTypeNames.Token).Set("st")
            tx = UsdShade.Shader.Define(stage, f"/Product/Materials/{name}/Texture"); tx.CreateIdAttr("UsdUVTexture")
            tx.CreateInput("file", Sdf.ValueTypeNames.Asset).Set(f"{key}.jpg"); tx.CreateInput("st", Sdf.ValueTypeNames.Float2).ConnectToSource(rd.ConnectableAPI(), "result")
            tx.CreateOutput("rgb", Sdf.ValueTypeNames.Float3); sh.CreateInput("diffuseColor", Sdf.ValueTypeNames.Color3f).ConnectToSource(tx.ConnectableAPI(), "rgb")
        else:
            sh.CreateInput("diffuseColor", Sdf.ValueTypeNames.Color3f).Set(Gf.Vec3f(0.92, 0.92, 0.93))
        mat.CreateSurfaceOutput().ConnectToSource(sh.ConnectableAPI(), "surface"); return mat
    mesh("Front", front, material("front", True)); mesh("Body", rest, material("body", False))
    stage.GetRootLayer().Save()
    UsdUtils.CreateNewUsdzPackage(Sdf.AssetPath(usd), path)

n = 0
for r in rows:
    d = r["dims"]; w, h, dd = d["w"] / 100, d["h"] / 100, d["d"] / 100
    tex = face_texture(r, w, h)
    write_glb(os.path.join(out, f"{r['id']}.glb"), w, h, dd, tex)
    try:
        write_usdz(os.path.join(out, f"{r['id']}.usdz"), w, h, dd, tex, r["id"])
    except Exception as e:
        print("usdz failed", r["id"], e)
    n += 1
print(n, "models")
