import { PrismaClient } from "@prisma/client";
import { getRandomInt } from "../../lib/util";
const prisma = new PrismaClient();

export const jockey = async () => {
    await prisma.jockey.createMany({
        data: Array(36 * 15)
            .fill(0)
            .map((v, i) => ({
                id: "testid" + (i + 1).toString(),
                birth: new Date(Date.now()),
                name: "テスト騎手" + (i + 1).toString(),
            })),
    });
};

export const jockeyRecord = async () => {
    await prisma.jockeyRecord.createMany({
        data: Array(36 * 15)
            .fill(0)
            .map((v, i) => ({
                jockeyId: "testid" + (i + 1).toString(),
                year: 2022,
                firstrank: getRandomInt(0, 100),
                secondrank: getRandomInt(0, 100),
                thirdrank: getRandomInt(0, 100),
                matches: getRandomInt(100, 1000),
                jushoMatch: getRandomInt(0, 100),
                jushoWin: getRandomInt(0, 100),
            })),
    });
};
