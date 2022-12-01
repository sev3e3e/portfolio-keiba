import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";

import { prisma } from "../../../database/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (req.method != "GET") {
        res.status(400).json({
            message: "Only GET is allowed for this endpoint.",
        });
        return;
    }

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const userId = session.user?.id;

    if (!userId) {
        res.status(400).json({ message: "Session object could not be read." });
        return;
    }

    const raceId = req.query.raceId;

    if (Array.isArray(raceId) || !raceId) {
        res.status(400).json({ message: "raceId is invalid." });
        return;
    }

    if (req.method === "GET") {
        const mark = await prisma.tableMark.findMany({
            where: {
                raceId: raceId,
                userId: userId,
            },
            select: {
                mark: true,
            },
        });

        res.status(200).json(mark);
        return;
    }
}
