"""업무데이터대응 원고(md)를 보고서 양식 HTML로 바꾸고 Chromium으로 A4 PDF를 만든다.
사용: python3 build_pdf.py <원고.md> <결과.pdf>"""
import html, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

SRC = Path(sys.argv[1]).resolve()
PB_H3 = '--h3-page' in sys.argv
OUT = Path(sys.argv[2]).resolve()

SUB = '가나다라마바사아자차'
WIDTHS = {
    ('엔티티', '테이블', '뜻'): [18, 23, 59],
    ('업무 ID', '단위 업무', '사용자', '다루는 데이터'): [11, 19, 17, 53],
    ('업무', '사용자', '다루는 데이터', '더한 이유'): [25, 11, 34, 30],
    ('엔티티', '생성', '수정', '조회', '삭제'): [15, 18, 17, 38, 12],
    ('엔티티', '상태', '판정 조건'): [14, 22, 64],
    ('업무', '엔티티', '바뀌는 속성', '바꿀 수 있는 조건'): [30, 13, 24, 33],
    ('구분', '업무 기술서 v1.3', '현행', '이유'): [21, 24, 25, 30],
    ('위치', 'v1', 'v2', '이유'): [26, 20, 27, 27],
}
CRUD = {'조회', '생성', '수정', '삭제'}

def esc(s):
    return re.sub(r'`([^`]+)`', r'<code>\1</code>', html.escape(s, quote=False))

def cell(c):
    return re.sub(r'([A-Z]-\d-\d|추가 \d)', r'<span class="nw">\1</span>', esc(c))

def table(lines):
    rows = [[c.strip() for c in l.strip().strip('|').split('|')] for l in lines]
    head, body = rows[0], rows[2:]
    matrix = head[0] == '업무' and len(head) == 5 and all(
        all(v == '' or set(v.split('·')) <= CRUD for v in r[1:]) for r in body)
    cls = 'matrix' if matrix else ''
    widths = [32, 17, 17, 17, 17] if matrix else WIDTHS.get(tuple(head))
    if len(body) <= 15: cls += ' keep'
    cols = ''.join(f'<col style="width:{w}%">' for w in widths) if widths else ''
    out = [f'<table class="{cls}"><colgroup>{cols}</colgroup><thead><tr>']
    out += [f'<th>{esc(h)}</th>' for h in head]
    out.append('</tr></thead><tbody>')
    for r in body:
        out.append('<tr>' + ''.join(f'<td>{cell(c)}</td>' for c in r) + '</tr>')
    out.append('</tbody></table>')
    return ''.join(out)

def convert(md):
    lines = md.splitlines(); out = []; i = 0; last = None; sub_n = 0; fig = 0
    summary = [l[2:].split(': ', 1) for l in lines if l.startswith('> ')]
    while i < len(lines):
        l = lines[i]; s = l.strip()
        if not s: i += 1; continue
        if l.startswith('# '):
            out.append(f'<h1>{esc(l[2:])}</h1>')
            box = ''.join(f'<div class="sl"><span class="sk">{esc(k)}</span>: {esc(v)}</div>' for k, v in summary)
            out.append(f'<div class="summary"><div class="st">&lt; 요 약 &gt;</div>{box}</div>')
        elif l.startswith('> '):
            pass
        elif l.startswith('### '):
            pb = PB_H3 and not out[-1].startswith('<h2')
            out.append(f'<h3 class="{"pb" if pb else ""}">{esc(l[4:])}</h3>'); last = None
        elif s.startswith('!['):
            m = re.match(r'!\[(.*)\]\((.*)\)', s); fig += 1
            src = (SRC.parent / m.group(2)).resolve().as_uri()
            out.append(f'<figure><img src="{src}"><figcaption>[그림 {fig}] {esc(m.group(1))}</figcaption></figure>')
        elif l.startswith('## '):
            pb = PB_H3 and out and '<h2' in ''.join(out)
            out.append(f'<h2 class="{"pb" if pb else ""}">{esc(l[3:])}</h2>'); last = None
        elif s.startswith('|'):
            block = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                block.append(lines[i]); i += 1
            out.append(table(block)); last = 'table'; continue
        elif s.startswith('[표 '):
            out.append(f'<p class="cap">{esc(s)}</p>')
        elif s.startswith('※'):
            out.append(f'<p class="note{" after-table" if last == "table" else ""}">{esc(s)}</p>')
        elif re.match(r'^\d+\) ', s):
            num, text = s.split(' ', 1)
            out.append(f'<p class="n1"><span class="num">{num}</span>{esc(text)}</p>'); last = 'item'; sub_n = 0
        elif s.startswith('- '):
            out.append(f'<p class="n2"><span class="num">{SUB[sub_n]})</span>{esc(s[2:])}</p>'); sub_n += 1
        else:
            out.append(f'<p class="plain">{esc(s)}</p>')
        i += 1
    return '\n'.join(out)

CSS = """
@page { size: A4; margin: 15mm 20mm 18mm 20mm; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: 'Noto Serif CJK KR', serif; font-size: 15pt; line-height: 1.7; color: #000; word-break: keep-all; overflow-wrap: break-word; }
h1, h2, .st { font-family: 'Noto Sans CJK KR', sans-serif; font-weight: 900; }
h1 { font-size: 20pt; text-align: center; margin: 0 0 8mm; line-height: 1.4; }
h2 { font-size: 16pt; margin: 9mm 0 2mm; line-height: 1.4; break-after: avoid; }
p { margin: 0 0 1.5mm; text-align: left; }
.plain { padding-left: 15pt; }
.num { display: inline-block; }
.n1 { padding-left: 36pt; text-indent: -21pt; } .n1 .num { width: 21pt; text-indent: 0; }
.n2 { padding-left: 57.5pt; text-indent: -27.5pt; } .n2 .num { width: 27.5pt; text-indent: 0; }
.note { font-family: 'Noto Sans CJK KR', sans-serif; font-size: 12pt; line-height: 1.3; padding-left: 51pt; text-indent: -15pt; margin: 1mm 0 2mm; }
.note.after-table { padding-left: 15pt; margin-top: 1.5mm; }
.summary { border: 0.4mm solid #000; padding: 3mm 6mm 4mm; margin: 0 0 6mm; font-size: 14pt; line-height: 1.6; }
.sl { padding-left: 5.9em; text-indent: -5.9em; }
.st { text-align: center; font-size: 15pt; margin-bottom: 2mm; }
.sk { display: inline-block; width: 5.6em; white-space: nowrap; text-indent: 0; }
h3 { font-family: 'Noto Sans CJK KR', sans-serif; font-weight: 700; font-size: 15pt; margin: 7mm 0 2mm; line-height: 1.4; break-after: avoid; }
h3.pb, h2.pb { break-before: page; margin-top: 0; }
figure { margin: 2mm 0 3mm; break-inside: avoid; text-align: center; }
figure img { max-width: 100%; max-height: 120mm; border: 0.12mm solid #999; }
figcaption { font-family: 'Noto Sans CJK KR', sans-serif; font-weight: 700; font-size: 12pt; margin-top: 1.5mm; }
code { font-family: 'Noto Sans Mono CJK KR', monospace; font-size: 0.85em; }
.cap { font-family: 'Noto Sans CJK KR', sans-serif; font-weight: 700; font-size: 12pt; text-align: center; margin: 5mm 0 1.5mm; break-after: avoid; line-height: 1.3; }
table { width: 100%; border-collapse: collapse; font-family: 'Noto Sans CJK KR', sans-serif; font-size: 12pt; line-height: 1.35; border-top: 0.4mm solid #000; border-bottom: 0.4mm solid #000; margin-bottom: 1mm; table-layout: fixed; }
th, td { border: 0.12mm solid #000; border-left: none; border-right: none; padding: 1mm 2mm; vertical-align: middle; }
th + th, td + td { border-left: 0.12mm solid #000; }
th { background: #d9d9d9; font-weight: 700; text-align: center; }
td:first-child { font-weight: 700; }
tr { break-inside: avoid; }
.nw { white-space: nowrap; }
table.keep { break-inside: avoid; }
table.matrix td + td { text-align: center; }
"""

body = convert(SRC.read_text(encoding='utf-8'))
doc = f'<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>'
hp = OUT.with_suffix('.html'); hp.write_text(doc, encoding='utf-8')
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    pg.goto(hp.as_uri()); pg.evaluate('document.fonts.ready')
    pg.pdf(path=str(OUT), format='A4', prefer_css_page_size=True, display_header_footer=True,
           header_template='<div></div>',
           footer_template='<div style="width:100%;text-align:center;font-size:10pt;font-family:Noto Sans CJK KR">- <span class="pageNumber"></span> -</div>')
    b.close()
