import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: [
            "js/recommended", // Aplica as regras recomendadas da ESLint (boas práticas e erros)
            prettier, // Desativa todas as regras de estilo/formatação do ESLint que podem conflitar com o Prettier
        ],
        ignores: ["eslint.config.mjs", "src/index.js"],
        rules: {
            "arrow-body-style": ["error", "as-needed"], // Enforce uso de corpo curto (sem chaves e return) em arrow functions quando possível
            "no-unsafe-optional-chaining": "warn", // Emite um aviso quando o uso de optional chaining (?.) pode ser inseguro
            "no-useless-catch": "off", // Desativa a regra que impede blocos try/catch desnecessários
            "no-unused-vars": "warn", // Emite um aviso quando variáveis são declaradas mas não utilizadas
            "no-undef": "off", // Desativa o aviso de uso de variáveis não declaradas (pode ser perigoso!)
            "no-console": "warn", // Emite aviso ao usar console.log (geralmente evitado em produção)
            "no-multiple-empty-lines": [
                "warn",
                {
                    max: 1, // no máximo 1 linha em branco consecutiva
                    maxEOF: 0, // nenhuma linha em branco no final do arquivo
                },
            ],
            "padded-blocks": ["warn", "never"], // impede linhas em branco no início/fim de blocos (como funções ou if)
            eqeqeq: ["warn", "always"], // Exige uso de === e !== em vez de == e != (comparação estrita)
            quotes: ["warn", "double"], // Força uso de aspas duplas para strings
            semi: ["warn", "always"], // Exige ponto e vírgula no final das instruções
        },
    },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
