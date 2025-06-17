module.exports = class BaseError extends Error {
    /**
     * Construtor para a classe base de tratamento de erros personalizados.
     * Estende a classe Error padrão do JavaScript.
     *
     * @param {number} statusCode - O código de status HTTP do erro (ex: 400, 500).
     * @param {string} message - Uma mensagem amigável para o cliente sobre o erro.
     * Pode ser uma string JSON (para ser parseada) ou um objeto/null.
     */
    constructor(statusCode, message) {
        super(message);

        // Inicialização de Propriedades Internas (privadas por Convenção)
        // Estas propriedades são prefixadas com '_' para indicar que são para uso interno.
        this._statusCode = isNaN(statusCode) ? 500 : parseInt(statusCode);
        this._errorResponseInfo = {};
        let errors = "";

        if (this.message.includes("|")) {
            try {
                errors = JSON.parse(this.message.split("|")[1]);
                // eslint-disable-next-line no-unused-vars
            } catch (_) {
                errors = this.message.split("|")[1];
            }

            const dynamicPropertyName =
                typeof errors === "object" && Object.keys(errors).length ? "errors" : "error";
            Object.defineProperty(this._errorResponseInfo, dynamicPropertyName, {
                value: errors,
                enumerable: true,
            });
        }
    }

    sendErrorResponse(res) {
        res.status(this._statusCode).json({
            message: this.message.includes("|") ? this.message.split("|").at(0) : this.message,
            ...this._errorResponseInfo,
        });
    }
};
