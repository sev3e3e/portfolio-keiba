import { Race } from ".prisma/client";
import { prisma } from "../db";

export const getRaces = async (
    raceId: string,
    userId?: string
): Promise<Race> => {
    if (userId) {
        const races = await prisma.race.findUnique({
            where: {
                id: raceId,
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
                                userId: userId,
                                raceId: raceId,
                            },

                            select: {
                                mark: true,
                            },
                        },
                    },
                },
            },
        });
        return JSON.parse(JSON.stringify(races));
    } else {
        const races = await prisma.race.findUnique({
            where: {
                id: raceId,
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
        return JSON.parse(JSON.stringify(races));
    }
};
