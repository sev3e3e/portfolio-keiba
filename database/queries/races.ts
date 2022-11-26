import { prisma } from "../db";

export const getRaces = async () => {
    const races = await prisma.race.findMany();
    return races;
};
