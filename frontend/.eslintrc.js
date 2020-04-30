module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ["plugin:react/recommended", "airbnb"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        quotes: ["error", "double"],
        indent: ["error", 4],
        "react/prop-types": 0,
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "object-curly-newline": [
            "error",
            {
                ObjectExpression: "always",
                ObjectPattern: { multiline: true  },
                ImportDeclaration: "never",
                ExportDeclaration: { multiline: true, minProperties: 3 },
            },
        ],
    },
};
