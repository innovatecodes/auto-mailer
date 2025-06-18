const { initializeEnv } = require("../helpers/transporter.js");
const sendEmail = require("../helpers/sendEmail.js");
const sendAutoReply = require("../helpers/sendAutoReply.js");
const ValidationError = require("../errors/validationError.js");
// const { request } = require("../../app.js");

initializeEnv();

module.exports = async function (request) {
    const { name, email, phone, landline, cep, cpf, cnpj, subject, message } = request?.body;
    const emailPattern = new RegExp(
        "^[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z0-9_]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$"
    );
    let errors = {};

    if (!name || name.trim() === "") errors.name = "Nome é obrigatório!";
    else if (name.length < 4) errors.name = "Nome deve ter no mínimo 4 caracteres!";
    if (!email || email.trim() === "") errors.email = "E-mail é obrigatório!";
    else if (!emailPattern.test(email)) errors.email = "E-mail inválido!";
    //#region Validações preparadas para inputs opcionais (ainda não exibidos no HTML)
    if (phone && !(phone.length === 10 || phone.length === 11))
        errors.phone = "Telefone deve ter entre 10 e 11 dígitos, incluindo o DDD!";
    if (landline && landline.length !== 10)
        errors.landline = "Telefone fixo deve ter 10 dígitos, incluindo o DDD!";
    if (cep && cep.length !== 8) errors.cep = "CEP deve ter 8 dígitos!";
    if (cpf && cpf.length !== 11) errors.cpf = "CPF deve ter 11 dígitos!";
    if (cnpj && cnpj.length !== 14) errors.cnpj = "CNPJ deve ter 14 dígitos!";
    //#endregion
    if (!message || message.trim() === "") errors.message = "Mensagem não pode estar vazia!";
    else if (message.length < 6) errors.message = "Mensagem deve ter no mínimo 6 caracteres!";

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
                ...(landline ? { landline: landline } : undefined),
                ...(cep ? { cep: cep } : undefined),
                ...(cpf ? { cpf: cpf } : undefined),
                ...(cnpj ? { cnpj: cnpj } : undefined),
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
                // data: { ...request.body },
                ...(process.env.NODE_ENV === "development"
                    ? { envelope: data?.envelope }
                    : undefined),
            };
        })
        .catch(function (error) {
            throw error;
        });
};
