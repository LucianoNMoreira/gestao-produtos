# Recuperação de Senha

### Fluxo de Recuperação de Senha

1. **Link para Recuperar Senha (Na Página de Login)**
    - Página para solicitar a recuperação de senha
        - Input para informar o e-mail
        - API para receber a requisição:
            1. Verificar se o e-mail existe.
            2. Gerar código de recuperação (token único) e salvar no banco de dados:
                - Exemplo de código gerado: `Math.random().toString(16)`.
                - Sugiro buscar alguma biblioteca que gere hash.
            3. Enviar e-mail com o link de recuperação:
                - Exemplo de link: `http://localhost:3000/recuperar_senha?token=1as7f87asf124`

2. **Envio de E-mail**
    - **Enviar e-mail?**
        - SDK / API / Bibliotecas
        - Transacionais (permite envio em massa)
            - API REST / SDK - Biblioteca
                ```js
                // Exemplo fictício
                sendgrid.send({
                    to: 'destinatario@gmail.com',
                    subject: 'Recuperação de Senha',
                    body: `
                        <html>
                            <body>
                                <h1>Recupere sua senha</h1>
                                <a href='http://localhost:3000/recuperar_senha?token=1as7f87asf124'>Clique e gere sua senha</a>
                            </body>
                        </html>
                    `
                })
                ```
        - **Não transacionais** (Exemplo: Gmail tem limite de 500 e-mails enviados por dia)

    - **Configuração do Servidor de E-mail (SMTP)**
        - **Servidor de e-mail:**
            - Host: `http://meu_servidor.com`
            - Porta: `258`
            - Token: `asfASF`

---

3. **Usuário Clica no Link**
    - Link: `http://localhost:3000/recuperar_senha?token=1as7f87asf124`
    
4. **Verificar o Token do Link**
    - Se o token existir e for válido, redireciona para a tela (ou componente) para criar uma nova senha:
        - **Campos:**
            - Digite a nova senha
            - Confirme a nova senha
    - Submeter para a API de gerar nova senha.
