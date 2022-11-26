import { prisma } from "../db";

export const getMarks = async (raceId: string, userId: string) => {
    const marks = await prisma.tableMark.findMany({
        where: {
            raceId: raceId,
            userId: userId,
        },
        select: {
            mark: true,
        },
    });

    return marks;
};
