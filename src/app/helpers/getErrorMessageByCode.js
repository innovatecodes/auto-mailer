module.exports = function (error) {
    let customErrorMessage;
    let isSMTPError = true;

    switch (error.code) {
        case "EAUTH":
            customErrorMessage = "Falha de autenticação com o servidor de e-mail";
            break;
        case "EDNS":
            customErrorMessage = "Host SMTP inválido. Verifique o nome do servidor de e-mail!";
            break;
        case "ESOCKET":
            if (error.reason && error.reason.includes("wrong version number"))
                customErrorMessage =
                    "Erro de conexão TLS/SSL: versão incompatível detectada. Verifique se a porta, a configuração 'secure' e o servidor SMTP estão corretos.";
            break;
        case "ECONNECTION":
            if (error instanceof RangeError)
                customErrorMessage = "Erro de porta SMTP: o intervalo deve estar entre 0 e 65535!";
            else
                customErrorMessage =
                    "Erro de conexão com o servidor SMTP. Verifique o host, a porta e sua conexão com a internet!";
            break;
        case "ETIMEDOUT":
        case "ESOCKETTIMEDOUT":
            customErrorMessage =
                "Tempo de conexão esgotado. O servidor de e-mail não respondeu a tempo!";
            break;
        case "ETLS":
        case "UNABLE_TO_VERIFY_LEAF_SIGNATURE":
            customErrorMessage =
                "Erro de segurança na conexão TLS. Pode ser causado por um certificado inválido ou mal configurado!";
            break;
        case "EENVELOPE":
            if (error.rejected && error.rejected.length > 0)
                customErrorMessage = `O endereço de e-mail do destinatário "${error.rejected[0]}" não é válido. Por favor, verifique!`;
            // Se não houver endereço rejeitado específico, usa a mensagem genérica.
            else
                customErrorMessage =
                    "Erro no formato do endereço de e-mail do destinatário. Por favor, verifique!";
            break;
        default:
            isSMTPError = false;
            break;
    }

    return { customErrorMessage, isSMTPError };
};
