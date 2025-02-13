import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from "jwt-decode"
import { cookies } from 'next/headers'

const protectedRoutes = ['/']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session: any = cookie ? jwtDecode(cookie) : undefined

    console.log('session', session)

    if (isProtectedRoute && !session?.user?.id) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

// Middleware não deve interferir nas rotas abaixo
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
