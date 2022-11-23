import { Horse } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Horse[]>
) {
    const horses = await prisma.horse.findMany();
    res.status(200).json(horses);
}
