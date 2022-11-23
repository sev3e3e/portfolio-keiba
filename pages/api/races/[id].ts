import { Race } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Race>
) {
    const { id } = req.query;

    if (Array.isArray(id) || !id) {
        res.status(404);
        return;
    }

    const races = await prisma.race.findUnique({
        where: {
            id: id,
        },
        include: {
            Race_DetailHorse: {
                include: {
                    horse: {
                        include: {
                            HorseRecord: true,
                        },
                    },
                    jockey: {
                        include: {
                            JockeyRecord: true,
                        },
                    },
                },
            },
        },
    });

    if (!races) {
        res.status(404);
        return;
    }

    res.status(200).json(races);
}
