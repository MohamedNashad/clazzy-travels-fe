// method 1
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token'); // Get auth token from cookies

    const url = req.nextUrl.clone();

    // Protect the routes by checking if the user is logged in (token exists)
    // if (!token) {
    //     const protectedRoutes = ['/', '/dashboard', '/permissions', '/roles', '/users', '/enquiries']; // Add more protected routes here
    //     const shouldProtectRoute = protectedRoutes.some((route) => url.pathname.startsWith(route));

    //     if (shouldProtectRoute) {
    //         url.pathname = '/auth/login'; // Redirect to login page if not authenticated
    //         return NextResponse.redirect(url);
    //     }
    // }

    return NextResponse.next(); // Allow the request to proceed if authenticated
}

export const config = {
    matcher: ['/', '/dashboard', '/permissions', '/roles', '/users', '/enquiries', '/enquiries/:path*', '/users/:path*'], // dynamic matching
};
