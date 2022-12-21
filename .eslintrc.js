module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true
  },
  extends: ["eslint:recommended", "airbnb", "plugin:prettier/recommended"],
  rules: {
    "react/function-component-definition": [
      2,
      { namedcomponents: "arrow-function" }
    ]
  }
};
