# 上游测试执行记录

- 日期：2026-09-18，Asia/Shanghai
- 上游 commit：`6df3065f1d8ddc2ce3615314d1d493f36d6b1c80`
- 环境：Windows x64；Node.js 24.19.0；pnpm 11.19.0；Vitest 3.2.4
- 安装：`pnpm install --frozen-lockfile --ignore-scripts`
- 构建：`pnpm --filter @understand-anything/core build`，退出码 0

在上游根目录执行：

```powershell
pnpm --filter @understand-anything/core exec vitest run src/__tests__/fingerprint.test.ts src/__tests__/change-classifier.test.ts src/__tests__/search.test.ts src/__tests__/schema.test.ts src/plugins/extractors/__tests__/typescript-extractor.test.ts src/analyzer/graph-builder.test.ts
```

终端结果摘要（并非全仓库测试）：

| 文件 | 通过 | 跳过 |
| --- | ---: | ---: |
| change-classifier.test.ts | 16 | 1 |
| search.test.ts | 10 | 0 |
| fingerprint.test.ts | 26 | 0 |
| typescript-extractor.test.ts | 3 | 0 |
| schema.test.ts | 67 | 0 |
| graph-builder.test.ts | 18 | 0 |
| 合计 | 140 | 1 |

终端显示 `Test Files 6 passed (6)`、`Tests 140 passed | 1 skipped (141)`、退出码 0。跳过项未被计作通过。该结果不代表完整产品的所有语言、所有平台和所有 Agent 工作流都通过。
