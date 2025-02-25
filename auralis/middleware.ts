import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    if (!isPublicRoute(req) && !userId) {
        // Redirect unauthenticated users to the sign-in page
        const signInUrl = new URL('/sign-in', req.url);
        return NextResponse.redirect(signInUrl);
    }

    // Continue with the request if authenticated or on a public route
    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
