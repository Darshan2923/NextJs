'use client';

import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('./SignUp'), { ssr: false });

export default function SignUpPage() {
    return <SignUp />;
}
