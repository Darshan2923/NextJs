'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/lib/types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loader from '@/components/global/Loader';
import { actionLoginUser } from '@/lib/serverActions/auth-actions';

const LoginPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState('');

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
        formData
    ) => {
        // Attempt to login the user using provided data
        // Reset the form if there's an error
        // Set the error message
        const { error } = await actionLoginUser(formData);
        if (error) {
            form.reset();
            setSubmitError(error.message);
        }
        // Redirect to the dashboard upon successful login
        router.replace('/dashboard');
    };


    return (
        <Form {...form}>
            <form onChange={() => {
                if (submitError) {
                    setSubmitError('')
                }
            }}
                onSubmit={form.handleSubmit(onSubmit)} className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'>
                <Link href="/" className='w-full flex justify-start items-center'>
                    <Image src='/thinkboardlogo.svg' alt='thinkboard-logo' width={50} height={50} />
                    <span className='font-semibold dark:text-white text-2xl'>thinkboard.</span>
                </Link>
                <FormDescription className="text-foreground/60">
                    An all-In-One Collaboration and Productivity Platform
                </FormDescription>
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button
                    type="submit"
                    className="w-full p-6"
                    size="lg"
                    disabled={isLoading}
                >
                    {!isLoading ? 'Login' : <Loader />}
                </Button>
                <span className="self-center">
                    Dont have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-primary"
                    >
                        Sign Up
                    </Link>
                </span>
                {/* <Separator></Separator>
        <Button
          type="button"
          className="w-full relative"
          size="lg"
          variant="outline"
          icon={Google}
          logoStyles=""
        >
          Login with Google
        </Button> */}
            </form>

        </Form>
    )
}

export default LoginPage