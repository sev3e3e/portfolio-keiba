import { Race } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { prisma } from "../../../database/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Race>
) {
    const { id } = req.query;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (Array.isArray(id) || !id) {
        res.status(404);
        return;
    }

    if (session) {
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
                        TableMark: {
                            where: {
                                userId: session.user!.id!,
                                raceId: id,
                            },

                            select: {
                                mark: true,
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
    } else {
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
}
