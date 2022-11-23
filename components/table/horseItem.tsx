import {
    Badge,
    Card,
    Col,
    Container,
    Grid,
    Row,
    Spacer,
    Text,
} from "@nextui-org/react";
import { Horse, HorseRecord } from "@prisma/client";

export const HorseItem = ({
    horse,
    record,
}: {
    horse: Horse;
    record: HorseRecord;
}) => {
    return (
        <>
            <Text size={"$xl"}>{horse.name}</Text>
            <Text color={"$gray700"} size={"$sm"}>
                {record.firstrank}-{record.secondrank}-{record.secondrank}-
                {_getAllResult(record)}
            </Text>
        </>
    );
};

function _getAllResult(record: HorseRecord): number {
    return (
        record.matches -
        (record.firstrank + record.secondrank + record.thirdrank)
    );
}
