import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from "jwt-decode"
import { cookies } from 'next/headers'

const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session: any = cookie ? jwtDecode(cookie) : undefined

    console.log('session', session)

    if (!isPublicRoute && !session?.user?.id) {
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
