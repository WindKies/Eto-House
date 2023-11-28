import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
){
    const body = await request.json();
    const currentUser = await getCurrentUser();
    


  if (!body.name || !body.email || !body.image) {
    return NextResponse.error();
  }


    const updateProfile = await prisma.user.update({
      where: {
        id: currentUser?.id
      },
      data: {
        name: body.name,
        email: body.email,
        image: body.image

      }
    });

    return NextResponse.json(updateProfile);
}