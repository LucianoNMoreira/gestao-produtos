Recuperar senha:
    - link pra recuperar senha (na página de login)
        - página para solicitar recuperação de senha
            - input para informar o e-mail
            - api para receber a requisição
                1. Verificar se e-mail existe
                2. Gerar código de recuperação (token único) e salvar no bd
                    Exemplo: Math.random().toString(16)
                3. Enviar e-mail com o link de recuperação
                    - link: http://localhost:3000/recuperar_senha?token=1as7f87asf124
                    * Enviar e-mail?
                        - SDK / API / bibliotecas (nodemailer)
                        - Transacionais (permite envio em massa)
                            API REST / SDK - Biblioteca
                                sendgrid.send({
                                    to: 'destinatario@gmail.com',
                                    subject: 'Assunto do email',
                                    body: '''
                                        <html>
                                            <body>
                                                <h1>Recupere sua senha</h1>
                                                <a href='http://localhost:3000/recuperar_senha?token=1as7f87asf124'>Clique e gere sua senha</a>
                                            </body>
                                        </html>
                                    '''
                                })
                        - Não transacionais (Gmail tem limite 500 emails enviados por dia)
                    
                    SMTP: Servidor de e-mail
                    host: http://meu_servidor.com
                    porta: 258
                    TOken: asfASF

    ...

    - Usuário clica no link (http://localhost:3000/recuperar_senha?token=1as7f87asf124)
    - Verificar o token do link
        Se existir, redireciona para a tela (ou componente) para criar nova senha
            - Digite a nova senha
            - Confirme a nova senha
        Submete para API de gerar senha
