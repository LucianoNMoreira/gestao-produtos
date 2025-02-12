
export async function POST(req: any) {
    const json = await req.body
    
    try {
        const { login, senha } = await req.json()
    // await signIn('credentials', { email, password })
    console.log("auth", login, senha)

        if (login != 'admin' || senha != 'admin') {
            throw 'Ops'
        }

        return Response.json({
            jwt: JSON.stringify({
                userId: '123'
            })
        })
    } catch (error: any) {
        console.log("Erro", error)
    }
}
