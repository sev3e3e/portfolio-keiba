import { getRandomInt } from "../../lib/util";
import { format, addMinutes } from "date-fns";

import { prisma } from "../../database/db";

export const race = async () => {
    const firstDate = new Date(2022, 11, 26, 0, 0);
    const courses = ["東京", "大阪", "中京"];
    const data = courses.flatMap((course, i) =>
        Array(12)
            .fill(0)
            .map((_, ii) => ({
                id: "testid" + (ii + 1 + i * 12).toString(),
                name: "テストレース" + (ii + 1 + i * 12).toString(),
                startDate: addMinutes(firstDate, 30 * ii),
                groundKind: "芝",
                distance: 1400,
                weather: "曇",
                baba: "良",
                course: course,
                round: ii + 1,
                requirement: "2歳 未勝利",
                horseCount: 15,
                winPrize: 444,
                secondPrize: 333,
                thirdPrize: 332,
                fourthPrize: 241,
                fifthPrize: 111,
            }))
    );

    await prisma.race.createMany({
        data: data,
    });
};

const waku_calculator = (waku: number): number => {
    // 汚いけどダミーデータなので。8枠15頭固定。
    if (waku == 15 || waku == 14) {
        return 8;
    } else if (waku == 13 || waku == 12) {
        return 7;
    } else if (waku == 11 || waku == 10) {
        return 6;
    } else if (waku == 9 || waku == 8) {
        return 5;
    } else if (waku == 7 || waku == 6) {
        return 4;
    } else if (waku == 5 || waku == 4) {
        return 3;
    } else if (waku == 3 || waku == 2) {
        return 2;
    } else {
        return 1;
    }
};

export const race_DetailHorse = async () => {
    // 中央競馬12レース * 3
    // 一つのレースに15頭

    for (let i = 0; i < 3; i++) {
        for (let ii = 1; ii <= 12; ii++) {
            const data = Array(15)
                .fill(0)
                .map((_, iii) => {
                    return {
                        raceId: `testid${ii + 12 * i}`,

                        horseId: `testid${iii + 1 + 12 * i}`,
                        jockeyId: `testid${iii + 1 + 12 * i}`,
                        waku: waku_calculator(iii + 1), // weired but
                        umaban: iii + 1, // weired too
                        weight: getRandomInt(400, 500),
                        odds: getRandomInt(2, 5) * (iii + 1),
                        favorite: iii + 1, // ummm
                    };
                });

            await prisma.race_DetailHorse.createMany({ data });
        }
    }
    // await prisma.race_DetailHorse.createMany({
    //     data: Array(12 * 3)
    //         .fill(0)
    //         .map((_, i) => ({
    //             raceId: `testid${i + 1}`,

    //             horseId: `testid${i + 1}`,
    //             jockeyId: `testid${i + 1}`,
    //             waku: getRandomInt(1, 14), // weired but
    //             umaban: getRandomInt(1, 14), // weired too
    //             weight: getRandomInt(400, 500),
    //             odds: getRandomInt(1, 180),
    //             favorite: getRandomInt(1, 14), // ummm
    //         })),
    //     skipDuplicates: true,
    // });
};
