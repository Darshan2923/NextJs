'use server'

import { and, eq } from "drizzle-orm";
import { files, workspaces } from "../../../migrations/schema";
import db from "./db"
import { File, Subscription, workspace } from "./supabase.types";
import { revalidatePath } from "next/cache";
import { validate } from "uuid";

export const getUserSubscriptionStatus = async (userId: string) => {
    try {
        const data = await db.query.subscriptions.findFirst({
            where: (s, { eq }) => eq(s.userId, userId),
        });
        if (data) return { data: data as Subscription, error: null };
        else return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: `Error: ${error}` };

    }
};

export const createWorkspace = async (workspace: workspace) => {
    try {
        const response = await db.insert(workspaces).values(workspace);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export const updateWorkspace = async (
    updatedWorkspace: Partial<workspace>,
    workspaceId: string
) => {
    if (!workspaceId) return;
    await db
        .update(workspaces)
        .set(updatedWorkspace)
        .where(eq(workspaces.id, workspaceId));
    revalidatePath(`/dashboard/${workspaceId}`);
};

export const getFiles = async (folderId: string) => {
    const isValid = validate(folderId);
    if (!isValid) {
        return { data: null, error: 'Error' };
    }

    try {
        const results =
            ((await db
                .select()
                .from(files)
                .orderBy(files.createdAt)
                .where(and(eq(files.folderId, folderId)))) as File[]) || [];
        return { data: results, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
};
