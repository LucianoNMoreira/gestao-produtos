/* eslint-disable @typescript-eslint/no-explicit-any */
import { enviarEmail } from '@/app/lib/email'
import Usuario from '@/db/models/usuario'

const gerarToken = async () : Promise<string> => {
    let token = Math.random().toString(16)

    while(await Usuario.findOne({ token_nova_senha: token })) {
        token = Math.random().toString(16)
    }

    return token
}

export async function POST(req: any) {
    try {
        const { email } = await req.json()

        const user = await Usuario.findOne({ email: email })

        if (!user) {
            throw 'Usuário não encontrado'
        }

        const token = await gerarToken()
        user.token_nova_senha = token
        user.save()

        const link = `http://localhost:3000/auth/nova_senha?token=${token}`

        // Enviar e-mail
        await enviarEmail(
            "luciano@senac.com.br",
            "Recuperar senha",
            `Pediu uma nova senha? Precisa acessar essa página: ${link}`,
            `
                <h1>Pediu nova senha?</h1>
                <a href='${link}'>Clica aqui</a>
            `
        )

        return Response.json({
            mensagem: "O usuário receberá um e-mail com as instruções de login"
        })
    } catch (error: any) {
        console.log("Erro", error)
        return Response.json({
                error: error
            },
            { status: 400 }
        )
    }
}
