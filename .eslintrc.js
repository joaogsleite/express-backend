module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: "babel-eslint",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "import/no-cycle": "off",
    "no-plusplus": "off",
    "jsdoc/no-undefined-types": 1,
    "max-classes-per-file": "off",
    "no-param-reassign": "off",
  },
  plugins: [
    "jsdoc",
  ],
  settings: {
    "import/resolver": {
      "babel-module": {
        "root": ["./src"],
      },
    },
  },
};
