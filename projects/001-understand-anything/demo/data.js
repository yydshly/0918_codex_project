window.UA_RESEARCH = {
  "graph": {
    "version": "1.0.0",
    "project": {
      "name": "Order Lab · 确定性解析实验",
      "languages": [
        "sql",
        "typescript"
      ],
      "frameworks": [],
      "description": "结构来自上游核心库实测；中文摘要、分层和导览由本研究编写，未执行上游 LLM 流水线。",
      "analyzedAt": "2026-09-18T00:07:44.316Z",
      "gitCommitHash": ""
    },
    "nodes": [
      {
        "id": "file:src/api.ts",
        "type": "file",
        "name": "api.ts",
        "filePath": "src/api.ts",
        "summary": "接收数量与单价，将结账请求交给订单服务。",
        "tags": [
          "入口"
        ],
        "complexity": "simple"
      },
      {
        "id": "function:src/api.ts:handleCheckout",
        "type": "function",
        "name": "handleCheckout",
        "filePath": "src/api.ts",
        "lineRange": [
          3,
          5
        ],
        "summary": "接收数量与单价，将结账请求交给订单服务。",
        "tags": [],
        "complexity": "simple"
      },
      {
        "id": "file:src/orders.ts",
        "type": "file",
        "name": "orders.ts",
        "filePath": "src/orders.ts",
        "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
        "tags": [
          "业务"
        ],
        "complexity": "simple"
      },
      {
        "id": "function:src/orders.ts:createOrder",
        "type": "function",
        "name": "createOrder",
        "filePath": "src/orders.ts",
        "lineRange": [
          5,
          9
        ],
        "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
        "tags": [],
        "complexity": "simple"
      },
      {
        "id": "file:src/inventory.ts",
        "type": "file",
        "name": "inventory.ts",
        "filePath": "src/inventory.ts",
        "summary": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
        "tags": [
          "业务"
        ],
        "complexity": "simple"
      },
      {
        "id": "function:src/inventory.ts:reserveStock",
        "type": "function",
        "name": "reserveStock",
        "filePath": "src/inventory.ts",
        "lineRange": [
          1,
          3
        ],
        "summary": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
        "tags": [],
        "complexity": "simple"
      },
      {
        "id": "file:src/payment.ts",
        "type": "file",
        "name": "payment.ts",
        "filePath": "src/payment.ts",
        "summary": "检查金额后生成模拟凭证；没有连接真实支付服务。",
        "tags": [
          "基础设施"
        ],
        "complexity": "simple"
      },
      {
        "id": "function:src/payment.ts:chargePayment",
        "type": "function",
        "name": "chargePayment",
        "filePath": "src/payment.ts",
        "lineRange": [
          1,
          4
        ],
        "summary": "检查金额后生成模拟凭证；没有连接真实支付服务。",
        "tags": [],
        "complexity": "simple"
      },
      {
        "id": "file:src/repository.ts",
        "type": "file",
        "name": "repository.ts",
        "filePath": "src/repository.ts",
        "summary": "返回模拟订单标识；没有持久化或数据库访问。",
        "tags": [
          "基础设施"
        ],
        "complexity": "simple"
      },
      {
        "id": "function:src/repository.ts:saveOrder",
        "type": "function",
        "name": "saveOrder",
        "filePath": "src/repository.ts",
        "lineRange": [
          1,
          3
        ],
        "summary": "返回模拟订单标识；没有持久化或数据库访问。",
        "tags": [],
        "complexity": "simple"
      },
      {
        "id": "schema:schema.sql",
        "type": "schema",
        "name": "schema.sql",
        "filePath": "schema.sql",
        "summary": "独立 SQL 解析样本，声明 orders 表及三个字段。",
        "tags": [
          "数据"
        ],
        "complexity": "simple"
      },
      {
        "id": "table:schema.sql:orders",
        "type": "table",
        "name": "orders",
        "filePath": "schema.sql",
        "lineRange": [
          1,
          5
        ],
        "summary": "table: orders (3 fields)",
        "tags": [],
        "complexity": "simple"
      }
    ],
    "edges": [
      {
        "source": "file:src/api.ts",
        "target": "function:src/api.ts:handleCheckout",
        "type": "contains",
        "direction": "forward",
        "weight": 1
      },
      {
        "source": "file:src/orders.ts",
        "target": "function:src/orders.ts:createOrder",
        "type": "contains",
        "direction": "forward",
        "weight": 1
      },
      {
        "source": "file:src/inventory.ts",
        "target": "function:src/inventory.ts:reserveStock",
        "type": "contains",
        "direction": "forward",
        "weight": 1
      },
      {
        "source": "file:src/payment.ts",
        "target": "function:src/payment.ts:chargePayment",
        "type": "contains",
        "direction": "forward",
        "weight": 1
      },
      {
        "source": "file:src/repository.ts",
        "target": "function:src/repository.ts:saveOrder",
        "type": "contains",
        "direction": "forward",
        "weight": 1
      },
      {
        "source": "schema:schema.sql",
        "target": "table:schema.sql:orders",
        "type": "contains",
        "direction": "forward",
        "weight": 1
      },
      {
        "source": "file:src/api.ts",
        "target": "file:src/orders.ts",
        "type": "imports",
        "direction": "forward",
        "weight": 0.7
      },
      {
        "source": "function:src/api.ts:handleCheckout",
        "target": "function:src/orders.ts:createOrder",
        "type": "calls",
        "direction": "forward",
        "weight": 0.8
      },
      {
        "source": "file:src/orders.ts",
        "target": "file:src/inventory.ts",
        "type": "imports",
        "direction": "forward",
        "weight": 0.7
      },
      {
        "source": "file:src/orders.ts",
        "target": "file:src/payment.ts",
        "type": "imports",
        "direction": "forward",
        "weight": 0.7
      },
      {
        "source": "file:src/orders.ts",
        "target": "file:src/repository.ts",
        "type": "imports",
        "direction": "forward",
        "weight": 0.7
      },
      {
        "source": "function:src/orders.ts:createOrder",
        "target": "function:src/inventory.ts:reserveStock",
        "type": "calls",
        "direction": "forward",
        "weight": 0.8
      },
      {
        "source": "function:src/orders.ts:createOrder",
        "target": "function:src/payment.ts:chargePayment",
        "type": "calls",
        "direction": "forward",
        "weight": 0.8
      },
      {
        "source": "function:src/orders.ts:createOrder",
        "target": "function:src/repository.ts:saveOrder",
        "type": "calls",
        "direction": "forward",
        "weight": 0.8
      }
    ],
    "layers": [
      {
        "id": "layer-0",
        "name": "入口",
        "description": "研究者注释层",
        "nodeIds": [
          "file:src/api.ts",
          "function:src/api.ts:handleCheckout"
        ]
      },
      {
        "id": "layer-1",
        "name": "业务",
        "description": "研究者注释层",
        "nodeIds": [
          "file:src/orders.ts",
          "function:src/orders.ts:createOrder",
          "file:src/inventory.ts",
          "function:src/inventory.ts:reserveStock"
        ]
      },
      {
        "id": "layer-2",
        "name": "基础设施",
        "description": "研究者注释层",
        "nodeIds": [
          "file:src/payment.ts",
          "function:src/payment.ts:chargePayment",
          "file:src/repository.ts",
          "function:src/repository.ts:saveOrder"
        ]
      },
      {
        "id": "layer-3",
        "name": "数据",
        "description": "研究者注释层",
        "nodeIds": [
          "schema:schema.sql",
          "table:schema.sql:orders"
        ]
      }
    ],
    "tour": [
      {
        "order": 1,
        "title": "handleCheckout",
        "description": "接收数量与单价，将结账请求交给订单服务。",
        "nodeIds": [
          "function:src/api.ts:handleCheckout"
        ]
      },
      {
        "order": 2,
        "title": "createOrder",
        "description": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
        "nodeIds": [
          "function:src/orders.ts:createOrder"
        ]
      },
      {
        "order": 3,
        "title": "reserveStock",
        "description": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
        "nodeIds": [
          "function:src/inventory.ts:reserveStock"
        ]
      },
      {
        "order": 4,
        "title": "chargePayment",
        "description": "检查金额后生成模拟凭证；没有连接真实支付服务。",
        "nodeIds": [
          "function:src/payment.ts:chargePayment"
        ]
      },
      {
        "order": 5,
        "title": "saveOrder",
        "description": "返回模拟订单标识；没有持久化或数据库访问。",
        "nodeIds": [
          "function:src/repository.ts:saveOrder"
        ]
      }
    ]
  },
  "report": {
    "upstream": {
      "repository": "https://github.com/Egonex-AI/Understand-Anything",
      "commit": "6df3065f1d8ddc2ce3615314d1d493f36d6b1c80",
      "license": "MIT"
    },
    "generatedAt": "2026-09-18T00:07:44.554Z",
    "runtime": {
      "node": "v24.19.0",
      "platform": "win32",
      "arch": "x64"
    },
    "fixtureHash": "40ef5d0ae6b974e9b875374e420f8d793c41dad86c5a370ed8dea79585c7b248",
    "scope": "上游核心库与提取脚本实测；没有运行完整多 Agent / LLM 流水线。",
    "provenance": {
      "structure": "upstream-parser",
      "graph": "upstream-GraphBuilder + fixture-only import/call adapter",
      "summaries": "research-authored",
      "layers": "research-authored",
      "tour": "research-authored",
      "impact": "upstream-buildDiffContext",
      "demoSearch": "local substring filter",
      "upstreamSearch": "upstream-SearchEngine (recorded experiment)"
    },
    "counts": {
      "files": 6,
      "nodes": 12,
      "edges": 14
    },
    "checks": [
      {
        "id": "symbols",
        "name": "Tree-sitter 提取 5 个函数及其行号",
        "passed": true
      },
      {
        "id": "sql",
        "name": "SQLParser 提取 orders 表和三个字段",
        "passed": true
      },
      {
        "id": "graph",
        "name": "GraphBuilder 组装 12 节点、4 条导入和 4 条调用关系",
        "passed": true
      },
      {
        "id": "impact",
        "name": "支付文件变化只返回一跳邻居：订单受影响，入口不在结果中",
        "passed": true
      },
      {
        "id": "search",
        "name": "上游 Fuse 搜索定位支付函数，未知词返回空结果",
        "passed": true
      },
      {
        "id": "fingerprint",
        "name": "识别函数签名变化；函数体阈值变化被归类 COSMETIC",
        "passed": true
      },
      {
        "id": "entrypoint",
        "name": "上游 extract-structure 入口处理全部 6 个文件",
        "passed": true
      }
    ],
    "searchResults": [
      {
        "query": "chargePayment",
        "results": [
          {
            "nodeId": "function:src/payment.ts:chargePayment",
            "score": 5.477420592293901e-7
          }
        ]
      },
      {
        "query": "库存",
        "results": [
          {
            "nodeId": "file:src/orders.ts",
            "score": 0.251188643150958
          },
          {
            "nodeId": "function:src/orders.ts:createOrder",
            "score": 0.251188643150958
          },
          {
            "nodeId": "file:src/inventory.ts",
            "score": 0.3765303604122781
          },
          {
            "nodeId": "function:src/inventory.ts:reserveStock",
            "score": 0.3765303604122781
          }
        ]
      },
      {
        "query": "不存在的符号xyz",
        "results": []
      }
    ],
    "fingerprints": {
      "changes": {
        "identical": {
          "filePath": "src/inventory.ts",
          "changeLevel": "NONE",
          "details": []
        },
        "bodyOnly": {
          "filePath": "src/inventory.ts",
          "changeLevel": "COSMETIC",
          "details": [
            "internal logic changed (no structural impact)"
          ]
        },
        "signature": {
          "filePath": "src/inventory.ts",
          "changeLevel": "STRUCTURAL",
          "details": [
            "params changed: reserveStock"
          ]
        }
      },
      "behavior": {
        "quantity": 50,
        "before": true,
        "after": false
      },
      "decision": {
        "action": "SKIP",
        "filesToReanalyze": [],
        "rerunArchitecture": false,
        "rerunTour": false,
        "reason": "1 file(s) have cosmetic-only changes (no structural impact)"
      }
    },
    "extractionLog": ""
  },
  "impact": {
    "src/api.ts": {
      "projectName": "Order Lab · 确定性解析实验",
      "changedFiles": [
        "src/api.ts"
      ],
      "changedNodes": [
        {
          "id": "file:src/api.ts",
          "type": "file",
          "name": "api.ts",
          "filePath": "src/api.ts",
          "summary": "接收数量与单价，将结账请求交给订单服务。",
          "tags": [
            "入口"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/api.ts:handleCheckout",
          "type": "function",
          "name": "handleCheckout",
          "filePath": "src/api.ts",
          "lineRange": [
            3,
            5
          ],
          "summary": "接收数量与单价，将结账请求交给订单服务。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "affectedNodes": [
        {
          "id": "file:src/orders.ts",
          "type": "file",
          "name": "orders.ts",
          "filePath": "src/orders.ts",
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [
            "业务"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/orders.ts:createOrder",
          "type": "function",
          "name": "createOrder",
          "filePath": "src/orders.ts",
          "lineRange": [
            5,
            9
          ],
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "impactedEdges": [
        {
          "source": "file:src/api.ts",
          "target": "function:src/api.ts:handleCheckout",
          "type": "contains",
          "direction": "forward",
          "weight": 1
        },
        {
          "source": "file:src/api.ts",
          "target": "file:src/orders.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "function:src/api.ts:handleCheckout",
          "target": "function:src/orders.ts:createOrder",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        }
      ],
      "affectedLayers": [
        {
          "id": "layer-0",
          "name": "入口",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/api.ts",
            "function:src/api.ts:handleCheckout"
          ]
        },
        {
          "id": "layer-1",
          "name": "业务",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/orders.ts",
            "function:src/orders.ts:createOrder",
            "file:src/inventory.ts",
            "function:src/inventory.ts:reserveStock"
          ]
        }
      ],
      "unmappedFiles": []
    },
    "src/orders.ts": {
      "projectName": "Order Lab · 确定性解析实验",
      "changedFiles": [
        "src/orders.ts"
      ],
      "changedNodes": [
        {
          "id": "file:src/orders.ts",
          "type": "file",
          "name": "orders.ts",
          "filePath": "src/orders.ts",
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [
            "业务"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/orders.ts:createOrder",
          "type": "function",
          "name": "createOrder",
          "filePath": "src/orders.ts",
          "lineRange": [
            5,
            9
          ],
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "affectedNodes": [
        {
          "id": "file:src/api.ts",
          "type": "file",
          "name": "api.ts",
          "filePath": "src/api.ts",
          "summary": "接收数量与单价，将结账请求交给订单服务。",
          "tags": [
            "入口"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/api.ts:handleCheckout",
          "type": "function",
          "name": "handleCheckout",
          "filePath": "src/api.ts",
          "lineRange": [
            3,
            5
          ],
          "summary": "接收数量与单价，将结账请求交给订单服务。",
          "tags": [],
          "complexity": "simple"
        },
        {
          "id": "file:src/inventory.ts",
          "type": "file",
          "name": "inventory.ts",
          "filePath": "src/inventory.ts",
          "summary": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
          "tags": [
            "业务"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/inventory.ts:reserveStock",
          "type": "function",
          "name": "reserveStock",
          "filePath": "src/inventory.ts",
          "lineRange": [
            1,
            3
          ],
          "summary": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
          "tags": [],
          "complexity": "simple"
        },
        {
          "id": "file:src/payment.ts",
          "type": "file",
          "name": "payment.ts",
          "filePath": "src/payment.ts",
          "summary": "检查金额后生成模拟凭证；没有连接真实支付服务。",
          "tags": [
            "基础设施"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/payment.ts:chargePayment",
          "type": "function",
          "name": "chargePayment",
          "filePath": "src/payment.ts",
          "lineRange": [
            1,
            4
          ],
          "summary": "检查金额后生成模拟凭证；没有连接真实支付服务。",
          "tags": [],
          "complexity": "simple"
        },
        {
          "id": "file:src/repository.ts",
          "type": "file",
          "name": "repository.ts",
          "filePath": "src/repository.ts",
          "summary": "返回模拟订单标识；没有持久化或数据库访问。",
          "tags": [
            "基础设施"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/repository.ts:saveOrder",
          "type": "function",
          "name": "saveOrder",
          "filePath": "src/repository.ts",
          "lineRange": [
            1,
            3
          ],
          "summary": "返回模拟订单标识；没有持久化或数据库访问。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "impactedEdges": [
        {
          "source": "file:src/orders.ts",
          "target": "function:src/orders.ts:createOrder",
          "type": "contains",
          "direction": "forward",
          "weight": 1
        },
        {
          "source": "file:src/api.ts",
          "target": "file:src/orders.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "function:src/api.ts:handleCheckout",
          "target": "function:src/orders.ts:createOrder",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        },
        {
          "source": "file:src/orders.ts",
          "target": "file:src/inventory.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "file:src/orders.ts",
          "target": "file:src/payment.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "file:src/orders.ts",
          "target": "file:src/repository.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "function:src/orders.ts:createOrder",
          "target": "function:src/inventory.ts:reserveStock",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        },
        {
          "source": "function:src/orders.ts:createOrder",
          "target": "function:src/payment.ts:chargePayment",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        },
        {
          "source": "function:src/orders.ts:createOrder",
          "target": "function:src/repository.ts:saveOrder",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        }
      ],
      "affectedLayers": [
        {
          "id": "layer-0",
          "name": "入口",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/api.ts",
            "function:src/api.ts:handleCheckout"
          ]
        },
        {
          "id": "layer-1",
          "name": "业务",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/orders.ts",
            "function:src/orders.ts:createOrder",
            "file:src/inventory.ts",
            "function:src/inventory.ts:reserveStock"
          ]
        },
        {
          "id": "layer-2",
          "name": "基础设施",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/payment.ts",
            "function:src/payment.ts:chargePayment",
            "file:src/repository.ts",
            "function:src/repository.ts:saveOrder"
          ]
        }
      ],
      "unmappedFiles": []
    },
    "src/inventory.ts": {
      "projectName": "Order Lab · 确定性解析实验",
      "changedFiles": [
        "src/inventory.ts"
      ],
      "changedNodes": [
        {
          "id": "file:src/inventory.ts",
          "type": "file",
          "name": "inventory.ts",
          "filePath": "src/inventory.ts",
          "summary": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
          "tags": [
            "业务"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/inventory.ts:reserveStock",
          "type": "function",
          "name": "reserveStock",
          "filePath": "src/inventory.ts",
          "lineRange": [
            1,
            3
          ],
          "summary": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "affectedNodes": [
        {
          "id": "file:src/orders.ts",
          "type": "file",
          "name": "orders.ts",
          "filePath": "src/orders.ts",
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [
            "业务"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/orders.ts:createOrder",
          "type": "function",
          "name": "createOrder",
          "filePath": "src/orders.ts",
          "lineRange": [
            5,
            9
          ],
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "impactedEdges": [
        {
          "source": "file:src/inventory.ts",
          "target": "function:src/inventory.ts:reserveStock",
          "type": "contains",
          "direction": "forward",
          "weight": 1
        },
        {
          "source": "file:src/orders.ts",
          "target": "file:src/inventory.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "function:src/orders.ts:createOrder",
          "target": "function:src/inventory.ts:reserveStock",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        }
      ],
      "affectedLayers": [
        {
          "id": "layer-1",
          "name": "业务",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/orders.ts",
            "function:src/orders.ts:createOrder",
            "file:src/inventory.ts",
            "function:src/inventory.ts:reserveStock"
          ]
        }
      ],
      "unmappedFiles": []
    },
    "src/payment.ts": {
      "projectName": "Order Lab · 确定性解析实验",
      "changedFiles": [
        "src/payment.ts"
      ],
      "changedNodes": [
        {
          "id": "file:src/payment.ts",
          "type": "file",
          "name": "payment.ts",
          "filePath": "src/payment.ts",
          "summary": "检查金额后生成模拟凭证；没有连接真实支付服务。",
          "tags": [
            "基础设施"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/payment.ts:chargePayment",
          "type": "function",
          "name": "chargePayment",
          "filePath": "src/payment.ts",
          "lineRange": [
            1,
            4
          ],
          "summary": "检查金额后生成模拟凭证；没有连接真实支付服务。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "affectedNodes": [
        {
          "id": "file:src/orders.ts",
          "type": "file",
          "name": "orders.ts",
          "filePath": "src/orders.ts",
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [
            "业务"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/orders.ts:createOrder",
          "type": "function",
          "name": "createOrder",
          "filePath": "src/orders.ts",
          "lineRange": [
            5,
            9
          ],
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "impactedEdges": [
        {
          "source": "file:src/payment.ts",
          "target": "function:src/payment.ts:chargePayment",
          "type": "contains",
          "direction": "forward",
          "weight": 1
        },
        {
          "source": "file:src/orders.ts",
          "target": "file:src/payment.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "function:src/orders.ts:createOrder",
          "target": "function:src/payment.ts:chargePayment",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        }
      ],
      "affectedLayers": [
        {
          "id": "layer-1",
          "name": "业务",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/orders.ts",
            "function:src/orders.ts:createOrder",
            "file:src/inventory.ts",
            "function:src/inventory.ts:reserveStock"
          ]
        },
        {
          "id": "layer-2",
          "name": "基础设施",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/payment.ts",
            "function:src/payment.ts:chargePayment",
            "file:src/repository.ts",
            "function:src/repository.ts:saveOrder"
          ]
        }
      ],
      "unmappedFiles": []
    },
    "src/repository.ts": {
      "projectName": "Order Lab · 确定性解析实验",
      "changedFiles": [
        "src/repository.ts"
      ],
      "changedNodes": [
        {
          "id": "file:src/repository.ts",
          "type": "file",
          "name": "repository.ts",
          "filePath": "src/repository.ts",
          "summary": "返回模拟订单标识；没有持久化或数据库访问。",
          "tags": [
            "基础设施"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/repository.ts:saveOrder",
          "type": "function",
          "name": "saveOrder",
          "filePath": "src/repository.ts",
          "lineRange": [
            1,
            3
          ],
          "summary": "返回模拟订单标识；没有持久化或数据库访问。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "affectedNodes": [
        {
          "id": "file:src/orders.ts",
          "type": "file",
          "name": "orders.ts",
          "filePath": "src/orders.ts",
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [
            "业务"
          ],
          "complexity": "simple"
        },
        {
          "id": "function:src/orders.ts:createOrder",
          "type": "function",
          "name": "createOrder",
          "filePath": "src/orders.ts",
          "lineRange": [
            5,
            9
          ],
          "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "impactedEdges": [
        {
          "source": "file:src/repository.ts",
          "target": "function:src/repository.ts:saveOrder",
          "type": "contains",
          "direction": "forward",
          "weight": 1
        },
        {
          "source": "file:src/orders.ts",
          "target": "file:src/repository.ts",
          "type": "imports",
          "direction": "forward",
          "weight": 0.7
        },
        {
          "source": "function:src/orders.ts:createOrder",
          "target": "function:src/repository.ts:saveOrder",
          "type": "calls",
          "direction": "forward",
          "weight": 0.8
        }
      ],
      "affectedLayers": [
        {
          "id": "layer-1",
          "name": "业务",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/orders.ts",
            "function:src/orders.ts:createOrder",
            "file:src/inventory.ts",
            "function:src/inventory.ts:reserveStock"
          ]
        },
        {
          "id": "layer-2",
          "name": "基础设施",
          "description": "研究者注释层",
          "nodeIds": [
            "file:src/payment.ts",
            "function:src/payment.ts:chargePayment",
            "file:src/repository.ts",
            "function:src/repository.ts:saveOrder"
          ]
        }
      ],
      "unmappedFiles": []
    },
    "schema.sql": {
      "projectName": "Order Lab · 确定性解析实验",
      "changedFiles": [
        "schema.sql"
      ],
      "changedNodes": [
        {
          "id": "schema:schema.sql",
          "type": "schema",
          "name": "schema.sql",
          "filePath": "schema.sql",
          "summary": "独立 SQL 解析样本，声明 orders 表及三个字段。",
          "tags": [
            "数据"
          ],
          "complexity": "simple"
        },
        {
          "id": "table:schema.sql:orders",
          "type": "table",
          "name": "orders",
          "filePath": "schema.sql",
          "lineRange": [
            1,
            5
          ],
          "summary": "table: orders (3 fields)",
          "tags": [],
          "complexity": "simple"
        }
      ],
      "affectedNodes": [],
      "impactedEdges": [
        {
          "source": "schema:schema.sql",
          "target": "table:schema.sql:orders",
          "type": "contains",
          "direction": "forward",
          "weight": 1
        }
      ],
      "affectedLayers": [
        {
          "id": "layer-3",
          "name": "数据",
          "description": "研究者注释层",
          "nodeIds": [
            "schema:schema.sql",
            "table:schema.sql:orders"
          ]
        }
      ],
      "unmappedFiles": []
    }
  },
  "sources": {
    "src/api.ts": "import { createOrder } from './orders';\n\nexport function handleCheckout(quantity: number, unitPrice: number): string {\n  return createOrder(quantity, unitPrice);\n}\n",
    "src/orders.ts": "import { reserveStock } from './inventory';\nimport { chargePayment } from './payment';\nimport { saveOrder } from './repository';\n\nexport function createOrder(quantity: number, unitPrice: number): string {\n  if (!reserveStock(quantity)) throw new Error('Insufficient stock');\n  const receipt = chargePayment(quantity * unitPrice);\n  return saveOrder(quantity, receipt);\n}\n",
    "src/inventory.ts": "export function reserveStock(quantity: number): boolean {\n  return quantity > 0 && quantity <= 100;\n}\n",
    "src/payment.ts": "export function chargePayment(amount: number): string {\n  if (amount <= 0) throw new Error('Invalid amount');\n  return `demo-receipt-${amount}`;\n}\n",
    "src/repository.ts": "export function saveOrder(quantity: number, receipt: string): string {\n  return `demo-order:${quantity}:${receipt}`;\n}\n",
    "schema.sql": "CREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  quantity INTEGER NOT NULL,\n  receipt TEXT NOT NULL\n);\n"
  },
  "annotations": {
    "src/api.ts": {
      "summary": "接收数量与单价，将结账请求交给订单服务。",
      "layer": "入口",
      "symbol": "handleCheckout"
    },
    "src/orders.ts": {
      "summary": "先检查库存，再生成模拟支付凭证，最后生成订单标识。",
      "layer": "业务",
      "symbol": "createOrder"
    },
    "src/inventory.ts": {
      "summary": "检查数量是否大于零且不超过 100。此样本不会扣减库存。",
      "layer": "业务",
      "symbol": "reserveStock"
    },
    "src/payment.ts": {
      "summary": "检查金额后生成模拟凭证；没有连接真实支付服务。",
      "layer": "基础设施",
      "symbol": "chargePayment"
    },
    "src/repository.ts": {
      "summary": "返回模拟订单标识；没有持久化或数据库访问。",
      "layer": "基础设施",
      "symbol": "saveOrder"
    },
    "schema.sql": {
      "summary": "独立 SQL 解析样本，声明 orders 表及三个字段。",
      "layer": "数据",
      "symbol": "orders"
    }
  }
};
