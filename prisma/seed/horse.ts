import { PrismaClient } from "@prisma/client";
import { getRandomInt } from "../../lib/util";
const prisma = new PrismaClient();

// 36 * 15必要
export const horse = async () => {
    await prisma.horse.createMany({
        data: Array(36 * 15)
            .fill(0)
            .map((v, i) => ({
                id: "testid" + (i + 1).toString(),
                birth: new Date(Date.now()),
                name: "テスト馬" + (i + 1).toString(),
                gender: "牝",
            })),
    });
};

export const horseRecord = async () => {
    await prisma.horseRecord.createMany({
        data: Array(36 * 15)
            .fill(0)
            .map((v, i) => ({
                horseId: "testid" + (i + 1).toString(),
                year: 2022,
                firstrank: getRandomInt(0, 100),
                secondrank: getRandomInt(0, 100),
                thirdrank: getRandomInt(0, 100),
                matches: getRandomInt(1, 222),
            })),
    });
};
