# :email: AUTO MAILER

Aplicação simples desenvolvida em Node.js para envio automático de e-mails, utilizando o Nodemailer e o framework Express. Ideal para testes, notificações e integrações com sistemas externos.

## :hammer_and_wrench: Recursos

- Envio de e-mails via SMTP (ex: Mailtrap, Gmail, ou servidor próprio)
- Configuração por ambiente com arquivos `.env`e `.env.development`
- Uso de `multer` para analisar requisições 'multipart/form-data' (ex: multer().none())
- Middleware de tratamento assíncrono com `express-async-handler` (opcional)
- Servidor leve usando Express
- Linting com ESLint
- Scripts separados para desenvolvimento e produção

---

## :rocket: Como começar

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/auto-mailer.git
cd auto-mailer
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar arquivos `.env` e `.env.development`

- Baseie-se no `.env.example` (crie esse arquivo, se ainda não existir).
- Use Mailtrap apenas em ambiente de desenvolvimento (`NODE_ENV=development`).

---

## :package: Scripts disponíveis

- `npm run dev` – Inicia o servidor em modo desenvolvimento com `--watch`
- `npm start` – Inicia o servidor em modo produção
- `npm run lint` – Verifica a qualidade do código com ESLint
- `npm run lint:fix` – Corrige erros automaticamente

---

## :toolbox: Tecnologias e dependências

- **Node.js**
- **Express**
- **Nodemailer**
- **Dotenv**
- **Multer**
- **Cross-env**
- **ESLint**

---

## :closed_lock_with_key: Arquivos Sensíveis

Este projeto utiliza uma chave RSA privada (`rsa-key-pair.pem`) para fins de deploy ou acesso remoto via AWS.

> :warning: **Importante:**  
> O arquivo `rsa-key-pair.pem` está listado no `.gitignore` e **não deve ser versionado**.  
> Ele é necessário apenas para ambientes locais ou de deploy em nuvem (ex: SSH na AWS EC2) e **deve ser fornecido manualmente**.

---

## :computer: Setup do servidor AWS EC2 (opcional)

Este guia contém os comandos e etapas para configurar um servidor Ubuntu hospedado na AWS (EC2) com acesso via SSH, atualização do sistema e instalação do Node.js.

### :cloud: Pré-requisitos

- Instância EC2 (Ubuntu) já criada
- Chave `.pem` da AWS
- Terminal com suporte a SSH

### :jigsaw: Etapas de configuração

#### 1. Instalar OpenSSH Client (no Windows)

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

#### 2. Verificar instalação do SSH (Windows)

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

#### 3. Corrigir permissões da chave (no terminal Bash)

```bash
chmod 400 "rsa-key-pair.pem"
```

#### 4. Conectar via SSH

```bash
ssh -i "rsa-key-pair.pem" ubuntu@ec2-00-000-00-000.compute-1.amazonaws.com
```

### :arrows_counterclockwise: Atualizar o sistema

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### :gear: Instalar Node.js (v20)

```bash
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
```

#### :white_check_mark: Verificar instalação

```bash
node -v
npm -v
```

---

## :bookmark: Licença

Este projeto está licenciado sob os termos da **Licença MIT**.
