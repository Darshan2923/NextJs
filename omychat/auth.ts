import { FirestoreAdapter } from "@auth/firebase-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { adminAuth, adminDb } from "./firebase-admin"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                if (token.sub) {
                    session.user.id = token.sub;

                    const firebaseToken = await adminAuth.createCustomToken(token.sub);
                    session.firebaseToken = firebaseToken;
                }
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: 'jwt',
    },
    adapter: FirestoreAdapter(adminDb),
}
)