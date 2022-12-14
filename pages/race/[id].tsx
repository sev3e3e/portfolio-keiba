import { useRouter } from "next/router";
import {
    Container,
    Grid,
    SortDescriptor,
    Table,
    useAsyncList,
    useCollator,
    Text,
    Row,
    Badge,
    Spacer,
    Button,
} from "@nextui-org/react";
import {
    Horse,
    HorseRecord,
    Jockey,
    JockeyRecord,
    Race,
    Race_DetailHorse,
    TableMark,
} from "@prisma/client";
import { BsArrowLeft, BsCloudFill } from "react-icons/bs";
import { HorseItem } from "../../components/table/horseItem";
import { format } from "date-fns";
import React from "react";
import { TableMarkItem } from "../../components/table/mark";
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { getRace } from "../../database/queries/race";
import { useMediaQuery } from "react-responsive";
import { JockeyItem } from "../../components/table/jockeyItem";

type RaceExtended = Race & {
    Race_DetailHorse: RaceDetailHorseExtended;
};

type RaceDetailHorseExtended = Race_DetailHorse & {
    horse: HorseExtend;
    jockey: JockeyExtend;
    TableMark: TableMark[];
};

type JockeyExtend = Jockey & {
    JockeyRecord: JockeyRecord[];
};

type HorseExtend = Horse & {
    HorseRecord: HorseRecord[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id: raceId } = context.query;

    if (Array.isArray(raceId) || !raceId) {
        context.res.statusCode = 404;
        return {
            props: {
                error: "OOPS",
            },
        };
    }

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    const userId = session?.user?.id;

    const res_race = await getRace(raceId, userId ? userId : undefined);

    return { props: { res_race } };
};

const RacePage = ({ res_race: racedata }: { res_race: RaceExtended }) => {
    const isMd = useMediaQuery({
        query: "(max-width: 960px)",
    });
    const router = useRouter();
    const collator = useCollator({ numeric: true });
    async function load({ signal }: { signal: any }): Promise<any> {
        return {
            items: racedata.Race_DetailHorse,
        };
    }
    async function sort({
        items,
        sortDescriptor,
    }: {
        items: RaceDetailHorseExtended[];
        sortDescriptor: SortDescriptor;
    }) {
        const l = items.sort((a, b) => {
            let first =
                a[sortDescriptor.column! as keyof RaceDetailHorseExtended];
            let second =
                b[sortDescriptor.column! as keyof RaceDetailHorseExtended];
            let cmp = collator.compare(first.toString(), second.toString());
            if (sortDescriptor.direction === "descending") {
                cmp *= -1;
            }
            return cmp;
        });
        return {
            items: l,
        };
    }
    const list = useAsyncList({ load, sort });

    return (
        <Container
            css={{
                p: "$10",
            }}
        >
            <Button
                icon={<BsArrowLeft />}
                bordered
                auto
                size={"lg"}
                onPress={() => {
                    router.back();
                }}
            >
                ????????????????????????
            </Button>
            <Spacer />
            <Grid.Container justify="flex-start" alignItems="center" gap={0.6}>
                <Grid>
                    <Badge isSquared size={"xl"} color={"primary"}>
                        <Text
                            size={"$2xl"}
                            color="white"
                            css={{
                                mx: "$3",
                            }}
                        >{`${racedata.round}R`}</Text>
                    </Badge>
                </Grid>
                <Grid>
                    <Text
                        h1
                        size={isMd ? "$4xl" : "$5xl"}
                        css={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        {racedata.name}
                    </Text>
                </Grid>
                <Grid>
                    <Badge size={isMd ? "lg" : "xl"}>
                        {racedata.groundKind}
                    </Badge>
                    <Badge size={isMd ? "lg" : "xl"}>
                        {racedata.distance}m
                    </Badge>
                    <Badge size={isMd ? "lg" : "xl"}>?????????</Badge>
                    <Badge size={isMd ? "lg" : "xl"}>
                        {racedata.requirement}
                    </Badge>
                </Grid>
            </Grid.Container>
            <Row align="center">
                <Grid.Container alignItems="center" gap={1}>
                    <Grid>
                        <Row
                            css={{
                                alignItems: "flex-end",
                            }}
                        >
                            <Text size={isMd ? "$xl" : "x-large"}>
                                {format(
                                    new Date(racedata.startDate),
                                    "MM???dd??? hh???mm???"
                                )}
                            </Text>
                            <Text
                                css={{
                                    ml: "$2",
                                    m: "$1",
                                }}
                                size={isMd ? "$xs" : "$sm"}
                            >
                                ??????
                            </Text>
                        </Row>
                    </Grid>
                    <Grid>
                        <Row
                            css={{
                                alignItems: "flex-end",
                            }}
                        >
                            <Text size={isMd ? "$xl" : "x-large"}>???</Text>
                            <Text
                                css={{
                                    ml: "$2",
                                    m: "$1",
                                }}
                                size={isMd ? "$xs" : "$sm"}
                            >
                                ??????
                            </Text>
                        </Row>
                    </Grid>
                    <Grid>
                        <Row
                            css={{
                                alignItems: "flex-end",
                            }}
                        >
                            <Text size={isMd ? "$xl" : "x-large"}>
                                {racedata.course}
                            </Text>
                            <Text
                                css={{
                                    m: "$1",
                                    ml: "$2",
                                }}
                                size={isMd ? "$xs" : "$sm"}
                            >
                                ?????????
                            </Text>
                            <Spacer x={0.4} />
                            <BsCloudFill size={isMd ? "2em" : "2.5em"} />
                        </Row>
                    </Grid>
                </Grid.Container>
            </Row>

            <Table
                aria-label="Example static collection table"
                css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
            >
                <Table.Header>
                    <Table.Column key="waku" allowsSorting>
                        ???
                    </Table.Column>
                    <Table.Column key="umaban" allowsSorting>
                        ??????
                    </Table.Column>
                    <Table.Column key="mark" allowsSorting>
                        ???
                    </Table.Column>
                    <Table.Column key="horse.name" allowsSorting>
                        ??????
                    </Table.Column>
                    <Table.Column key="horse.gender" allowsSorting>
                        ??????
                    </Table.Column>
                    {/* <Table.Column key="weight" allowsSorting>
                    ??????
                </Table.Column> */}
                    <Table.Column key="jockey.name" allowsSorting>
                        ??????
                    </Table.Column>
                    {/* <Table.Column key="birth_year" allowsSorting>
                    ??????
                </Table.Column> */}
                    <Table.Column key="weight" allowsSorting>
                        ?????????
                    </Table.Column>
                    <Table.Column key="odds" allowsSorting>
                        ?????????
                    </Table.Column>
                    <Table.Column key="favorite" allowsSorting>
                        ??????
                    </Table.Column>
                </Table.Header>
                <Table.Body items={list.items} loadingState={list.loadingState}>
                    {(item) => (
                        <Table.Row key={item.horseId + item.jockeyId}>
                            {(columnKey) => {
                                if (columnKey == "horse.name") {
                                    return (
                                        <Table.Cell>
                                            <HorseItem
                                                horse={item.horse}
                                                record={
                                                    item.horse.HorseRecord[0]
                                                }
                                            ></HorseItem>
                                        </Table.Cell>
                                    );
                                } else if (columnKey == "horse.gender") {
                                    return (
                                        <Table.Cell>
                                            {item.horse.gender}
                                        </Table.Cell>
                                    );
                                } else if (columnKey == "jockey.name") {
                                    return (
                                        <Table.Cell>
                                            <JockeyItem
                                                jockey={item.horse}
                                                record={
                                                    item.jockey.JockeyRecord[0]
                                                }
                                            ></JockeyItem>
                                        </Table.Cell>
                                    );
                                } else if (columnKey == "mark") {
                                    return (
                                        <Table.Cell>
                                            <TableMarkItem
                                                race={racedata}
                                                horse={item.horse}
                                                mark={
                                                    item.TableMark &&
                                                    item.TableMark.length > 0
                                                        ? item.TableMark[0].mark
                                                        : "--"
                                                }
                                            />
                                        </Table.Cell>
                                    );
                                }

                                // TODO: Index????????????????????????????????????
                                // suppressImplicitAnyIndexErrors
                                const key = columnKey.toString();
                                return <Table.Cell>{item[key]}</Table.Cell>;
                            }}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default RacePage;
