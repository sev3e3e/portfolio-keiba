import { Button, Popover, Row } from "@nextui-org/react";
import { Horse, Race } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import { useState } from "react";

export const TableMarkItem = ({
    race,
    horse,
    mark,
}: {
    race: Race;
    horse: Horse;
    mark: string;
}) => {
    const { data: session, status } = useSession();
    const [_mark, setMark] = useState(mark ? mark : "--");

    return (
        <>
            <Popover
                placement="right"
                onClose={() => {
                    _popover_onclose_handler(session, race, horse, _mark);
                }}
            >
                <Popover.Trigger>
                    <Button auto flat>
                        {_mark}
                    </Button>
                </Popover.Trigger>
                <Popover.Content>
                    <Row>
                        <Button
                            auto
                            onPress={() => {
                                setMark("◎");
                            }}
                        >
                            ◎
                        </Button>
                        <Button
                            auto
                            onPress={() => {
                                setMark("○");
                            }}
                        >
                            ○
                        </Button>
                        <Button
                            auto
                            onPress={() => {
                                setMark("▲");
                            }}
                        >
                            ▲
                        </Button>
                        <Button
                            auto
                            onPress={() => {
                                setMark("△");
                            }}
                        >
                            △
                        </Button>
                        <Button
                            auto
                            onPress={() => {
                                setMark("☆");
                            }}
                        >
                            ☆
                        </Button>
                        <Button
                            auto
                            onPress={() => {
                                setMark("✓");
                            }}
                        >
                            ✓
                        </Button>
                        <Button
                            auto
                            onPress={() => {
                                setMark("--");
                            }}
                        >
                            消
                        </Button>
                    </Row>
                </Popover.Content>
            </Popover>
        </>
    );
};

async function _popover_onclose_handler(
    session: Session | null,
    race: Race,
    horse: Horse,
    mark: string
) {
    if (session != null) {
        await fetch("/api/races/mark", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                session: session,
                horse: horse,
                race: race,
                mark: mark,
            }),
        });
    } else {
        // TODO: browser保存
        console.log("you are not logged in. no mark is saved.");
    }
}
