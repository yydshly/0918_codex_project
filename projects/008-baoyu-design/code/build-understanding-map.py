"""Draw the original research guide as editable SVG and matching 2x PNG.

Requires Pillow and Microsoft YaHei fonts (Windows). No upstream code is copied.
Content catalog is shared with the web guide; category grouping is editorial.
"""
import json
import html
from pathlib import Path
from datetime import datetime, timezone
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / 'code/understanding-data.json').read_text(encoding='utf-8'))
W, SCALE = 1800, 2
C = dict(bg='#f5f4fa', ink='#28233f', muted='#635c78', accent='#6552b7',
         line='#dcd6e9', pale='#eeebf8', teal='#1e6558', mint='#eaf5f0')
fonts = {}
commands = []
checks = []
def font(size, bold=False):
    key = (size, bold)
    if key not in fonts:
        fonts[key] = ImageFont.truetype('C:/Windows/Fonts/'+('msyhbd.ttc' if bold else 'msyh.ttc'), round(size*SCALE))
    return fonts[key]
def rect(x,y,w,h,fill='white',radius=16,stroke=None):
    commands.append(('rect',x,y,w,h,fill,radius,stroke))
def line(x1,y1,x2,y2,color=None,width=2):
    commands.append(('line',x1,y1,x2,y2,color or C['line'],width))
def txt(x,y,s,size=24,color=None,bold=False,maxwidth=None):
    length=font(size,bold).getlength(s)/SCALE
    if maxwidth is not None:
        assert length<=maxwidth, (s,length,maxwidth)
    assert 0<=x and x+length<=W-30,(s,x,length)
    checks.append(dict(text=s,x=x,y=y,width=length,limit=maxwidth))
    commands.append(('text',x,y,s,size,color or C['ink'],bold))
def wrap(s,width,size=24,bold=False):
    result=[]; current=''
    for char in s:
        if char=='\n':result.append(current);current='';continue
        if current and font(size,bold).getlength(current+char)/SCALE>width:
            result.append(current);current=char
        else: current+=char
    if current:result.append(current)
    return result
def para(x,y,s,width,size=24,color=None,bold=False,lh=None):
    lh=lh or round(size*1.55)
    for i,row in enumerate(wrap(s,width,size,bold)):
        txt(x,y+i*lh,row,size,color,bold,width)
    return y+len(wrap(s,width,size,bold))*lh
def section(y,n,title,sub):
    rect(64,y,49,42,C['accent'],9)
    txt(75,y+7,n,22,'white',True)
    txt(132,y-1,title,32,C['ink'],True)
    txt(132,y+48,sub,21,C['muted'])
    return y+98

rect(0,0,W,255,C['ink'],0)
txt(64,32,'008 / OPEN SOURCE STUDY',22,'#c5b9e5',True)
txt(1250,32,'固定版本 026d4ea · 2026-09-18',21,'#c5b9e5')
txt(64,88,'baoyu-design：从通用规则到专项设计',49,'white',True)
txt(64,166,'按需组合 Skill，由现有 AI 助手调用模板和工具，完成多种设计成果。',28,'#e7e1f4')
txt(64,217,'我们的理解总览 · 原创研究图，不是上游产品截图或独立操作后台',20,'#c5b9e5')
rect(64,284,1672,102,C['pale'])
for i,(a,b) in enumerate([('本质','Skill 流程＋代码模板＋工具脚本'),('覆盖','设计、展示、原型与格式交付'),('执行者','宿主 AI 理解与决策，工具执行操作')]):
    x=88+i*555;txt(x,303,a,23,C['accent'],True);txt(x,343,b,21,C['ink'],False,520)

y=section(430,'01','能力是什么？支持哪些产品目标？','13 类官方任务入口；按成果形式划分，可服务阅读、电商、教育等不同领域。')
families=[('界面与设计规范',['UI 界面','移动 App 设计','线框图','配色与字体系统'],'网页与手机原型、布局探索、品牌和 UI Kit'),('文档与内容传播',['幻灯片','文档','简历','HTML 邮件','宣传单'],'演示、可打印页面与传播版式'),('动态内容与信息表达',['动画','3D 对象','研究报告','图表'],'时间轴、三维展示、来源研究与数据表达')]
for i,(title,names,desc) in enumerate(families):
    x=64+i*564;rect(x,y,544,280,stroke=C['line']);txt(x+25,y+22,title,28,C['accent'],True)
    for j,name in enumerate(names):txt(x+26,y+73+j*30,'· '+name,23)
    para(x+25,y+235,desc,494,18,C['muted'])
y+=317
txt(64,y,'共享 HTML / CSS 与浏览器表达，再接专项组件和转换器；原型不等于已完成后端、支付、安全与运维。',23,C['muted'])

y=section(y+78,'02','如何统一约束？共同规范之下，按目标细化','分层读取＋横向组合；统一工作方法和品牌依据，各种载体保留自己的实现规则。')
layers=[('共同流程','system-prompt.md','理解需求、读资料、制作、检查与交付'),('项目规范','_ds_prompt.md','绑定品牌、字体、组件和允许的样式变量'),('专项 Skill','built-in-skills/','按手机、PPT、邮件等目标添加具体规则'),('实际代码','模板＋组件＋脚本','将样式与行为落实到产物，执行重复工作'),('反馈验证','浏览器＋检查工具','依据报错、操作和视觉结果修正')]
for i,(title,ref,desc) in enumerate(layers):
    x=64+i*338;rect(x,y,320,183,C['pale'] if i<2 else 'white',stroke=C['line']);txt(x+20,y+18,title,27,C['accent'],True);txt(x+20,y+60,ref,19,C['muted']);para(x+20,y+101,desc,280,23)
y+=210
rect(64,y,1672,135,C['mint'])
txt(90,y+18,'同一个品牌 → 三种成果',25,C['teal'],True)
txt(90,y+61,'手机原型：触控与状态反馈     PPT：画布、字号与翻页     邮件：客户端兼容布局',25,C['ink'])
txt(90,y+102,'共同使用品牌色、字体和内容风格；组件仅在技术载体允许时复用。统一规范，不是统一页面结构。',21,C['muted'])

y=section(y+181,'03','Skill 如何驱动工作？AI 读取规则，再操作工具','Markdown 不会自己执行；入口给出任务路由，AI 决定下一步并使用当前环境的工具。')
steps=[('提出需求','目标、资料与验收条件'),('加载说明','总入口＋专项＋项目规范'),('生成产物','AI 写代码、复用模板'),('实际检查','浏览器运行、反馈修改'),('记录交付','保存版本，按需求导出')]
for i,(title,desc) in enumerate(steps):
    x=64+i*338;rect(x,y,306,112,'white',stroke=C['line']);txt(x+20,y+17,title,26,C['ink'],True);txt(x+20,y+65,desc,19,C['muted'])
    if i<4:txt(x+314,y+38,'→',24,C['accent'])
y+=145
txt(64,y,'规范持续生效：设计系统 → 组件包与变量 → 生成 _ds_prompt.md → AI 续做时恢复项目绑定。',23,C['accent'],True)
txt(64,y+40,'文字要求依赖 AI 遵循；共享组件直接影响结果；检查只覆盖实际验证范围。没有统一强制规则引擎。',22,C['muted'])

y=section(y+110,'04','Skill 如何划分？53 份说明，按职责组合','以下 8 组为我们的归纳；包含专项指导、协议、兼容入口和工具接入，不等于 53 个独立功能。')
for start in range(0,len(DATA['groups']),2):
    pair=DATA['groups'][start:start+2]
    height=max(len(g['items']) for g in pair)*31+94
    for col,g in enumerate(pair):
        x=64+col*846;rect(x,y,826,height,'white',stroke=C['line'])
        txt(x+24,y+18,g['title']+' · '+str(len(g['items']))+' 份',27,C['accent'],True)
        for j,(name,desc) in enumerate(g['items']):
            yy=y+70+j*31
            txt(x+24,yy,name,19,C['ink'],False,400)
            # Compact glosses in the graphic; full wording remains in the web guide.
            gloss=desc.replace('PPTX 可编辑导出的另一说明入口','可编辑 PPTX 的另一入口').replace('PPTX 截图导出的另一说明入口','截图 PPTX 的另一入口').replace('仅在用户明确要求时探索惊喜作品','用户明确要求时探索惊喜作品')
            size=18
            while font(size).getlength(gloss)/SCALE>365:size-=1
            txt(x+435,yy,gloss,size,C['muted'],False,365)
    y+=height+20

y=section(y+26,'05','对我们的意义：复用可执行经验，用证据判断价值','003 偏前端资源导航；专门 frontend-design 偏审美指导；008 增加任务组织、上下文和交付工具。')
benefits=[('分层编写自己的 Skill','把通用流程和专项步骤分开，任务需要时才读取；避免一份超长说明包办所有事情。'),('让规范跟随项目','沉淀品牌、组件、资产和验收条件，续做时恢复；比反复要求“做得好看”更具体。'),('将重复工作脚本化','编译、转换与结构检查交给代码；设计取舍交给人和 AI，以实际结果衡量收益。')]
for i,(title,desc) in enumerate(benefits):
    x=64+i*564;rect(x,y,544,180,C['pale']);txt(x+24,y+20,title,27,C['accent'],True);para(x+24,y+73,desc,496,23)
y+=216
rect(64,y,1672,220,C['ink'])
txt(90,y+18,'验证边界',27,'white',True)
txt(90,y+69,'已测：阅读原型、设计系统编译 / 检查 / 导入 / 预览、原版幻灯片与 4 页可编辑 PPTX 结构。',23,'#e7e1f4')
txt(90,y+111,'未测：Figma / Canva 交接、图像音效、视频、3D 专项，以及桌面 PowerPoint 播放表现。',23,'#e7e1f4')
txt(90,y+153,'覆盖广不代表全部成熟；没有证明加入 Skill 后审美和效率必然提升。部分能力依赖外部服务。',23,'#e7e1f4')
y+=256
txt(64,y,'来源：JimLiu / baoyu-design · MIT · 固定版本 026d4ea · 完整说明与证据见子项目 notes/understanding.md',20,C['muted'])
txt(64,y+38,'阅读顺序：定位 → 目标 → 统一约束 → 执行机制 → 技能目录 → 对我们的意义与边界',22,C['accent'],True)
H=y+96

image=Image.new('RGB',(W*SCALE,H*SCALE),C['bg']);draw=ImageDraw.Draw(image)
svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
     '<title id="title">baoyu-design 完整理解引导图</title>',
     '<desc id="desc">库的定位、13 类产品目标、五层统一约束、AI 执行机制、53 份技能说明及研究意义和验证边界。</desc>',
     '<style>text{font-family:"Microsoft YaHei","Noto Sans CJK SC",sans-serif;dominant-baseline:text-before-edge}</style>',
     f'<rect width="{W}" height="{H}" fill="{C["bg"]}"/>']
for cmd in commands:
    if cmd[0]=='rect':
        _,x,yy,w,h,fill,r,stroke=cmd
        draw.rounded_rectangle((x*SCALE,yy*SCALE,(x+w)*SCALE,(yy+h)*SCALE),radius=r*SCALE,fill=fill,outline=stroke,width=2)
        svg.append(f'<rect x="{x}" y="{yy}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke or fill}"/>')
    elif cmd[0]=='text':
        _,x,yy,s,size,color,bold=cmd
        draw.text((x*SCALE,yy*SCALE),s,font=font(size,bold),fill=color,anchor='lt')
        svg.append(f'<text x="{x}" y="{yy}" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{html.escape(s)}</text>')
    else:
        _,x1,y1,x2,y2,color,width=cmd
        draw.line((x1*SCALE,y1*SCALE,x2*SCALE,y2*SCALE),fill=color,width=width*SCALE)
        svg.append(f'<path d="M{x1},{y1}L{x2},{y2}" stroke="{color}" stroke-width="{width}"/>')
svg.append('</svg>')
(ROOT/'assets/understanding-map.svg').write_text('\n'.join(svg),encoding='utf-8')
image.save(ROOT/'assets/understanding-map.png',optimize=True)
assert len(DATA['tasks'])==13
assert sum(len(g['items']) for g in DATA['groups'])==53
evidence=dict(generatedAt=datetime.now(timezone.utc).isoformat(),upstream=DATA['version'],
    type='原创研究引导图，非产品截图',svgDimensions=[W,H],pngDimensions=[W*SCALE,H*SCALE],
    taskTargets=13,guideFiles=53,editorialGroups=8,textElements=len(checks),
    measuredHorizontalBoundsPassed=True,renderer='Pillow / Microsoft YaHei; SVG keeps editable text',
    limits='Measured text widths and canvas bounds; final visual review recorded separately.')
(ROOT/'notes/evidence/understanding-map.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(evidence,ensure_ascii=False))
