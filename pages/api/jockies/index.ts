import { Jockey } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Jockey[]>
) {
    const jockies = await prisma.jockey.findMany();
    res.status(200).json(jockies);
}
