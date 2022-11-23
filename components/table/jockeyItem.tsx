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
import { Jockey, JockeyRecord } from "@prisma/client";

export const HorseItem = ({
    jockey,
    record,
}: {
    jockey: Jockey;
    record: JockeyRecord;
}) => {
    return (
        <>
            <Text size={"$xl"}>{jockey.name}</Text>
            <Text color={"$gray700"} size={"$sm"}>
                {record.firstrank}-{record.secondrank}-{record.secondrank}-
                {_getAllResult(record)}
            </Text>
        </>
    );
};

function _getAllResult(record: JockeyRecord): number {
    return (
        record.matches -
        (record.firstrank + record.secondrank + record.thirdrank)
    );
}
