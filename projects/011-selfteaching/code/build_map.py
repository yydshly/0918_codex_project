"""Build the original vector infographic. No third-party artwork or book text copied."""
from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parent.parent
W,H=3000,2280
INK='#193f40'; MUTED='#596d62'; LINE='#cad3bd'; ORANGE='#b45d3a'; PAPER='#f8f6ed'
parts=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
'<title id="title">一图读懂《自学是门手艺》</title>',
'<desc id="desc">两条主线是如何自学与 Python 入门实践；通过学、练、用、造形成反馈。图解仓库材料、内容范围和对我们研究项目、学习新工具与 AI 协作的意义。</desc>',
'<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 1 L8 5 L0 9" fill="none" stroke="#84946e" stroke-width="1.5"/></marker></defs>',
f'<rect width="{W}" height="{H}" fill="{PAPER}"/>',
'<g font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif">']
def rect(x,y,w,h,fill,stroke=LINE,r=12):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')
def text(x,y,value,size=30,color=INK,weight=400):
    parts.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}">{escape(value)}</text>')
def line(x1,y1,x2,y2,color=LINE,arrow=False):
    parts.append(f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="2"'+(' marker-end="url(#arrow)"' if arrow else '')+'/>')
def block(x,y,lines,size=30,color=MUTED,gap=46,weight=400):
    for i,s in enumerate(lines):text(x,y+i*gap,s,size,color,weight)
def number(x,y,n,color=INK):
    rect(x,y-40,70,56,color,color,6);text(x+16,y,n,28,'#fffcef',600)
# Header
text(100,82,'011 / 开源项目研究',24,ORANGE,600)
text(100,185,'一图读懂《自学是门手艺》',82,INK,700)
text(100,255,'通过自学 Python，练习如何独立学会新知识。',38,MUTED)
text(2900-765,78,'李笑来著 · 自学方法 + Python 入门实践',25,MUTED)
text(2900-765,121,'面向新手，也适合学习陌生领域',25,MUTED)
line(100,293,2900,293)
# Two threads
rect(100,332,1368,456,'#eaf0e0')
rect(1532,332,1368,456,'#f2e9d9')
number(142,398,'01');text(238,401,'主线一：教你如何学',43,INK,600)
number(1574,398,'02',ORANGE);text(1670,401,'主线二：用 Python 学着做',43,INK,600)
left=[
('阅读与理解','带着问题阅读；接受暂时不懂；重读、整理概念'),
('练习与拆解','找出自己的薄弱点；拆成小任务；变化输入反复练习'),
('查证与表达','查官方文档；清楚提问；记录过程；解释成果')]
right=[
('基础阅读','值与运算、分支循环、字符串、容器、文件'),
('独立编写','函数与参数、递归、文档、模块、测试、程序入口'),
('进一步理解','类、迭代器、生成器、装饰器、正则、BNF / EBNF')]
for col,rows in [(142,left),(1574,right)]:
    for i,(title,desc) in enumerate(rows):
        y=477+i*82
        text(col,y,title,30,INK,600)
        text(col,y+39,desc,28,MUTED)
line(142,712,1426,712);line(1574,712,2858,712)
text(142,755,'目标：从依赖带教，走向独立学习',30,INK,600)
text(1574,755,'目标：从看懂例子，走向写出小工具',30,ORANGE,600)
rect(1040,807,920,55,PAPER,PAPER)
text(1101,845,'方法指导实践，实践提供反馈',32,ORANGE,600)
line(760,835,1058,835,arrow=True);line(2238,835,1948,835,arrow=True)
# Method
text(100,925,'它采用的方法',40,INK,600)
text(448,925,'学 → 练 → 用 → 造',32,MUTED)
stages=[
('01','学','建立理解','读文档、记疑问、梳理关系'),
('02','练','修正薄弱点','预测结果、动手验证、复盘错误'),
('03','用','解决小问题','从小函数开始，以用带练'),
('04','造','完成一个作品','组合、说明、分享、接受反馈')]
for i,(n,a,b,c) in enumerate(stages):
    x=100+i*718
    rect(x,960,646,188,'#fffef8')
    text(x+30,1008,n,24,ORANGE,600)
    text(x+91,1016,a,41,INK,600)
    text(x+165,1016,b,30,INK,600)
    line(x+30,1041,x+616,1041)
    text(x+30,1098,c,29,MUTED)
    if i<3:line(x+660,1051,x+698,1051,arrow=True)
parts.append('<path d="M 2580 1165 L2580 1205 L420 1205 L420 1165" fill="none" stroke="#84946e" stroke-width="2" marker-end="url(#arrow)"/>')
rect(1075,1174,850,60,PAPER,PAPER)
text(1120,1215,'发现新问题，开始下一轮',31,MUTED)
# Scope
rect(100,1271,1368,354,'#fffef8')
rect(1532,1271,1368,354,'#edf0e6')
text(142,1339,'仓库提供什么',40,INK,600)
text(1574,1339,'能力范围到哪里',40,INK,600)
block(142,1410,[
'按章节组织的书籍正文',
'Markdown：直接阅读',
'Jupyter Notebook：文字 + 代码 + 输出',
'配套示例、工具附录与延伸阅读'],31,gap=51)
block(1574,1410,[
'建立自学方法与 Python 基础，衔接官方文档',
'涵盖学习、编程、资料检索与沟通协作',
'不覆盖完整职业开发、Web、数据科学或 AI 工程训练',
'读完不等于熟练，掌握要靠独立实践'],29,gap=51)
# Meaning
rect(100,1674,2800,390,'#f0e6d5','#ded1bb')
text(142,1744,'对我们的意义：把研究过程做扎实',42,INK,600)
text(2510,1744,'本项目建议',24,ORANGE)
values=[
('研究陌生项目',['读说明 → 拆出最小例子','验证结果 → 记录可回查的结论']),
('学习新工具',['先完成一个小任务，再补缺失知识','减少只收藏教程、不做实践']),
('与 AI 协作',['让 AI 辅助解释与提示','自己判断、运行和复核结果'])]
for i,(a,b) in enumerate(values):
    x=142+i*919
    text(x,1818,a,33,ORANGE,600)
    block(x,1875,b,29,gap=48)
    if i<2:line(x+867,1789,x+867,1934,'#d3c5ac')
line(142,1960,2858,1960,'#d3c5ac')
text(142,2020,'我们的使用判断：主要价值在学习方法；已有编程基础可按需查阅，Python 部分作为入门复习。',31,INK,600)
# Footer
text(100,2145,'来源：selfteaching/the-craft-of-selfteaching  ·  研究版本 987a8e8  ·  原书许可 CC BY-NC-ND 3.0',24,MUTED)
text(100,2190,'本图为独立归纳，非原书插图；“对我们的意义”为本项目建议。部分工具配置具有历史性，上游 Notebook 未在本项目运行。',23,MUTED)
parts.append('</g></svg>')
(ROOT/'assets/understanding-map.svg').write_text('\n'.join(parts)+'\n',encoding='utf-8')
print('Built original SVG: 3000 × 2280.')
