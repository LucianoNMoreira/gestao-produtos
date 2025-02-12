import { NextRequest, NextResponse } from 'next/server'
// import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    //   const session = await decrypt(cookie)
    const session = cookie ? JSON.parse(cookie) : undefined

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

// Middleware não deve interferir nas rotas abaixo
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
