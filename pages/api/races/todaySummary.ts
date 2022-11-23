import { Race } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        {
            name: string;
            groundKind: string;
            horseCount: number;
            distance: number;
            startDate: Date;
            id: string;
        }[]
    >
) {
    const races = await prisma.race.findMany({
        select: {
            name: true,
            groundKind: true,
            horseCount: true,
            distance: true,
            startDate: true,
            id: true,
        },
    });
    res.status(200).json(races);
}
