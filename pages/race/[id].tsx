import { useRouter } from "next/router";
import {
    Avatar,
    Container,
    Grid,
    SortDescriptor,
    Table,
    useAsyncList,
    useCollator,
    Text,
    Col,
    Row,
    Badge,
    Spacer,
    User,
    Card,
    Modal,
    Button,
} from "@nextui-org/react";
import { useEffect } from "react";
import { HorseRecord, Race, Race_DetailHorse } from "@prisma/client";
import { BsCloudFill } from "react-icons/bs";
import { HorseItem } from "../../components/table/horseItem";
import { HorseResult } from "../../components/table/horseResult";
import { compareAsc, format } from "date-fns";
import React from "react";
import { TableMarkItem } from "../../components/table/mark";

export async function getStaticPaths() {
    const res = await fetch(`http://${process.env.DEPLOY_URL}/api/races`);
    const races = await res.json();
    const paths = races.map((race: Race) => `/race/${race.id}`);
    // console.log(paths);

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const id = params.id;
    const res = await fetch(`http://${process.env.DEPLOY_URL}/api/races/${id}`);
    const racedata = await res.json();

    return { props: { racedata } };
}

const RacePage = ({ racedata }: { racedata: Race }) => {
    const collator = useCollator({ numeric: true });
    async function load({ signal }) {
        return {
            items: racedata.Race_DetailHorse,
        };
    }
    async function sort({
        items,
        sortDescriptor,
    }: {
        items: Race_DetailHorse[];
        sortDescriptor: SortDescriptor;
    }) {
        const l = items.sort((a, b) => {
            let first = a[sortDescriptor.column];
            let second = b[sortDescriptor.column];
            let cmp = collator.compare(first, second);
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

    const _date = racedata.startDate;

    return (
        <Container
            css={{
                padding: "$5",
            }}
        >
            <Grid.Container alignItems="center">
                <Grid>
                    <Row align="center">
                        <Text
                            h1
                            css={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {racedata.name}
                        </Text>
                        <Container
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                        >
                            <Badge size={"xl"}>{racedata.groundKind}</Badge>
                            <Badge size={"xl"}>{racedata.distance}m</Badge>
                            <Badge size={"xl"}>左回り</Badge>
                            <Badge size={"xl"}>{racedata.requirement}</Badge>
                        </Container>
                    </Row>
                    <Row
                        css={{
                            alignItems: "flex-end",
                        }}
                    >
                        <Text size={"$2xl"}>
                            {format(
                                new Date(racedata.startDate),
                                "MM月dd日 hh時mm分"
                            )}
                        </Text>
                        <Text
                            css={{
                                m: "$1",
                                ml: "$3",
                            }}
                            size={"$sm"}
                        >
                            発走
                        </Text>

                        <Spacer />
                        <Text size={"x-large"}>{racedata.course}</Text>
                        <Text
                            css={{
                                m: "$1",
                                ml: "$3",
                            }}
                            size={"$sm"}
                        >
                            競馬場
                        </Text>
                        <Spacer />
                        <Text size={"x-large"}>良</Text>
                        <Text
                            css={{
                                m: "$1",
                                ml: "$3",
                            }}
                            size={"$sm"}
                        >
                            馬場
                        </Text>
                        <Spacer />
                        <BsCloudFill size={"2.5em"} />
                    </Row>
                </Grid>
            </Grid.Container>
            <Table
                aria-label="Example static collection table"
                css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
            >
                <Table.Header>
                    <Table.Column key="waku" allowsSorting>
                        枠
                    </Table.Column>
                    <Table.Column key="umaban" allowsSorting>
                        馬番
                    </Table.Column>
                    <Table.Column key="mark" allowsSorting>
                        印
                    </Table.Column>
                    <Table.Column key="horse.name" allowsSorting>
                        馬名
                    </Table.Column>
                    <Table.Column key="horse.gender" allowsSorting>
                        性齢
                    </Table.Column>
                    {/* <Table.Column key="weight" allowsSorting>
                    斤量
                </Table.Column> */}
                    <Table.Column key="jockey.name" allowsSorting>
                        騎手
                    </Table.Column>
                    {/* <Table.Column key="birth_year" allowsSorting>
                    厩舎
                </Table.Column> */}
                    <Table.Column key="weight" allowsSorting>
                        馬体重
                    </Table.Column>
                    <Table.Column key="odds" allowsSorting>
                        オッズ
                    </Table.Column>
                    <Table.Column key="favorite" allowsSorting>
                        人気
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
                                            <HorseItem
                                                horse={item.jockey}
                                                record={
                                                    item.jockey.JockeyRecord[0]
                                                }
                                            ></HorseItem>
                                        </Table.Cell>
                                    );
                                } else if (columnKey == "mark") {
                                    return (
                                        <Table.Cell>
                                            <TableMarkItem
                                                horse={item.horse}
                                                jockey={item.jockey}
                                            />
                                        </Table.Cell>
                                    );
                                }
                                return (
                                    <Table.Cell>{item[columnKey]}</Table.Cell>
                                );
                            }}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default RacePage;
