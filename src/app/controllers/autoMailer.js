const main = require("../services/main.js");
const path = require("path");
const initializeEnv = require("../config/dotenv.js");

initializeEnv();

module.exports = class AutoMailerController {
    // Página inicial
    static renderHomePage = async (request, response) => {
        response
            .status(200)
            .sendFile(path.resolve(__dirname, "..", "..", "..", "public", "index.html"));
    };

    // Rota usada pelo Load Balancer da AWS para health check da instância EC2. (opcional)
    static healthyChecks = async (request, response) => {
        response.status(200).end();
    };

    // Página 404
    static renderNotFoundPage = async (request, response) =>
        response
            .status(404)
            .sendFile(path.resolve(__dirname, "..", "..", "..", "public", "404.html"));

    // Envio de e-mail
    static handleRequest = async (request, response, next) => {
        //#region Nota sobre tratamento de erros com try-catch
        /**
         * No Express 4, funções async não propagam erros automaticamente,
         * então é preciso usar try/catch e chamar next(error) para tratar.
         * No Express 5, erros lançados em funções async são capturados automaticamente
         * e enviados ao middleware de erro, sem precisar de try/catch ou next.
         * O next(error) serve para indicar um erro e acionar o middleware de tratamento.
         */
        //#endregion
        try {
            const data = await main(request);
            return response.status(200).json({
                ...data,
            });
        } catch (error) {
            next(error);
        }
    };
};
