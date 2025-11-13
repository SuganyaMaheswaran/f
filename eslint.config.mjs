// This file is created by setup process 'npm init @eslint/config@latest'
// It is configured for node.js using CommonJS modules,
//  and uses good defaults for linting JavaScript projects. 
// You can read more about how to configure eslint if you're interested, 
// or want to override defaults.

import js from "@eslint/js";
import globals from "globals";
import pluginJs from '@eslint/js';
import { defineConfig } from "eslint/config";

export default defineConfig([  
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions:{
      globals:{
        ...globals.node,
        ...globals.jest,
      },
    },
    //this rule lets no-unused-vars as warning  lets inline disables work.
    rules:{"no-unused-vars": ["warn", { argsIgnorePattern: "^" }]},
  },
  pluginJs.configs.recommended
]);
