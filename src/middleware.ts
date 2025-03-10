/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose';

const publicRoutes = ['/login', '/auth/recuperar_senha', '/auth/nova_senha']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    // Valida a assinatura do token e decodifica
    try {
        const cookie = (await cookies()).get('session')?.value
        console.log('cookie', cookie)
        // const payload: any = cookie ? (await jwtVerify(cookie, new TextEncoder().encode(process.env.JWT_SECRET))).payload : undefined
        const payload : any = cookie ? await jwtVerify(cookie, new TextEncoder().encode(process.env.JWT_SECRET)).then(res => res.payload).catch(() => undefined) : undefined

        if (!isPublicRoute && !payload?.user?.id) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
    } catch (e: any) {
        console.error("Erro ao validar jwt no middleware:", e)
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
