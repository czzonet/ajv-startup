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
