import db from "@/libs/prismadb";
import { NextResponse } from "next/server";

import { getSession, getAccessToken, withApiAuthRequired, useUser } from '@auth0/nextjs-auth0';






export async function GET(request, {params}) {
    try {
        const { id } = params;

        const allMemos = await db.memos.findMany({
            where: {
                userId: id
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(allMemos)
    } catch (error) {
        return NextResponse.json({message: 'GET error: ',error}, {status: 500})
    }
}
