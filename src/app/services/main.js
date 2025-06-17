const { initializeEnv } = require("../helpers/transporter.js");
const sendEmail = require("../helpers/sendEmail.js");
const sendAutoReply = require("../helpers/sendAutoReply.js");
const ValidationError = require("../errors/validationError.js");

initializeEnv();

module.exports = async function (req) {
    const { name, email, phone, subject, message } = req?.body;
    const emailPattern = new RegExp(
        "^[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z0-9_]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$"
    );
    let errors = {};

    if (!name || name.trim() === "") errors.name = "O campo nome é obrigatório!";
    else if (name.length < 4) errors.name = "O nome deve conter no mínimo 4 caracteres!";
    if (!email || email.trim() === "") errors.email = "O campo e-mail é obrigatório!";
    else if (!emailPattern.test(email)) errors.email = "O e-mail informado não é válido!";
    else if (phone && !(phone.length === 10 || phone.length === 11))
        errors.phone = "O campo telefone deve conter entre 10 e 11 dígitos incluindo o DDD!";
    if (!message || message.trim() === "") errors.message = "O campo mensagem é obrigatório!";
    else if (message.length < 6) errors.message = "A mensagem deve ter no mínimo 6 caracteres!";

    /**
     * Notas sobre try-catch
     * Caso haja um try-catch, ele pode capturar erros localmente para tratamento específico.
     * Se não houver try-catch, qualquer erro lançado com `throw` em uma função async
     * será automaticamente transformado em uma Promise rejeitada,
     * permitindo que o erro seja capturado por um handler global, controller ou middleware de erro, ex: express-async-handler
     */
    return new Promise(function (resolve, reject) {
        if (Object.keys(errors).length)
            return reject(new ValidationError(`Dados inválidos|${JSON.stringify(errors)}`));

        if (name && email && message) {
            return sendEmail({
                name,
                email,
                ...(phone ? { phone: phone } : undefined),
                ...(subject ? { subject: subject } : undefined),
                message,
            })
                .then(function (emailInfo) {
                    return sendAutoReply(name, email, subject)
                        .then(function () {
                            resolve(emailInfo);
                        })
                        .catch(reject); // rejeita erro do sendAutoReply para catch externo
                })
                .catch(reject); // rejeita erro do sendEmail para catch externo
        } else return reject(new ValidationError("Dados ausentes!")); // rejeita para catch externo
    })
        .then(function (data) {
            return {
                success: true,
                message: "E-mail enviado!",
                ...(process.env.NODE_ENV === "development"
                    ? { envelope: data?.envelope }
                    : undefined),
            };
        })
        .catch(function (error) {
            throw error;
        });
};
