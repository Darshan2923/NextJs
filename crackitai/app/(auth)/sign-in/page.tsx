'use client';

import dynamic from 'next/dynamic';

const SignInForm = dynamic(() => import('./SignIn'), { ssr: false });

export default function LoginPage() {
    return <SignInForm />;
}
