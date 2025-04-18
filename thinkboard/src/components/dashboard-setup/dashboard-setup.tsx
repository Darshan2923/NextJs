'use client'
import { AuthUser } from '@supabase/supabase-js';
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import EmojiPicker from '../global/emoji-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Subscription, workspace } from '@/lib/supabase/supabase.types';
import { CreateWorkspaceFormSchema } from '@/lib/types';
import { z } from 'zod';
import { v4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '../ui/button';
import Loader from '../global/Loader';
import { useRouter } from 'next/navigation';
import { createWorkspace } from '@/lib/supabase/queries';
import { useAppState } from '@/lib/providers/state-provider';

// Define props for the DashboardSetup component
interface DashboardSetupProps {
    user: AuthUser;
    subscription: Subscription | null;
}

export const DashboardSetup: React.FC<DashboardSetupProps> = ({
    subscription,
    user
}) => {

    const router = useRouter();

    const [selectedEmoji, setSelectedEmoji] = useState('💼');

    const supabase = createClientComponentClient();
    const { dispatch } = useAppState();

    // Initialize the useForm hook for form handling
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting: isLoading, errors },
    } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
        mode: 'onChange',
        defaultValues: {
            logo: '',
            workspaceName: '',
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof CreateWorkspaceFormSchema>> = async (value) => {
        const file = value.logo?.[0];
        let filePath = null;
        const workspaceUUID = v4();

        // Check if a file (logo) is provided and handle its upload
        if (file) {
            try {
                const fileUUID = v4();
                const { data, error } = await supabase.storage
                    .from('workspace-logos')
                    .upload(`workspaceLogo.${workspaceUUID}.${fileUUID}`, file, {
                        cacheControl: '3600',
                        upsert: true,
                    });
                if (error) throw new Error('');
                filePath = data.path;
            } catch (storageError) {
                console.log(storageError);
            }
        }
        try {
            const newWorkspace: workspace = {
                data: '',
                createdAt: new Date().toISOString(),
                iconId: selectedEmoji,
                id: workspaceUUID,
                inTrash: '',
                title: value.workspaceName,
                workspaceOwner: user.id,
                logo: filePath || null,
                bannerUrl: '',
            };

            await createWorkspace(newWorkspace);

            // Dispatch the new workspace to the application state but add folders to it because this is how we will maintain the folders state
            dispatch({
                type: 'ADD_WORKSPACE',
                payload: { ...newWorkspace, folders: [] },
            });


            router.replace(`/dashboard/${newWorkspace.id}`);
        } catch (error) {
            console.log(error);

        } finally {
            reset();
        }
    }

    return (
        <Card className="w-[800px] h-screen sm:h-auto">
            <CardHeader>
                <CardTitle>Create A Workspace</CardTitle>
                <CardDescription>
                    Lets create a private workspace to get you started.You can add
                    collaborators later from the workspace settings tab.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center  gap-4">
                            <div className="text-5xl">
                                <EmojiPicker
                                    getValue={(emoji) => {
                                        setSelectedEmoji(emoji);
                                    }}
                                >
                                    {selectedEmoji}
                                </EmojiPicker>
                            </div>
                            <div className="w-full">
                                <Label
                                    htmlFor="workspaceName"
                                    className="text-sm text-muted-foreground"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="workspaceName"
                                    type="text"
                                    placeholder="Workspace Name"
                                    disabled={isLoading}
                                    {...register('workspaceName', {
                                        required: 'Workspace name is required',
                                    })}
                                />
                                <small className="text-red-600">
                                    {errors?.workspaceName?.message?.toString()}
                                </small>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="workspaceLogo"
                                className="text-sm text-muted-foreground "
                            >
                                Workspace Logo
                            </label>

                            <Input
                                disabled={isLoading || subscription?.status !== 'active'}
                                id="logo"
                                type="file"
                                accept="image/*"
                                placeholder="Workspace Logo"
                                {...register('logo', { required: false })}
                            />
                            <small className="text-red-600">
                                {errors?.logo?.message?.toString()}
                            </small>
                            {subscription?.status !== 'active' && (
                                <small className="text-muted-foreground">
                                    To customize your workspace, you need to be on a Pro Plan
                                </small>
                            )}
                        </div>

                        <div className="self-end">
                            <Button
                                disabled={isLoading}
                                type="submit"
                            >
                                {!isLoading ? 'Create Workspace' : <Loader />}
                            </Button>
                        </div>
                    </div>
                </form>

            </CardContent>
        </Card>
    )
}

export default DashboardSetup;