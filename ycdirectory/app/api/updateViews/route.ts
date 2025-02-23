import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write-client';

export async function POST(req: Request) {
    try {
        const { id, views } = await req.json();
        await writeClient.patch(id).set({ views: views + 1 }).commit();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
    }
}
