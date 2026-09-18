"""Build an original, editable vector research infographic; no upstream execution."""
from pathlib import Path
from xml.sax.saxutils import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
W, H = 2160, 3600
ink, muted, green = '#243e33', '#60715b', '#2e4938'
paper, white, line, pale, gold = '#f4f5ed', '#fffef8', '#d4dec8', '#e5edda', '#ece4d1'
parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
         '<title>anbeime/skill 能力全景</title>',
         '<desc>Skill收集分类导航库：19类技能方向，真实执行条件，以及对我们当前参考价值较低的判断。</desc>',
         '<style>text{font-family:"Microsoft YaHei","Noto Sans SC",sans-serif} .latin{font-family:"Segoe UI",sans-serif}</style>']


def rect(x,y,w,h,fill=white,stroke=None,r=18):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="2"' if stroke else '')+'/>')


def text(x,y,value,size=30,color=ink,weight=400,spacing=None):
    parts.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}"'+(f' letter-spacing="{spacing}"' if spacing else '')+f'>{escape(value)}</text>')


def rule(x,y,x2,y2,color=line,width=2):
    parts.append(f'<path d="M{x} {y} L{x2} {y2}" stroke="{color}" stroke-width="{width}" fill="none"/>')


def wrap(value,width):
    lines=[]; current=''; units=0
    for ch in value:
        cost=.55 if ord(ch)<128 else 1
        if units+cost>width and current:
            lines.append(current);current='';units=0
        current+=ch;units+=cost
    if current:lines.append(current)
    return lines


def paragraph(x,y,value,size=28,color=muted,width=30,leading=44):
    for i,row in enumerate(wrap(value,width)):text(x,y+i*leading,row,size,color)


def section(y,number,title,subtitle):
    rect(100,y-39,66,54,green,r=8);text(117,y,number,26,'#d8e7bd',600)
    text(190,y,title,44,ink,650)
    if subtitle:text(190,y+58,subtitle,27,muted)


def icon(x,y,kind,color=green):
    # Small original line icons, drawn as part of this infographic.
    shapes={
      'document':'M8 2 H32 L44 14 V50 H8 Z M32 2 V14 H44 M16 24 H36 M16 33 H36 M16 42 H30',
      'media':'M3 9 H49 V43 H3 Z M23 19 L35 26 L23 34 Z',
      'audio':'M22 7 Q22 0 29 0 Q36 0 36 7 V27 Q36 34 29 34 Q22 34 22 27 Z M14 23 V27 Q14 42 29 42 Q44 42 44 27 V23 M29 42 V50 M19 50 H39',
      'nodes':'M4 4 H20 V20 H4 Z M36 4 H52 V20 H36 Z M20 36 H36 V52 H20 Z M20 12 H36 M12 20 V29 H28 V36 M44 20 V29 H28',
      'image':'M4 5 H50 V48 H4 Z M4 39 L19 24 L30 35 L39 27 L50 39 M34 16 H39',
      'chart':'M5 3 V49 H53 M15 37 V28 H23 V37 M29 37 V17 H37 V37 M43 37 V8 H51 V37',
      'browser':'M3 5 H51 V47 H3 Z M3 17 H51 M11 11 H13 M20 11 H22 M22 25 L15 32 L22 39 M33 25 L40 32 L33 39',
      'book':'M27 10 Q14 2 3 8 V47 Q16 42 27 49 Q39 42 51 47 V8 Q39 2 27 10 V49',
    }
    parts.append(f'<g transform="translate({x} {y})" stroke="{color}" stroke-width="2.6" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="{shapes[kind]}"/></g>')


rect(0,0,W,H,paper,r=0)
text(100,104,'006  /  开源项目研究',26,muted,550,3)
text(1690,104,'2026.09 · 研究示意',25,muted)
text(100,219,'anbeime/skill 能力全景',83,ink,700)
text(100,297,'一个 Skill 收集、分类与导航库',43,muted,500)
rect(100,340,1960,88,pale,r=10)
text(130,396,'主要价值在资源发现；对我们当前工作的直接参考价值较低。',34,green,600)

section(518,'01','仓库本身做什么','用目录组织资源，帮助找到具体技能与原始项目。')
chain=['收集与抓取','分类与索引','展示与检索','找到源项目']
for i,label in enumerate(chain):
    x=100+i*300
    rect(x,618,263,103,white,line,12);text(x+27,682,label,34,ink,600)
    if i<3:text(x+275,682,'→',31,muted)
text(100,775,'配套：目录同步、JSON / CSV 导出、技能格式检查。',29,muted)
rect(1360,616,700,198,green,r=13)
text(1390,662,'附带内容',28,'#d5e4bc',600)
text(1390,711,'根技能：小跃伴侣，对话与静态图片发送',28,'#f2f6e9')
text(1390,758,'应用案例、聊天样例、外部产品与站群链接',28,'#f2f6e9')

for x,number,label in [(100,'84','份技能文件'),(760,'76','份非模板文件'),(1420,'73','个不同名称')]:
    rule(x,857,x+605,857)
    text(x,925,number,60,green,500);text(x+113,919,label,29,ink)
text(100,978,'全仓含模板与重复入口；后两项仅统计 skills/。文件存在不等于可运行。',27,muted)

section(1084,'02','收录的 Skill 有哪些方向','本研究按 19 类场景整理；描述目标任务，不代表全部已实现。')
cards=[
('资料研究与写作','资料整理、提纲、文章与引用','document'),
('网页采集与格式化','网页转 Markdown、文本排版','browser'),
('内容发布','公众号、X 等平台内容分发','document'),
('选题与社媒运营','热点选题、社媒文案、社区操作','nodes'),
('图片与视觉提示词','配图、封面、图标、生图提示','image'),
('视频文案与分镜','短视频脚本、镜头与场景设计','media'),
('视频制作与二创','素材组织、配音字幕、视频合成','media'),
('媒体提取与处理','抽帧、字幕、转码、压缩与转场','media'),
('语音与音频','录音转写、文本配音、音色处理','audio'),
('数字人','口播流程、人像与音频驱动','audio'),
('电商与营销','选品流程、商品卖点、推广方案','chart'),
('演示与数据表达','PPT、路演视频、数据叙事','chart'),
('文档、法律与论文','PDF 提取、合同批注、论文分析','document'),
('知识管理与证据','Obsidian、解析、卡片与溯源','book'),
('软件理解与制图','图谱查询、依赖分析、架构图','nodes'),
('前端与浏览器工具','界面设计、网页封装、浏览器操作','browser'),
('项目决策与个人工作','角色分工、PRD、需求排序、简历','nodes'),
('个股分析','行情与技术指标分析流程','chart'),
('文化内容','古诗词视觉意象与配乐提示','book'),
]
data_text=(ROOT/'demo/data.js').read_text(encoding='utf-8')
data=json.loads(data_text.removeprefix('window.RESEARCH = ').strip().removesuffix(';'))
assert [c[0] for c in cards]==[c['title'] for c in data['categories']]
for i,(title,description,kind) in enumerate(cards):
    x=100+(i%4)*498;y=1200+(i//4)*232
    rect(x,y,466,208,white,line,13)
    text(x+24,y+44,f'{i+1:02d}',24,muted,550)
    icon(x+385,y+21,kind)
    text(x+24,y+98,title,30,ink,600)
    paragraph(x+24,y+149,description,26,muted,15,37)
x,y=1594,2128
rect(x,y,466,208,pale,r=13)
text(x+24,y+44,'外部索引补充',27,green,650)
paragraph(x+24,y+92,'Word / Excel、安全审计、机器学习、云服务等',25,green,16,37)
text(x+24,y+181,'来源链接 ≠ 已打包实现',24,muted)

section(2442,'03','能力怎样真正产生','Skill 提供方法；实际操作仍由模型、脚本、浏览器或 API 完成。')
for i,(label,sub) in enumerate([('真实需求与资料','目标、事实与验收条件'),('Skill 指导步骤','流程、分工与输出格式'),('模型与工具执行','理解、生成与真实操作'),('检查实际产物','内容、文件与平台状态')]):
    x=100+i*500
    rect(x,2555,440,140,pale,r=12)
    text(x+24,2613,label,33,ink,600)
    text(x+24,2660,sub,26,muted)
    if i<3:text(x+456,2640,'→',34,muted)
for x,title,body in [(100,'完整性','Archify、电商副本缺少所述执行程序。'),(770,'演示性质','聊天样例为预设回复，不是真实任务执行。'),(1440,'验证范围','外部服务需另配；上游端到端尚未实测。')]:
    rule(x,2740,x+605,2740)
    text(x,2787,title,27,ink,650)
    paragraph(x,2833,body,26,muted,23,38)

rect(100,2940,1960,465,green,r=18)
text(140,3003,'04  /  对我们的意义与处理方式',30,'#d2e0b8',600)
text(140,3087,'参考价值较低 · 保留备查 · 不作当前重点',50,'#fffef5',650)
rule(140,3130,2020,3130,'#718363')
for x,title,body in [(140,'有用之处','偶尔找技能线索，参考领域流程。'),(790,'价值有限','已有通用工具覆盖较多，关联产品暂无明确复用证据。'),(1440,'实际选择','按具体需求，回原作者仓库核对完整实现。')]:
    text(x,3192,title,32,'#e8f1d8',600)
    paragraph(x,3244,body,29,'#d7e2c8',19,47)
text(100,3495,'依据固定版本 f21302e · 2026-09-18',26,muted)
text(100,3545,'原创研究示意图，非上游运行截图；分类与价值判断针对我们的当前需求。',25,muted)
parts.append('</svg>')
output=ROOT/'assets/understanding-map.svg';output.write_text('\n'.join(parts),encoding='utf-8',newline='\n')
print(f'Created {output} ({W}x{H}); 19 categories verified against research data.')
