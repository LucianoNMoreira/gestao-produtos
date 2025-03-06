import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {jwtVerify} from 'jose';

const publicRoutes = ['/login', '/auth/recuperar_senha', '/auth/nova_senha']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value

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
