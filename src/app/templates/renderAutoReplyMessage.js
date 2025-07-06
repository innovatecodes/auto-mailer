const { initializeEnv } = require("../helpers/transporter.js");

initializeEnv();

const whatsapp = process.env.WHATSAPP ?? "";
const ddd = whatsapp.slice(0, 2);

const renderPlainTextMessage = (name, emailSender, formattedDate) => `
Prezado(a) ${name}, agradecemos seu contato.\nEsta é uma resposta automática para confirmar o recebimento da sua mensagem em ${formattedDate}.\n
-----------------------------------------\n\n
Atenciosamente,\n${process.env.APP_NAME}\n
Website: ${
    process.env.WEBSITE_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "") || "Em construção"
}\nE-mail: ${emailSender}\nWhatsApp: (${ddd}) ${whatsapp.slice(2, 7)}-${whatsapp.slice(7)}`;

const renderHtmlTemplate = (name, emailSender, formattedDate) => `
<html style="padding: 1rem;">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${process.env.APP_NAME}</title>
  </head>
  <body style="
    font-family: Arial, sans-serif;
    background-color: #fdfdfd;
    padding: 1rem;
    border: 1px solid #dd4b25;
    max-width: max-content;
    margin: auto;
    height: max-content;">
    
    <main style="
      display: block;
      padding: 0.5rem 1rem;
      text-align: left;">
      <p>Prezado(a) <b>${name}</b>, agradecemos seu contato.</p>
      <p>Esta é uma resposta automática para confirmar o recebimento da sua mensagem em ${formattedDate}.</p>
    </main>

    <hr style="max-width: 50%; background-color: #dd4b25; height: 1px; border: none;" />

    <footer style="
      background-color: #fefefe;
      padding: 0.5rem 1rem;
      max-width: max-content;
      margin: auto;">
      
      <h3 style="display: inline-block; margin-top: 0;">
        Atenciosamente,<br />
        <strong style="color: #DD4B25;">
          ${process.env.APP_NAME}
        </strong>
      </h3>

      <br />

      <ul style="
        padding: 0;
        font-family: Arial, sans-serif;
        max-width: 100%;
        overflow-x: auto;
        color: #62676b;">
        
        <li>
          <strong>Website: </strong>
          ${
              process.env.WEBSITE_URL
                  ? `<a href="${process.env.WEBSITE_URL}">
                  ${process.env.WEBSITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>`
                  : "Em construção"
          }
        </li>

        <li>
          <strong>E-mail: </strong>
          <a href="mailto:${emailSender}">${emailSender}</a> 
        </li>

        <li>
          <strong>WhatsApp: </strong>
          ${
              whatsapp && whatsapp.length === 11
                  ? `<a href="https://api.whatsapp.com/send/?phone=55${whatsapp}" target="_blank">
                  (${ddd}) ${whatsapp.slice(2, 7)}-${whatsapp.slice(7)}
                </a>`
                  : "Não informado"
          }
        </li>
      </ul>
    </footer>
  </body>
</html>`;

module.exports = {
    renderPlainTextMessage,
    renderHtmlTemplate,
};
