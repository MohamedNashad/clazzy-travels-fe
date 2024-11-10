import { MiddlewareRequest, NextRequest } from "@netlify/next";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const isNetlify = process.env.IS_NETLIFY_ENV === "true";
    const token = req.cookies.get("auth_token");

    const url = req.nextUrl.clone();
    const protectedRoutes = [
        "/dashboard",
        "/permissions",
        "/roles",
        "/users",
        "/enquiries",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
        url.pathname.startsWith(route)
    );

    // Redirect if accessing protected routes without a valid token
    if (isProtectedRoute && !token) {
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    // For Netlify production, use MiddlewareRequest
    if (isNetlify) {
        const request = new MiddlewareRequest(req);
        return request.next();
    }

    // For local development, use NextResponse
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/permissions", "/roles", "/users", "/enquiries"],
};
