'use client';

import dynamic from 'next/dynamic';

const SignUpForm = dynamic(() => import('./SignUp'), { ssr: false });

export default function LoginPage() {
    return <SignUpForm />;
}
