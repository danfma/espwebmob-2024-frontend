import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

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
      "react/react-in-jsx-scope": "off"
    }
  }
];


