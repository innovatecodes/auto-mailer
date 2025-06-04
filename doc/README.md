# Auto Mailer

**Descrição:** É uma aplicação simples em Node.js projetada para enviar e-mails automáticos utilizando o nodemailer, com suporte do framework express. Ela oferece configuração baseada em ambientes, tornando-a adequada tanto para desenvolvimento quanto para produção.

## Funcionalidades

- Envie e-mails usando SMTP (Mailtrap ou SMTP personalizado)
- Configuração baseada no ambiente usando .env e .env.development
- Servidor Express leve
- Lógica de envio de e-mails personalizávelFluxo de desenvolvimento facilitado com --watch e cross-envEasy development workflow with    `--watch` and `cross-env`

---

## Início

### 1. Clone o repositório
```bash
git clone https://github.com/your-username/auto-mailer.git
cd auto-mailer
```
### 2. Instale as dependências:
```bash
npm install
```

### 3. Comandos npm
    - npm run dev
    - npm start
  
### 4. Notas sobre o ambiente 
    - O Mailtrap deve ser utilizado apenas em ambiente de desenvolvimento (NODE_ENV=development).
    - Para produção, defina NODEMAILER_HOST, NODEMAILER_SMTP_USER e NODEMAILER_SMTP_PASS com credenciais SMTP válidas.
    - Personalize os valores de acordo com seu ambiente local, utilizando o arquivo .env.example como referência.

### 5. Licença 
    - Para produção, defina NODEMAILER_HOST, NODEMAILER_SMTP_USER e NODEMAILER_SMTP_PASS com credenciais SMTP válidas.This project is licensed under the ISC License.
