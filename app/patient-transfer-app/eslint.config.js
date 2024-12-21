import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  stylistic.configs["all-flat"],
  {
    languageOptions: {
      parser: parserTs
    }
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "@stylistic/indent": [
        "error",
        2
      ],
      "@stylistic/function-paren-newline": "off",
      "@stylistic/padded-blocks": [
        "error",
        "never"
      ],
      "@stylistic/quote-props": [
        "error",
        "as-needed"
      ],
      "@stylistic/function-call-argument-newline": [
        "error",
        "consistent"
      ],
      "@stylistic/array-element-newline": [
        "error",
        "consistent"
      ],
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    }
  }
];


