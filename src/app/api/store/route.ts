import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@clerk/nextjs/server'; // Import verifyToken from Clerk
import prismadb from '@/lib/prismadb';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');

        // Example options (adjust based on Clerk’s documentation)
        const options = {
            // Ensure you are using valid options here based on Clerk's documentation
            jwtKey: process.env.CLERK_JWT_KEY
        };

        const payload = await verifyToken(token, options);
        const userId = payload.sub; // Ensure payload contains userId as a string

        const { name } = await req.json();

        if (!name) {
            return new NextResponse('Name is required', { status: 400 });
        }

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const store = await prismadb.store.create({ 
            data: { name, userId: userId as string }, // Ensure userId is a string
        });

        return new NextResponse('Store created successfully', { status: 201 });

    } catch (error) {
        console.log('STORES_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
