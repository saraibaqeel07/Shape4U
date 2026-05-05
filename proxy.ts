import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup'];

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token')?.value;
    const onboardingCookie = req.cookies.get('needsOnboarding')?.value;
    // treat missing cookie OR 'true' as needing onboarding; only 'false' means done
    const needsOnboarding = onboardingCookie !== 'false';

    const isProtected = protectedRoutes.some((r) => pathname === r || pathname.startsWith(r + '/'));
    const isAuthRoute = authRoutes.includes(pathname);
    const isPrescreen = pathname === '/prescreen';

    if (isProtected) {
        if (!token) return NextResponse.redirect(new URL('/login', req.url));
        if (needsOnboarding) return NextResponse.redirect(new URL('/prescreen', req.url));
    }

    if (token && !needsOnboarding) {
        if (isAuthRoute) return NextResponse.redirect(new URL('/dashboard', req.url));
        if (isPrescreen) return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (token && needsOnboarding && isAuthRoute) {
        return NextResponse.redirect(new URL('/prescreen', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
