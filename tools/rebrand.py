#!/usr/bin/env python3
"""Troca o nome da marca nos ficheiros estáticos (títulos, meta, OG).
Uso: python3 tools/rebrand.py NOVA_MARCA [https://novo-dominio.pt]
Também atualiza assets/config.js."""
import sys, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
cfg = (root / "assets/config.js").read_text(encoding="utf-8")
old_brand = re.search(r'brand:\s*"([^"]+)"', cfg).group(1)
old_url = re.search(r'siteUrl:\s*"([^"]+)"', cfg).group(1)
new_brand = sys.argv[1]
new_url = sys.argv[2].rstrip("/") if len(sys.argv) > 2 else old_url
for p in sorted(root.glob("*.html")) + [root / "sitemap.xml", root / "robots.txt", root / "assets/config.js", root / "tools/_gen_pages.py"]:
    if not p.exists(): continue
    t = p.read_text(encoding="utf-8")
    t2 = t.replace(old_url, new_url).replace(old_brand, new_brand)
    if t2 != t:
        p.write_text(t2, encoding="utf-8"); print("atualizado:", p.name)
