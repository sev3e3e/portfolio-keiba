import {
    Avatar,
    Button,
    Card,
    Link,
    Text,
    css,
    Grid,
    Container,
    Row,
    Col,
    Spacer,
} from "@nextui-org/react";
import { Race } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { BsCloudFill } from "react-icons/bs";
import styles from "../styles/Home.module.css";
import { compareAsc, format } from "date-fns";
import { getRaces } from "../database/queries/races";

export async function getServerSideProps() {
    const data = await getRaces();
    const racedata = JSON.parse(JSON.stringify(data));

    return { props: { racedata } };
}

export default function Home({ racedata }: { racedata: Race[] }) {
    // 手動で...
    const tokyoRaces = racedata.filter((item) => {
        return item.course == "東京";
    });

    const oosakaRaces = racedata.filter((item) => {
        return item.course == "大阪";
    });

    const tyukyoRaces = racedata.filter((item) => {
        return item.course == "中京";
    });

    return (
        <Container md>
            <Head>
                <title>Portfolio-netkeiba</title>
                <meta
                    name="description"
                    content="portfolio with nextjs/typescript"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Grid.Container gap={1} justify={"center"}>
                    <Grid>
                        <Text h1 size={"$5xl"}>
                            reinventing
                        </Text>
                    </Grid>
                    <Grid>
                        <Text h1 size={"$5xl"}>
                            netkeiba
                        </Text>
                    </Grid>
                </Grid.Container>

                <Text size={"$xl"}>
                    これは個人の趣味で開発され、ポートフォリオのために公開されています。
                </Text>
                <Spacer y={0.5} />

                <Grid.Container gap={1.5}>
                    <Grid sm={4}>
                        <RaceContainer course="東京">
                            <Grid.Container alignItems="stretch">
                                {tokyoRaces
                                    .map((race) => (
                                        <Container
                                            css={{
                                                mb: "$2",
                                                mt: "$2",
                                                w: "100%",
                                            }}
                                            key={`${race.name}`}
                                        >
                                            <RaceButton
                                                round={race.round}
                                                name={race.name}
                                                groundKind={race.groundKind}
                                                numberEntry={race.horseCount}
                                                raceLength={race.distance}
                                                startTime={race.startDate}
                                                id={race.id}
                                            />
                                        </Container>
                                    ))
                                    .sort((a, b) => {
                                        return a
                                            .key!.toString()
                                            .localeCompare(
                                                b.key!.toString(),
                                                undefined,
                                                {
                                                    numeric: true,
                                                    sensitivity: "base",
                                                }
                                            );
                                    })}
                            </Grid.Container>
                        </RaceContainer>
                    </Grid>
                    <Grid sm={4}>
                        <RaceContainer course="大阪">
                            <Grid.Container alignItems="stretch">
                                {oosakaRaces
                                    .map((race) => (
                                        <Container
                                            css={{
                                                mb: "$2",
                                                mt: "$2",
                                                w: "100%",
                                            }}
                                            key={`${race.name}`}
                                        >
                                            <RaceButton
                                                round={race.round}
                                                name={race.name}
                                                groundKind={race.groundKind}
                                                numberEntry={race.horseCount}
                                                raceLength={race.distance}
                                                startTime={race.startDate}
                                                id={race.id}
                                            />
                                        </Container>
                                    ))
                                    .sort((a, b) => {
                                        return a
                                            .key!.toString()
                                            .localeCompare(
                                                b.key!.toString(),
                                                undefined,
                                                {
                                                    numeric: true,
                                                    sensitivity: "base",
                                                }
                                            );
                                    })}
                            </Grid.Container>
                        </RaceContainer>
                    </Grid>
                    <Grid sm={4}>
                        <RaceContainer course="中京">
                            <Grid.Container alignItems="stretch">
                                {tyukyoRaces
                                    .map((race) => (
                                        <Container
                                            css={{
                                                mb: "$2",
                                                mt: "$2",
                                                w: "100%",
                                            }}
                                            key={`${race.name}`}
                                        >
                                            <RaceButton
                                                round={race.round}
                                                name={race.name}
                                                groundKind={race.groundKind}
                                                numberEntry={race.horseCount}
                                                raceLength={race.distance}
                                                startTime={race.startDate}
                                                id={race.id}
                                            />
                                        </Container>
                                    ))
                                    .sort((a, b) => {
                                        return a
                                            .key!.toString()
                                            .localeCompare(
                                                b.key!.toString(),
                                                undefined,
                                                {
                                                    numeric: true,
                                                    sensitivity: "base",
                                                }
                                            );
                                    })}
                            </Grid.Container>
                        </RaceContainer>
                    </Grid>
                </Grid.Container>
            </main>
        </Container>
    );
}

const RaceContainer = ({
    children,
    course,
}: {
    children: JSX.Element;
    course: string;
}) => {
    return (
        <Card>
            <Card.Header
                css={{
                    justifyContent: "center",
                }}
            >
                <Col>
                    <Row
                        css={{
                            alignItems: "flex-end",
                            justifyContent: "center",
                        }}
                    >
                        <Text size={"small"}>5回</Text>
                        <Spacer x={0.3} />
                        <Text size={"$xl"}>{course}</Text>
                        <Spacer x={0.3} />
                        <Text size={"small"}>6日目</Text>
                    </Row>
                    <Row
                        css={{
                            alignItems: "flex-end",
                            justifyContent: "center",
                        }}
                    >
                        <Text size={"$sm"}>天候:</Text>
                        <Spacer x={0.3} />
                        <BsCloudFill size={"2.1em"} />
                        <Spacer x={0.5} />
                        <Text size={"$sm"}>芝:</Text>
                        <Spacer x={0.3} />
                        <Text size={"$xl"}>良</Text>
                        <Spacer x={0.5} />
                        <Text size={"$sm"}>ダ:</Text>
                        <Spacer x={0.3} />
                        <Text size={"$xl"}>良</Text>
                    </Row>
                </Col>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Grid.Container>{children}</Grid.Container>
            </Card.Body>
        </Card>
    );
};

export const RaceButton = ({
    round,
    name,
    startTime,
    groundKind,
    raceLength,
    numberEntry,
    id,
}: {
    round: number;
    name: string;
    startTime: Date;
    groundKind: string;
    raceLength: number;
    numberEntry: number;
    id: string;
}) => {
    const d: Date = new Date(startTime);
    return (
        <Link
            css={{
                maxW: 1000,
                minW: 222,
            }}
            href={`/race/${id}`}
        >
            <Card>
                <Grid.Container alignItems="center" gap={0.6}>
                    <Grid>
                        <Avatar
                            squared
                            text={round + "R"}
                            color="primary"
                            textColor={"white"}
                            size={"lg"}
                        />
                    </Grid>
                    <Grid
                        css={{
                            flexGrow: 3,
                        }}
                    >
                        <Container gap={0.2}>
                            <Text size={"$lg"}>{name}</Text>
                            <Text
                                color="#697177"
                                size={"$xs"}
                                css={{
                                    textAlign: "right",
                                }}
                            >
                                {format(d, "hh時mm分")} {groundKind}
                                {raceLength + "m"} {numberEntry + "頭"}
                            </Text>
                        </Container>
                    </Grid>
                </Grid.Container>
            </Card>
        </Link>
    );
};
