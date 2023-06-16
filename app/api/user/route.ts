import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const users = await prisma.users.findMany();

  return NextResponse.json(users);
}
