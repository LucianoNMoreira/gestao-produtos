
import jwt from 'jsonwebtoken'

export async function POST(req: any) {
    try {
        const { login, senha } = await req.json()

        if (login != 'admin' || senha != 'admin') {
            throw 'Ops'
        }

        return Response.json({
            token: jwt.sign(
                            {
                                user: {
                                    id: '123'
                                }
                            }, 
                            'chave_secreta',
                            { expiresIn: '1h' }
                        )
        })
    } catch (error: any) {
        console.log("Erro", error)
    }
}
