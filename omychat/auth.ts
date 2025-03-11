import { FirestoreAdapter } from "@auth/firebase-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { adminDb } from "./firebase-admin"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    adapter: FirestoreAdapter(adminDb),
}
)