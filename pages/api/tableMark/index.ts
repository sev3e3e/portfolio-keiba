import { Race, TableMark } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../database/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const {
        query: { horseId, raceId, userId },
    } = req;

    // console.log(horseId);
    // console.log(raceId);
    // console.log(userId);

    const mark = await prisma.tableMark.findUnique({
        where: {
            raceId_horseId_userId: {
                horseId: horseId,
                raceId: raceId,
                userId: userId,
            },
        },
        // select: {
        //     mark: true,
        // },
    });

    if (mark) {
        res.status(200).json(mark.mark);
    } else {
        res.status(200).json("--");
    }
}
