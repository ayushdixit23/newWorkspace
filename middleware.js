import { NextResponse } from 'next/server'

export function middleware(request) {
	let token = request.cookies.get('excktn')?.value || "";
	const path = request.nextUrl.pathname;

	if (!token && path !== '/login') {
		return NextResponse.redirect(new URL('/login', request.nextUrl));
	}

	if (token && path === '/login') {
		return NextResponse.redirect(new URL('/main/dashboard', request.nextUrl));
	}
}

export const config = {
	matcher: ['/prosite/:path*', '/login', '/main/:path*', '/settings/:path*']
}