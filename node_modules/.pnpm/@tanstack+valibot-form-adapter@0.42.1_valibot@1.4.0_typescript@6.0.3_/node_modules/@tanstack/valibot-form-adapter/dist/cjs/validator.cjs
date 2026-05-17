"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const valibot = require("valibot");
function prefixSchemaToErrors(valiErrors, transformErrors) {
  const schema = /* @__PURE__ */ new Map();
  for (const valiError of valiErrors) {
    if (!valiError.path) continue;
    const path = valiError.path.map(
      ({ key: segment }) => typeof segment === "number" ? `[${segment}]` : segment
    ).join(".").replace(/\.\[/g, "[");
    schema.set(path, (schema.get(path) ?? []).concat(valiError));
  }
  const transformedSchema = {};
  schema.forEach((value, key) => {
    transformedSchema[key] = transformErrors(value);
  });
  return transformedSchema;
}
function defaultFormTransformer(transformErrors) {
  return (zodErrors) => ({
    form: transformErrors(zodErrors),
    fields: prefixSchemaToErrors(zodErrors, transformErrors)
  });
}
const valibotValidator = (params = {}) => () => {
  const transformFieldErrors = params.transformErrors ?? ((issues) => issues.map((issue) => issue.message).join(", "));
  const getTransformStrategy = (validationSource) => validationSource === "form" ? defaultFormTransformer(transformFieldErrors) : transformFieldErrors;
  return {
    validate({ value, validationSource }, fn) {
      if (fn.async) return;
      const result = valibot.safeParse(fn, value);
      if (result.success) return;
      const transformer = getTransformStrategy(validationSource);
      return transformer(result.issues);
    },
    async validateAsync({ value, validationSource }, fn) {
      const result = await valibot.safeParseAsync(fn, value);
      if (result.success) return;
      const transformer = getTransformStrategy(validationSource);
      return transformer(result.issues);
    }
  };
};
exports.defaultFormTransformer = defaultFormTransformer;
exports.prefixSchemaToErrors = prefixSchemaToErrors;
exports.valibotValidator = valibotValidator;
//# sourceMappingURL=validator.cjs.map
