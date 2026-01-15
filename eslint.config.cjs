const {
    defineConfig,
} = require("eslint/config");

const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
    js.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2024,
            },
            parser: tsParser,
            sourceType: "module",
            ecmaVersion: "latest",
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ["./tsconfig.eslint.json"],
            },
        },
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            ...typescriptEslint.configs["recommended-requiring-type-checking"].rules,
            "@typescript-eslint/no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
            }],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
    prettierConfig,
];
