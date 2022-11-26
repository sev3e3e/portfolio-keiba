// import "../styles/globals.css";
import type { AppProps } from "next/app";

import {
    Button,
    Link,
    Navbar,
    NextUIProvider,
    Text,
    Spacer,
    Tooltip,
    Checkbox,
    Container,
    Avatar,
    Col,
    Row,
} from "@nextui-org/react";
import { SessionContextValue, SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";

export const NavBarUserItem = () => {
    const { data: session, status } = useSession();
    const [isSelectedShowUser, SetIsSelectedShowUser] = useState(false);
    if (status === "unauthenticated") {
        return (
            <Button auto flat as={Link} href="/api/auth/signin/google">
                Sign in
            </Button>
        );
    } else {
        return (
            <>
                <Text>Logged in as</Text>
                <Spacer x={0.3} />
                <Tooltip
                    content={
                        <>
                            <Container>
                                <Checkbox
                                    isSelected={isSelectedShowUser}
                                    onChange={(isSelected) => {
                                        SetIsSelectedShowUser(isSelected);
                                    }}
                                >
                                    User名を表示する
                                </Checkbox>
                            </Container>
                        </>
                    }
                    placement={"bottom"}
                >
                    {isSelectedShowUser ? (
                        <Row align="center">
                            <Container gap={0.2}>
                                <Avatar src={session!.user!.image!}></Avatar>
                            </Container>

                            <Col>
                                <Text>{session?.user?.name}</Text>
                                <Text size={"small"} color={"$gray800"}>
                                    {session?.user?.id}
                                </Text>
                            </Col>
                        </Row>
                    ) : (
                        "*********"
                    )}
                </Tooltip>

                <Spacer x={0.45} />
                <Button
                    color={"error"}
                    auto
                    shadow
                    onClick={() => {
                        signOut();
                    }}
                >
                    Sign out
                </Button>
            </>
        );
    }
};

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={session}>
            <NextUIProvider>
                <Navbar isBordered variant="sticky">
                    <Navbar.Brand>Portfolio-netkeiba</Navbar.Brand>
                    <Navbar.Content>
                        <Navbar.Item>
                            <NavBarUserItem />
                        </Navbar.Item>
                    </Navbar.Content>
                </Navbar>
                <Component {...pageProps} />
            </NextUIProvider>
        </SessionProvider>
    );
}
