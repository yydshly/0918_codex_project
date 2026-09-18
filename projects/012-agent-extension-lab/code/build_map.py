"""Render an original, editable Chinese infographic without external assets."""
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="2440" viewBox="0 0 1800 2440"><title>借助插件与 Hook 开发产品</title><desc>运行扩展点、插件与 Hook、十类定制产品方向，以及开发自己产品的参考价值。</desc><style>text{font-family:Microsoft YaHei,Arial,sans-serif;fill:#203d37}.title{font-weight:700}.muted{fill:#58716b}</style><rect width="1800" height="2440" fill="#f6f4eb"/>']
def box(x,y,w,h,fill='#fffef9',stroke='#d6ded1',radius=14):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>')
def txt(x,y,s,size=25,weight=False,fill=None):
    attrs=f' font-size="{size}"'+(' font-weight="700"' if weight else '')+(f' style="fill:{fill}"' if fill else '')
    parts.append(f'<text x="{x}" y="{y}"{attrs}>{escape(s)}</text>')
def section(y,n,title,sub):
    box(70,y-32,52,42,'#1e6759','#1e6759',7);txt(79,y,n,26,True,'#ffffff')
    txt(140,y,title,34,True);txt(140,y+39,sub,23,False,'#58716b')

txt(70,58,'AGENT EXTENSION LAB  /  012',20,False,'#58716b')
txt(70,135,'借助插件与 Hook 开发产品',62,True)
txt(72,184,'围绕 Agent 工作过程，定制功能、界面和工作流程',29,False,'#58716b')
box(70,217,1660,80,'#e2e9da','#e2e9da')
txt(98,268,'Claude Mods 展示扩展机制与示例；我们可以据此开发自己的产品。',31,True)

section(361,'01','可以接入哪些运行环节？','下面是运行扩展点示意，不是 Agent 的六大能力；具体以宿主开放接口为准。')
touchpoints=[('输入提交时','获取请求，按开放接口检查或补充','需求预检 · 模板与上下文'),('工具调用前后','观察调用、检查参数、处理结果','操作预览 · 脱敏与记录'),('权限与等待时','接收权限或输入请求，提醒用户','授权收件箱 · 人工接力'),('会话与代理状态变化时','获取开始、执行、结束等事件','多代理看板 · 像素办公室'),('输出与交付后','关联输出、产物和检查结果','交付验收 · 复盘与回放'),('界面与通知入口','展示组件、交互控件与提醒','桌面伴侣 · 等待小游戏')]
for i,(name,body,usage) in enumerate(touchpoints):
    x=70+(i%3)*560;y=427+(i//3)*153
    box(x,y,540,137)
    txt(x+23,y+39,name,29,True);txt(x+23,y+77,body,24);txt(x+23,y+112,'用于：'+usage,23,False,'#58716b')

section(791,'02','怎样把扩展点做成产品？','Agent 工作系统 → 开放扩展点 → 插件接入与功能实现 → 产品体验')
channels=[('插件 / Mod','安装与组合功能'),('Hook / SDK / 日志','接入过程、获取事件'),('工具 / MCP / API','连接资料与执行动作'),('网页 / IDE / 桌面','展示、交互与提醒')]
for i,(name,body) in enumerate(channels):
    x=70+i*420;box(x,853,400,102,'#e5ede4');txt(x+21,894,name,27,True);txt(x+21,930,body,24)
box(70,974,820,68);box(910,974,820,68)
txt(94,1017,'观察：真实事件 → 状态整理 → 界面与动画',27,True)
txt(934,1017,'控制：用户操作 → 执行接口 → 真实回执',27,True)
txt(72,1083,'显示状态不等于控制任务；停止事件不等于验收通过；扩展流程不等于改变模型参数。',25,False,'#a64e2d')

section(1161,'03','可以开发哪些产品？','十类产品方向设想；完整网页收录 40 项，并列出实现方式与边界。')
categories=[('需求与输入','需求预检 · 任务模板 · 范围确认'),('知识与上下文','项目记忆 · 会话交接 · 资料溯源'),('执行与质量','防跑偏监督 · 测试助手 · 交付验收'),('安全与治理','敏感信息处理 · 操作预览 · 授权收件箱'),('观察与成本','多代理看板 · 运行回放 · 预算管家'),('协作与调度','角色分工 · 任务队列 · 人工接力'),('界面与陪伴','像素办公室 · 桌面伴侣 · 等待小游戏'),('研究与内容','开源研究 · 内容流水线 · 实验记录'),('业务与集成','工单交付 · 设计检查 · 数据分析'),('平台与生态','多工具适配 · 插件诊断 · 场景模板')]
for i,(name,body) in enumerate(categories):
    x=70+(i%2)*840;y=1228+(i//2)*116
    box(x,y,820,100)
    txt(x+24,y+40,f'{i+1:02d}  {name}',28,True);txt(x+24,y+77,body,25,False,'#58716b')

section(1872,'04','对我们的意义：可以基于这些开发产品','借鉴扩展机制与案例，把自己的需求做成可使用、可定制的产品。')
values=[('选择产品场景','监控、陪伴、效率、安全或业务流程'),('组合功能与体验','接入事件和工具，设计自己的界面'),('验证并迭代产品','先做最小版本，验证真实使用价值')]
for i,(name,body) in enumerate(values):
    x=70+i*560;box(x,1938,540,108,'#efe9d9');txt(x+23,1981,name,30,True);txt(x+23,2020,body,24)
box(70,2070,1660,147,'#203d37','#203d37')
txt(101,2122,'我们可以做：监控台、桌面伴侣、小游戏、研究与验收助手',35,True,'#ffffff')
txt(102,2175,'例如：把开源项目研究做成带进展、证据和验收的独立工作台',29,False,'#e5eddd')
txt(72,2271,'开发路径：选择需求 → 确认可用接口 → 做出最小产品 → 验证与分发',30,True)
txt(72,2322,'Hook 提供接入时机；界面、存储、调度与业务逻辑仍需按产品需求实现。',26,False,'#58716b')
parts.append('<path d="M70 2359H1730" stroke="#cbd5c8"/>')
txt(72,2397,'原创理解图  ·  基于 Claude Mods、Hooks 与相关案例归纳  ·  产品设想，非真实运行截图',21,False,'#58716b')
parts.append('</svg>')
(ROOT/'assets'/'understanding-map.svg').write_text('\n'.join(parts),encoding='utf-8',newline='\n')
print('Created editable infographic: 1800 x 2440')
