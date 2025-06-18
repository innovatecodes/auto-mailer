const ValidationError = require("../errors/validationError.js");
const InternalServerError = require("../errors/internalServerError.js");
const getErrorMessageByCode = require("../helpers/getErrorMessageByCode.js");

module.exports = async function (app) {
    // eslint-disable-next-line no-unused-vars
    app.use((error, request, response, next) => {
        // console.log("Debugging all errors: \n", error);
        let { customErrorMessage, isSMTPError } = getErrorMessageByCode(error);

        if (isSMTPError) {
            /**
             * customErrorMessage += `|${error.message}`
             * Anexa a mensagem original do erro para auxiliar na depuração.
             * Deve ser usada apenas em desenvolvimento, pois pode expor
             * informações sensíveis em produção (ex: detalhes de falhas SMTP).
             */
            if (process.env.NODE_ENV === "development" && customErrorMessage)
                customErrorMessage += `|${error.message}`;
            new InternalServerError(
                customErrorMessage || "Erro interno do servidor!"
            ).sendErrorResponse(response);
        } else if (error instanceof ValidationError || error instanceof InternalServerError)
            return error.sendErrorResponse(response);
        else {
            // Fallback: trata qualquer outro erro não esperado
            new InternalServerError(error?.message).sendErrorResponse(response);
            // response.status(500).send({ message: error?.message || "Erro interno do servidor!" });
        }
    });
};
