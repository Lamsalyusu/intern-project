import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern":"^_",
          "varsIgnorePattern":"^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
    },
  },
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off",
       "no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern":"^_",
          "varsIgnorePattern":"^_",
          "caughtErrorIgnorePattern":"^_"
        }
       ],
    },
  },
];


// varsIgnorePattern: "^_" — an unused variable starting with _ (like const _unused = ...) won't warn
// argsIgnorePattern: "^_" — an unused function parameter starting with _ (like down(queryInterface, _Sequelize)) won't warn
// caughtErrorsIgnorePattern: "^_" — an unused catch block error starting with _ (like catch (_error) {}) won't warn

