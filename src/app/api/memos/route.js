import db from "@/libs/prismadb";
import { NextResponse } from "next/server";

import { getSession, getAccessToken, withApiAuthRequired, useUser } from '@auth0/nextjs-auth0';




// ---------------------------
function extractNumber(str) { 
    const parts = str.split('|'); return parts.length > 1 ? parts[1] : null; 
}
// ---------------------------





export async function POST(request) {
    try {
        const { user } = await getSession()

        const body = await request.json();
        const { title,memo } = body;
        if (!title) {
            return new NextResponse('Missing Fields', { status: 400 });
        }
        const newMemos = await db.memos.create({
            data: {
                title: title,
                memo: memo,
                userId: extractNumber(user.sub)
            }
        });
        return NextResponse.json(newMemos);
    } catch (error) {
        return NextResponse.json({message: 'POST error: ',error}, {status: 500});
    }
}




// NOTE: GET allMemos has been moved to .../memos/user/[id]. Now all searchs are based on userId

// export async function GET(request) {
//     try {
//         const allMemos = await db.memos.findMany({
//             // where: {
//             //     userId: "auth0|6579662a3f22557162972a46",
//             // },
//             orderBy: {
//                 createdAt: 'desc',
//             },
//         })
//         return NextResponse.json(allMemos)

//         return NextResponse.json(user)
//     } catch (error) {
//         return NextResponse.json({message: 'GET error: ',error}, {status: 500})
//     }
// }
