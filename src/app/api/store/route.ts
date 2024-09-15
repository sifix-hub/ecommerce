import { NextResponse } from "next/server";
import {useAuth} from '@clerk/nextjs';

import prismadb from "@/lib/prismadb";


export async function POST(req: Request, res: Response){

    try {
        const { userId } = useAuth();
        const {name} = await req.json();

        
        if(!name) new NextResponse("Name is required", { status:400});
        if(!userId) {new NextResponse("Unauthorized", { status:401})
        }else {
            const store = await prismadb.store.create({ 
                data: { name, userId },
            });
        };
        

    } catch (error) {
        console.log('STORES_POST', error);
        return new NextResponse("Internal Error", {status: 500});
    }
}