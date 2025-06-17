const BaseError = require("./baseError");

module.exports = class ValidationError extends BaseError {
    constructor(message) {
        super(400, message);
    }
};
