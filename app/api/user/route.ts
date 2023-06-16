import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const users = await prisma.users.findMany();

  return NextResponse.json(users);
}

export async function POST(req: Request, res: Response) {
  const { email, name, image } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 });
  }

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json({ message: "email is already exists" }, { status: 400 });
  } else {
    await prisma.users.create({
      data: {
        email,
        name,
        image,
      },
    });
    return NextResponse.json({ message: "注册成功" });
  }
}
