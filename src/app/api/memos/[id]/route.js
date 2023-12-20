import db from "@/libs/prismadb";
import { NextResponse } from "next/server";



export async function GET(request, {params}) {
    try {
        const { id } = params;
        const aMemos = await db.memos.findUnique({
            where: {
                id
            }
        })
        if(!aMemos) {
            return NextResponse.json({message: "the Memo not found"}, {status: 404})
        }
        return NextResponse.json(aMemos)
    } catch (error) {
        return NextResponse.json({message: 'GET error: ',error}, {status: 500})
    }
}



export async function PATCH(request, {params}) {
    try {
        const body = await request.json()
        const { title,memo } = body
        const { id } = params
        const updateMemos = await db.memos.update({
            where: {
                id
            },
            data: {
                title: title,
                memo: memo
            }
        })
        if(!updateMemos) {
            return NextResponse.json({message: "the Memo not found"}, {status: 404})
        }
        return NextResponse.json(updateMemos)
    } catch (error) { 
        return NextResponse.json({message: 'UPDATE error: ',error}, {status: 500})
    }
}



export async function DELETE(request, {params}) {
    try {
        const { id } = params;
        const thatMemos = await db.memos.findUnique({
            where: {
                id
            }
        })
        if (!thatMemos) {
            return NextResponse.json({message: "the Memo not found", error}, {status: 404});
        } else {
            await db.memos.delete({ 
                where: {
                    id
                }
            })
            return NextResponse.json({message: "DELETED"});
        }
    } catch (error) {
        return NextResponse.json({message: "DELETE error", error}, {status: 500});
    }
}