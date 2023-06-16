import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { temperature, email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 });
  }

  console.log("🔥🔥🔥 -> temperature", temperature);

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    await prisma.temperature.create({
      data: {
        temperature,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return NextResponse.json({ message: "记录成功" });
  } else {
    return NextResponse.json({ message: "email is not found" }, { status: 400 });
  }
}

export async function GET(req: Request, res: Response) {
  const temperatures = await prisma.temperature.findMany();

  return NextResponse.json(temperatures);
}
