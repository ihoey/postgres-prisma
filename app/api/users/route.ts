import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const users = await prisma.users.findMany();

  res.status(200).json(users);
}
