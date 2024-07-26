import { NextRequest, NextResponse } from "next/server";
import { upload, runMiddleware } from "@/lib/multer";
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
    const nextReq = req as any;
    const res: any = new NextResponse();
    await runMiddleware(nextReq, res, upload.single('file'));
    const file = (nextReq as any).file;
    console.log(file)
    if (!file){
        return NextResponse.json({message: 'No file uploaded'}, {status: 400});
    }
    const filePath = path.join('/uploads', file.filename);
    return NextResponse.json({nessage: 'File uploaded successfully', path: filePath});

}

export const config = {
    api: {
        bodyParser: false,
    }
}

