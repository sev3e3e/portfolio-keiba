import { Race } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Race[]>
) {
    const races = await prisma.race.findMany();
    res.status(200).json(races);
}
