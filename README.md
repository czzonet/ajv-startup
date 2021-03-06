# 通过 Ajv 统一验证 json 数据格式的使用

> Ajv JSON schema validator
>
> Security and reliability for JavaScript applications

什么时候要用？比较统一的验证。

## 例子

比如：

```ts
import Ajv from "ajv";
import AjvKeywords from "ajv-keywords";

const ajv = new Ajv();
AjvKeywords(ajv, ["typeof", "instanceof"]); // 除了 type 定义类型外，还可以通过 typeof，instanceof

// 规定校验类型
const schema = {
  type: "object",
  properties: {
    // 属性
    get: {
      type: "object", // 类型
      properties: {
        url: {
          type: "string",
        },
        method: {
          type: "string",
        },
      },
      required: ["url"], // 必须包含 url 属性
    },
    getMethod: {
      instanceof: "Function", // typeof 类似，只是支持的类型不同
    },
    list: {
      instanceof: ["Function", "Array"],
    },
  },
};

const data = {
  get: {
    url: "http://localhost:8080/get",
  },
  getMethod() {},
  list: [],
};

export const run = () => {
  const res = ajv.validate(schema, data);

  console.log({ res });
};
```

## 总结

可以统一处理类型错误，并且明确提示。

## Reference

1. [Ajv JSON schema validator](https://ajv.js.org/)
2. [使用 ajv 校验 json-schema 数据格式 - 掘金](https://juejin.cn/post/6916498595441016845)
