import { NextRequest, NextResponse } from 'next/server'
// import jsonwebtoken from 'jsonwebtoken'
// import { jwtDecode } from "jwt-decode"
import { cookies } from 'next/headers'
import {jwtVerify} from 'jose';

const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value

    // Não funciona em ambientes de execução de fronteira
    // const payload = jsonwebtoken.verify(cookie!, process.env.JWT_SECRET!);

    // Não valida a assinatura do token, apenas decodifica
    // const payload: any = cookie ? jwtDecode(cookie) : undefined

    // Valida a assinatura do token e decodifica
    const payload: any = cookie ? (await jwtVerify(cookie, new TextEncoder().encode(process.env.JWT_SECRET))).payload : undefined

    // console.log('payload', payload)

    if (!isPublicRoute && !payload?.user?.id) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/produtos',
        '/produtos/:id',
        '/produtos/:id/editar',
        // Middleware não deve interferir nas rotas abaixo
        '/((?!api|_next/static|_next/image|.*\\.png$).*)'
    ],
}
