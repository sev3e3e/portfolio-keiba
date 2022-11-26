// import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Button, Link, Navbar, NextUIProvider, Text } from "@nextui-org/react";
import { SessionContextValue, SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

export const NavBarUserItem = () => {
    const { data: session, status } = useSession();
    if (status === "unauthenticated") {
        return (
            <Button auto flat as={Link} href="/api/auth/signin/google">
                Log in
            </Button>
        );
    } else {
        return (
            <>
                <Text>Logged in as</Text>
                <Text>{session?.user?.name}</Text>
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
