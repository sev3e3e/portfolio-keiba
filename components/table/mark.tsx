import { Button, Grid, Modal, Popover, Row, Text } from "@nextui-org/react";
import { Horse, Jockey } from "@prisma/client";
import React from "react";

export const TableMarkItem = ({
    horse,
    jockey,
}: {
    horse: Horse;
    jockey: Jockey;
}) => {
    const [mark, setMark] = React.useState("--");
    return (
        <>
            <Popover placement="right">
                <Popover.Trigger>
                    <Button auto flat>
                        {mark}
                    </Button>
                </Popover.Trigger>
                <Popover.Content>
                    <Row>
                        <Button
                            auto
                            onClick={() => {
                                setMark("◎");
                            }}
                        >
                            ◎
                        </Button>
                        <Button
                            auto
                            onClick={() => {
                                setMark("○");
                            }}
                        >
                            ○
                        </Button>
                        <Button
                            auto
                            onClick={() => {
                                setMark("▲");
                            }}
                        >
                            ▲
                        </Button>
                        <Button
                            auto
                            onClick={() => {
                                setMark("△");
                            }}
                        >
                            △
                        </Button>
                        <Button
                            auto
                            onClick={() => {
                                setMark("☆");
                            }}
                        >
                            ☆
                        </Button>
                        <Button
                            auto
                            onClick={() => {
                                setMark("✓");
                            }}
                        >
                            ✓
                        </Button>
                        <Button
                            auto
                            onClick={() => {
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
