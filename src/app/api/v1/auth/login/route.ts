/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import Usuario from '@/db/models/usuario'
import bcrypt from 'bcrypt'

export async function POST(req: any) {
    try {
        const { login, senha } = await req.json()


        const user = await Usuario.findOne({ login: login })

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            throw 'Credenciais inválidas'
        }

        return Response.json({
            token: jwt.sign(
                            {
                                user: {
                                    id: user._id,
                                    login: user.login
                                }
                            }, 
                            process.env.JWT_SECRET!,
                            { expiresIn: '1h' }
                        )
        })
    } catch (error: any) {
        console.log("Erro", error)
        return Response.json({
                error: error
            },
            { status: 401 }
        )
    }
}
