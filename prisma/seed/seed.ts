import { PrismaClient } from "@prisma/client";
import { horse, horseRecord } from "./horse";
import { jockey, jockeyRecord } from "./jockey";
import { race, race_DetailHorse } from "./race";

const prisma = new PrismaClient();

async function main() {
    await prisma.horse.deleteMany();
    await prisma.jockey.deleteMany();
    await prisma.race.deleteMany();
    await prisma.horseRecord.deleteMany();
    await prisma.jockeyRecord.deleteMany();
    await prisma.race_DetailHorse.deleteMany();
    await horse();
    await horseRecord();
    await jockey();
    await jockeyRecord();
    await race();
    await race_DetailHorse();
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
