import { Row, Badge } from "@nextui-org/react";
import { HorseRecord } from "@prisma/client";

export const HorseResult = ({ record }: { record: HorseRecord }) => {
    return (
        <>
            <Row>
                <Badge color={"warning"} variant={"flat"}>
                    {record.firstrank}
                </Badge>
                -
                <Badge color={"primary"} variant={"flat"}>
                    {record.secondrank}
                </Badge>
                -
                <Badge color={"error"} variant={"flat"}>
                    {record.secondrank}
                </Badge>
                -
                <Badge color={"default"} variant={"flat"}>
                    {_getAllResult(record)}
                </Badge>
            </Row>
        </>
    );
};

function _getAllResult(record: HorseRecord): number {
    return (
        record.matches -
        (record.firstrank + record.secondrank + record.thirdrank)
    );
}
