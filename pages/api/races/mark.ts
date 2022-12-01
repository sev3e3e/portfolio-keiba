import { Horse, Race, TableMark } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";

import { prisma } from "../../../database/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!(req.method === "GET" || req.method === "POST")) {
        res.status(400);
        return;
    }

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const race: Race = req.body.race;
    const horse: Horse = req.body.horse;
    const mark: string = req.body.mark;

    if (req.method === "GET") {
        const mark = await prisma.tableMark.findUnique({
            where: {
                raceId_horseId_userId: {
                    horseId: horse.id,
                    raceId: race.id,
                    userId: session.user!.id!,
                },
            },
            select: {
                mark: true,
            },
        });

        res.status(200).json(mark);
        return;
    }

    if (req.method === "POST") {
        const upsert = await prisma.tableMark.upsert({
            where: {
                raceId_horseId_userId: {
                    horseId: horse.id,
                    raceId: race.id,
                    userId: session.user!.id!,
                },
            },
            update: {
                mark: mark,
            },
            create: {
                userId: session.user!.id!,
                horseId: horse.id,
                raceId: race.id,
                mark: mark,
            },
        });
        res.status(200).json(upsert);
        return;
    }
}
