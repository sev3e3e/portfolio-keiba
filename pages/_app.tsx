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
    if (status != "authenticated" || !session) {
        return (
            <Button auto flat as={Link} href="/api/auth/signin/google">
                Sign in
            </Button>
        );
    } else {
        return (
            <Button
                color={"error"}
                auto
                shadow
                onPress={() => {
                    signOut();
                }}
            >
                Sign out
            </Button>
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
                <Navbar
                    variant="sticky"
                    isBordered={true}
                    maxWidth={"fluid"}
                    css={{
                        zIndex: 999,
                    }}
                >
                    <Navbar.Brand>
                        <Text size={"$2xl"}>Portfolio-netkeiba</Text>
                    </Navbar.Brand>
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
