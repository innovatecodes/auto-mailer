const { initializeEnv } = require("../helpers/transporter.js");

initializeEnv();

const whatsapp = process.env.WHATSAPP ?? "";
const ddd = whatsapp.slice(0, 2);

const renderPlainTextMessage = (name, emailSender, formattedDate) => `
Prezado(a) ${name}, agradecemos seu contato.\nEsta é uma resposta automática para confirmar o recebimento da sua mensagem em ${formattedDate}.\n
-----------------------------------------\n\n
Atenciosamente,\n${process.env.APP_NAME}\n
Website: ${
    process.env.WEBSITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "") || "Em construção"
}\nE-mail: ${emailSender}\nWhatsApp: (${ddd}) ${whatsapp.slice(2, 7)}-${whatsapp.slice(7)}`;

const renderHtmlTemplate = (name, emailSender, formattedDate) => `
  <html style="padding: 1rem;">
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

      <hr style="max-width: 50%; background-color:#dd4b25; height: 1px; border: none;" />
    
      <footer style="
        background-color: #fefefe;
        padding: 0.5rem 1rem;
        max-width: max-content;
        margin: auto;">
        <h3 style="display: inline-block; margin-top: 0">
          Atenciosamente,<br />
          <strong style="
            background-image: linear-gradient(
              rgb(221, 75, 37),
              rgb(0, 109, 180),
              rgb(236, 197, 11));
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            background-position: center center;">
            ${process.env.APP_NAME}
          </strong>
        </h3>

        <br />

        <div style="overflow-x: auto">
          <table style="
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: max-content;">
            <tr style="background-color: #dd4b25; color: #fafafa">
              <th style="border: 1px solid #dd4b25; text-align: left; padding: 8px">Website</th>
              <th style="border: 1px solid #dd4b25; text-align: left; padding: 8px">E-mail</th>
              <th style="border: 1px solid #dd4b25; text-align: left; padding: 8px">WhatsApp</th>
            </tr>
            <tr>
              <td style="border: 1px solid #dd4b25; text-align: left; padding: 8px">
                ${
                    process.env.WEBSITE_URL
                        ? `
                      <a href="${process.env.WEBSITE_URL}">
                        ${process.env.WEBSITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>`
                        : "Em construção"
                }
              </td>
              <td style="border: 1px solid #dd4b25; text-align: left; padding: 8px">
                <a href="mailto:${emailSender}">${emailSender}</a>
              </td>
              <td style="border: 1px solid #dd4b25; text-align: left; padding: 8px">
                ${
                    whatsapp && whatsapp.length === 11
                        ? `
                      <a href="https://api.whatsapp.com/send/?phone=55${whatsapp}" target="_blank">
                        (${ddd}) ${whatsapp.slice(2, 7)}-${whatsapp.slice(7)}
                      </a>`
                        : "Não informado"
                }
              </td>
            </tr>
          </table>
        </div>
      </footer>
    </body>
  </html>`;

module.exports = {
    renderPlainTextMessage,
    renderHtmlTemplate,
};
