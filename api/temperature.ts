import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { videoId, cursor } = req.query;
  // if (!videoId) {
  //   res.status(400).json({ message: "videoId is required" });
  // }

  const users = await prisma.users.findMany();

  res.status(200).json(users);
}
