const BaseError = require("./baseError");

module.exports = class InternalServerError extends BaseError {
    constructor(message = "Erro interno do servidor!") {
        super(500, message);
    }
};
