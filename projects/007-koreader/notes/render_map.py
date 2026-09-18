"""Render an original, editable capability diagram as SVG and PNG.

This draws a new explanatory diagram; it does not edit an existing image.
Requires Pillow and Microsoft YaHei fonts on Windows.
"""
from pathlib import Path
from html import escape
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H = 3000, 2200
BG, INK, MUTED = '#F6F4EE', '#172F32', '#566767'
TEAL, PALE, LINE = '#176C68', '#E7F0EA', '#D3DBD4'
AMBER, GOLD = '#D58F30', '#FBEDD6'
im = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(im)
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
       '<title>KOReader：能力、阅读效果与对我的意义</title>',
       '<desc>原创信息图。六组能力、三组阅读效果示意、底层分工、运行平台与用户价值。文档研究，未实测。</desc>',
       f'<rect width="{W}" height="{H}" fill="{BG}"/>']
fonts = {}

def font(size, bold=False):
    key = size, bold
    if key not in fonts:
        fonts[key] = ImageFont.truetype('C:/Windows/Fonts/msyhbd.ttc' if bold else 'C:/Windows/Fonts/msyh.ttc', size)
    return fonts[key]

def rect(x, y, w, h, fill, radius=0, stroke=None, sw=2):
    d.rounded_rectangle((x, y, x+w, y+h), radius, fill, stroke, sw)
    svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke or "none"}" stroke-width="{sw}"/>')

def line(x1, y1, x2, y2, color=LINE, width=3):
    d.line((x1, y1, x2, y2), fill=color, width=width)
    svg.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>')

def circle(x, y, r, fill, stroke=None, sw=2):
    d.ellipse((x-r, y-r, x+r, y+r), fill=fill, outline=stroke, width=sw)
    svg.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke or "none"}" stroke-width="{sw}"/>')

def text(x, y, content, size=30, color=INK, bold=False, max_width=None):
    f = font(size, bold)
    if max_width is not None:
        assert d.textlength(content, font=f) <= max_width, (content, d.textlength(content, font=f), max_width)
    d.text((x, y), content, font=f, fill=color, anchor='lt')
    # Use a baseline derived from the same font for comparable SVG typography.
    top = f.getbbox(content)[1]
    svg.append(f'<text x="{x}" y="{y+f.getmetrics()[0]-top:.2f}" font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{escape(content)}</text>')

def arrow(x, y, length=72, color=TEAL):
    line(x, y, x+length, y, color, 4)
    line(x+length-13, y-10, x+length, y, color, 4)
    line(x+length-13, y+10, x+length, y, color, 4)

def section(x, y, no, title, subtitle=None):
    rect(x, y, 49, 44, TEAL, 10)
    text(x+9, y+8, no, 25, '#FFFFFF', True)
    text(x+66, y-1, title, 40, INK, True)
    if subtitle:
        text(x+66, y+54, subtitle, 25, MUTED)

def page(x, y, w=97, h=132, columns=1, rows=8, highlight=False, small=False):
    rect(x, y, w, h, '#FFFFFF', 7, LINE)
    line(x+14, y+18, x+w-14, y+18, TEAL, 4)
    gap = 10 if small else 13
    for c in range(columns):
        cw = (w-28-(columns-1)*12)/columns
        for i in range(rows):
            xx = x+14+c*(cw+12)
            yy = y+35+i*gap
            if yy > y+h-10:
                break
            if highlight and i == 2:
                rect(xx-2, yy-4, cw+2, 10, GOLD, 2)
            line(xx, yy, xx+cw-(i%3)*4, yy, '#A6B0AB', 2 if small else 3)

def reader(x, y, w=103, h=151, rows=7, highlight=False):
    rect(x, y, w, h, INK, 13)
    rect(x+7, y+9, w-14, h-27, '#FAFBF7', 4)
    for i in range(rows):
        yy = y+28+i*13
        if yy >= y+h-25:
            break
        if highlight and i == 2:
            rect(x+16, yy-4, w-33, 11, '#E7CC8F', 2)
        line(x+17, yy, x+w-18-(i%2)*6, yy, '#7D918B', 3)
    circle(x+w/2, y+h-10, 3, '#B4C1BA')

def icon(x, y, kind):
    if kind == 0:
        rect(x+12,y+7,40,50,'#FFFFFF',4,TEAL)
        rect(x+2,y+18,40,50,'#FFFFFF',4,TEAL)
        line(x+11,y+34,x+31,y+34,TEAL)
        line(x+11,y+44,x+29,y+44,TEAL)
    elif kind == 1:
        text(x+1,y+12,'Aa',43,TEAL,True)
        line(x+2,y+67,x+57,y+67,TEAL)
    elif kind == 2:
        rect(x+3,y+4,48,62,'#FFFFFF',4,TEAL)
        for xx in (12,33):
            for yy in (22,32,42,52): line(x+xx,y+yy,x+xx+10,y+yy,TEAL,2)
    elif kind == 3:
        rect(x+1,y+8,53,49,'#FFFFFF',5,TEAL)
        line(x+10,y+25,x+43,y+25,TEAL)
        line(x+10,y+36,x+34,y+36,AMBER,5)
        line(x+42,y+53,x+24,y+72,TEAL,5)
    elif kind == 4:
        for i in range(3): rect(x+3+i*18,y+12-i*3,11,48+i*3,'#FFFFFF',3,TEAL)
        arrow(x+6,y+76,45)
    else:
        rect(x+3,y+3,47,67,INK,7)
        rect(x+9,y+10,35,45,'#FFFFFF',2)
        line(x+17,y+23,x+36,y+23,TEAL)
        line(x+17,y+33,x+33,y+33,TEAL)
        circle(x+26,y+62,3,'#FFFFFF')

# Header
rect(0,0,W,13,TEAL)
text(90,54,'007  /  开源项目研究',29,TEAL,True)
text(90,108,'KOReader',96,INK,True)
text(645,128,'能力、阅读效果与对我的意义',57,INK,True)
text(95,226,'让电子书、论文和扫描文档，更适合小屏与墨水屏阅读',38,MUTED)
rect(2453,57,455,61,PALE,30)
text(2480,72,'文档与源码分析 · 未实测',28,TEAL,True)
line(90,303,2910,303,LINE,2)

# Left capabilities: six cards
section(90,343,'01','能做什么')
cards = [
    ('多格式阅读', ['EPUB · FB2 · MOBI · TXT · HTML', 'DOC · RTF · CHM · PDF · DjVu', 'CBZ / CBT 漫画'], '不同类型的本地资料集中阅读'),
    ('自由排版', ['字体 / 字号 / 行距 / 页边距', 'CSS 样式覆盖 / 多语言断词'], '文字重新换行、分页，适应屏幕'),
    ('PDF 与扫描件', ['裁白边 / 缩放 / 分栏 / 重排', '倾斜校正 / OCR 辅助识字'], '复杂版面需检查，OCR 可能出错'),
    ('阅读与学习', ['目录 / 搜索 / 书签 / 高亮 / 笔记', '词典 / 维基百科 / 翻译 / 生词学习'], '查询、标记、导出，积累阅读资料'),
    ('书库与同步', ['Calibre / OPDS / Wallabag / RSS', '跨设备阅读进度同步 / 阅读统计'], '同步进度不等于自动同步整本书'),
    ('墨水屏与扩展', ['刷新策略 / 对比度 / 按键 / 手势', 'Lua 插件 / 自定义配置 / 在线更新'], '设备能力不同；联网功能需服务'),
]
cw,ch,gap = 765,230,25
for i,(title,body,outcome) in enumerate(cards):
    x=90+(i%2)*(cw+gap)
    y=417+(i//2)*(ch+gap)
    rect(x,y,cw,ch,'#FFFFFF',17,LINE,1)
    rect(x+22,y+24,82,93,PALE,14)
    icon(x+34,y+30,i)
    text(x+126,y+26,title,36,INK,True)
    for j,t in enumerate(body): text(x+126,y+80+j*34,t,26,MUTED,max_width=cw-145)
    line(x+25,y+180,x+cw-25,y+180,LINE,1)
    text(x+26,y+193,outcome,25,TEAL,True,max_width=cw-50)

# Right outcomes: visual before/after pairs with prose
rx,rw=1715,1195
section(rx,343,'02','会有什么效果')
for i in range(3): rect(rx,417+i*255,rw,230,PALE,17)
y=417
page(rx+30,y+39,103,149,columns=2,rows=10,small=True)
arrow(rx+153,y+113,59)
reader(rx+235,y+36,103,154,rows=8)
text(rx+386,y+31,'大页论文 → 窄屏阅读',36,INK,True)
text(rx+386,y+88,'裁边、分栏或重排，减少缩放拖动',29,MUTED)
text(rx+386,y+133,'公式、表格与跨栏图需逐份检查',27,MUTED)
text(rx+37,y+198,'A4 双栏',19,MUTED)
text(rx+240,y+198,'窄屏阅读',19,MUTED)
y=672
page(rx+30,y+39,103,149,rows=11,small=True)
arrow(rx+153,y+113,59)
reader(rx+235,y+36,103,154,rows=6)
text(rx+386,y+31,'原有版式 → 自定义排版',36,INK,True)
text(rx+386,y+88,'字号变大，文字重新换行与分页',29,MUTED)
text(rx+386,y+133,'流式文档按自己的习惯阅读',27,MUTED)
text(rx+36,y+198,'紧密小字',19,MUTED)
text(rx+240,y+198,'舒适行距',19,MUTED)
y=927
page(rx+30,y+39,103,149,rows=9,highlight=True)
arrow(rx+153,y+113,59)
rect(rx+234,y+48,110,114,'#FFFFFF',8,LINE)
text(rx+249,y+66,'查词',25,TEAL,True)
line(rx+250,y+105,rx+327,y+105,LINE,3)
line(rx+250,y+119,rx+315,y+119,LINE,3)
rect(rx+256,y+142,107,52,GOLD,7)
text(rx+268,y+157,'摘录',23,INK,True)
text(rx+386,y+31,'阅读内容 → 查询与摘录',36,INK,True)
text(rx+386,y+88,'阅读中查词、标记，再导出笔记',29,MUTED)
text(rx+386,y+133,'本地词典需文件；在线查询需网络',27,MUTED)
text(rx+36,y+198,'选中文字',19,MUTED)
text(rx+258,y+198,'查询 / 笔记',19,MUTED)
text(rx+15,1176,'效果示意 · 非真实运行截图 · 无性能或质量实测',25,MUTED)

# Architecture strip
section(90,1245,'03','底层怎样实现')
ay=1320
rect(90,ay,626,170,'#FFFFFF',16,LINE,1)
text(122,ay+25,'Lua / LuaJIT',37,TEAL,True)
text(122,ay+83,'界面、阅读逻辑、插件',29,MUTED)
arrow(738,ay+79,76)
rect(840,ay,1098,170,'#FFFFFF',16,LINE,1)
text(872,ay+23,'原生文档引擎',35,TEAL,True)
text(872,ay+76,'CREngine：流式排版',28,MUTED)
text(872,ay+116,'MuPDF / DjVuLibre：固定页面',28,MUTED)
rect(1450,ay+53,456,91,GOLD,12)
text(1471,ay+67,'K2pdfopt：可选版面重排',28,INK,True)
text(1471,ay+106,'扫描页也可按图像区域重排',23,MUTED)
arrow(1959,ay+79,76)
rect(2060,ay,850,170,'#FFFFFF',16,LINE,1)
text(2092,ay+25,'设备适配与显示',35,TEAL,True)
text(2092,ay+83,'输入 / 绘制 / 刷新策略',29,MUTED)
text(2092,ay+125,'平衡速度、显示质量与残影',24,MUTED)
text(94,1515,'机制要点：流式文档重新排版；固定页面保留原版或做版面重排。重排不等于 OCR。',27,MUTED)

# Platform banner
rect(90,1580,2820,133,PALE,16)
text(117,1603,'04  在哪里使用',33,TEAL,True)
text(470,1603,'Android · Linux · Kindle · Kobo · PocketBook · reMarkable · Cervantes',32,INK,True)
text(470,1658,'具体机型需适配；v2026.07.1 官方无 Windows 原生安装包。Ubuntu 只是 Linux 的一种。',28,MUTED)

# Strong contextual value panel
section(90,1752,'05','对我的意义')
values=[
    ('当前 Windows 使用','直接使用价值有限','暂不为体验而增加 Linux 运行依赖',GOLD),
    ('有阅读设备时','适合长文、论文与扫描书','重视排版自由、本地阅读时再评估',PALE),
    ('开源项目研究','值得参考的工程设计','多引擎整合、插件体系、设备优化',PALE),
]
for i,(tag,title,desc,bg) in enumerate(values):
    x=90+i*950
    rect(x,1823,920,171,bg,16)
    text(x+29,1846,tag,27,TEAL,True)
    text(x+29,1890,title,39,INK,True)
    text(x+29,1951,desc,28,MUTED,max_width=862)
rect(90,2021,2820,78,TEAL,14)
text(131,2040,'当前选择：保留研究资料与能力图，暂不安装',39,'#FFFFFF',True)
text(95,2131,'007 · 原创能力与效果示意  |  文档研究，未实测  |  v2026.07.1  |  2026-09-18',25,MUTED)
text(1930,2131,'github.com/koreader/koreader',24,MUTED)
text(1930,2167,'koreader.rocks/user_guide',24,MUTED)

out=ROOT/'assets'
out.mkdir(exist_ok=True)
im.save(out/'understanding-map.png',optimize=True)
svg.append('</svg>')
(out/'understanding-map.svg').write_text('\n'.join(svg),encoding='utf-8')
print(f'Created {W}x{H} PNG and editable SVG in {out}')
