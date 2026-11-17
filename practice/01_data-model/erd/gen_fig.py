"""캔버스 데이터(D)에서 보고서용 물리 ERD 그림 2장을 Graphviz로 만든다.
사용: python3 gen_fig.py erd_canvas.html .  (Graphviz와 Noto Sans CJK KR 글꼴 필요)
키 컬럼(PK, FK, UNIQUE)만 그린다. 12.11 흐름 테이블은 머리를 채운다.
"""
import collections
import json
import re
import subprocess
import sys
from pathlib import Path

src = open(sys.argv[1], encoding="utf-8").read()
OUT = Path(sys.argv[2])
D = json.loads(re.search(r"^const D = (\{.*\});$", src, re.M).group(1))
T = D["tables"]

FLOW = {"member", "assignment", "team", "team_member", "deliverable", "evaluation"}
FIGS = {
    "erd_physical_1": (["member", "assignment", "team", "team_member", "role_history", "leader_history", "notification"], []),
    "erd_physical_2": (["contribution", "deliverable", "confirmation", "evaluation", "evaluation_draft"], ["team", "team_member"]),
}
INK, HEAD, LINE, ALT, MUTED = "#211D2B", "#332C4A", "#615C73", "#F3F1EC", "#5E5873"
FONT = "Noto Sans CJK KR"


def marks(row):
    """키 칸 표시에서 그림에 쓸 것만 남김: PK, FK, UKn, NULL(선택 외래 키)."""
    parts = [p.strip() for p in row["cells"][3].split(",") if p.strip()]
    out = []
    for p in parts:
        if p == "PK":
            out.append("PK")
        elif p.startswith("FK"):
            out.append("FK")
        elif re.fullmatch(r"UK\d*", p):
            out.append(p)
    if "FK" in out and row["cells"][2] == "NULL":
        out.insert(out.index("FK") + 1, "NULL")
    return out


def table_label(k):
    rows = [r for r in T[k]["p"]["rows"] if marks(r)]
    filled = k in FLOW
    head_bg = HEAD if filled else "white"
    head_fg = "white" if filled else INK
    h = [f'<TABLE BORDER="2" CELLBORDER="0" CELLSPACING="0" CELLPADDING="7" COLOR="{INK}">',
         f'<TR><TD COLSPAN="2" ALIGN="LEFT" BGCOLOR="{head_bg}" SIDES="B" BORDER="{0 if filled else 2}">'
         f'<FONT COLOR="{head_fg}" POINT-SIZE="24"><B>{k}</B></FONT></TD></TR>']
    for i, r in enumerate(rows):
        bg = ALT if i % 2 else "white"
        name = f"<B>{r['c']}</B>" if r.get("pk") else r["c"]
        h.append(f'<TR><TD ALIGN="LEFT" BGCOLOR="{bg}" PORT="{r["c"]}"><FONT POINT-SIZE="19" COLOR="{INK}">{name}</FONT></TD>'
                 f'<TD ALIGN="LEFT" BGCOLOR="{bg}" PORT="{r["c"]}_r"><FONT POINT-SIZE="19" COLOR="{MUTED}">{", ".join(marks(r))}</FONT></TD></TR>')
    h.append("</TABLE>")
    return "<" + "".join(h) + ">"


def pk(k):
    return next(r["c"] for r in T[k]["p"]["rows"] if r.get("pk"))


for name, (tables, ghosts) in FIGS.items():
    show = set(tables) | set(ghosts)
    rels = [r for r in D["rels"] if r["c"] in tables and r["p"] in show]
    pair = collections.Counter((r["p"], r["c"]) for r in rels)
    g = [f'digraph G {{ graph [rankdir=LR, splines=true, nodesep=0.5, ranksep=1.3, pad=0.3, fontname="{FONT}", bgcolor="white"];',
         f'node [shape=plain, fontname="{FONT}"]; edge [fontname="{FONT}", fontsize=17, fontcolor="{MUTED}", color="{LINE}", penwidth=2.2, arrowsize=1.4, dir=both];']
    for k in tables:
        g.append(f'"{k}" [label={table_label(k)}];')
    for k in ghosts:
        g.append(f'"{k}" [shape=box, style=dashed, color="{MUTED}", fontcolor="{MUTED}", fontsize=24, margin="0.25,0.15", label=<<B>{k}</B>>];')
    for r in rels:
        tail = "teeodot" if r["nullable"] else "teetee"
        head = "crowtee" if r["onePlus"] else "crowodot"
        attrs = [f'arrowtail="{tail}"', f'arrowhead="{head}"']
        if r["dashed"]:
            attrs.append("style=dashed")
        if r["dashed"] or pair[(r["p"], r["c"])] > 1:
            attrs.append(f'label="{r["col"]}"')
        tp = f':"{pk(r["p"])}_r":e' if r["p"] in tables else ":e"
        g.append(f'"{r["p"]}"{tp} -> "{r["c"]}":"{r["col"]}":w [{", ".join(attrs)}];')
    g.append("}")
    dot = OUT / f"{name}.dot"
    dot.write_text("\n".join(g), encoding="utf-8")
    subprocess.run(["dot", "-Tpng", "-Gdpi=110", str(dot), "-o", str(OUT / f"{name}.png")], check=True)
    print("wrote", OUT / f"{name}.png", "edges", len(rels))
