import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

async function checkToken(token) {
	try {
		const decodedToken = jwt.decode(token, { complete: true });
		if (decodedToken && decodedToken.header && decodedToken.payload) {
			const issuedAt = decodedToken.payload.iat;
			const currentTimestamp = Math.floor(Date.now() / 1000);
			const isValidIat = issuedAt <= currentTimestamp;
			const expiration = decodedToken.payload.exp;
			const isValidExp = currentTimestamp <= expiration;

			if (isValidIat && isValidExp) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
	}
}

export async function middleware(request) {
	let token = request.cookies.get('excktn')?.value || "";

	const path = request.nextUrl.pathname;

	if (!token && path !== '/login') {
		return NextResponse.redirect(new URL('/login', request.nextUrl));
	}
	const validToken = await checkToken(token);
	if (validToken && path === "/login") {
		return NextResponse.redirect(new URL('/main/dashboard', request.nextUrl));
	}
	if (!validToken && path !== "/login") {
		request.cookies.delete('excktn')
		return NextResponse.redirect(new URL('/login', request.nextUrl));
	}
}

export const config = {
	matcher: ['/prosite/:path*', '/login', '/main/:path*', '/settings/:path*', '/']
};
