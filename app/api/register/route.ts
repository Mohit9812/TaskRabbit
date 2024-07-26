import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

interface User {
    username: string;
    email: string;
    password: string;
}

const users: User[] = [];

export async function POST(request: Request){
    const {username, email, password}: User = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({username, email, password : hashedPassword});
    return NextResponse.json({message: 'User registered successfully'});
}