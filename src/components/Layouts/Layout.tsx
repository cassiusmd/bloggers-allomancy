import {ReactNode, useContext, useState} from "react";
import {AuthContext} from "../../auth/AuthContext";

import {AppShell, Burger, Button, Footer, Group, Header, MediaQuery, Text, useMantineTheme} from "@mantine/core";
import {NavbarSegmented} from "./NavbarSegmented";
import {ColorSchemeToggle} from "../ColorSchemeToggle/ColorSchemeToggle";
import UserDropdown from "../User/UserDropdown";
import Link from "next/link";
import {IconLogin} from "@tabler/icons";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    const {isAuthenticated, initializing, userProfile} = useContext(AuthContext);
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                // <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                //     <Text>Application navbar</Text>
                // </Navbar>
                isAuthenticated ? <NavbarSegmented opened={opened}/> : <></>
            }
            // aside={
            //     <MediaQuery smallerThan="sm" styles={{display: 'none'}}>
            //         <Aside p="md" hiddenBreakpoint="sm" width={{sm: 200, lg: 300}}>
            //             <Text>Application sidebar</Text>
            //         </Aside>
            //     </MediaQuery>
            // }
            footer={
                <Footer height={60} p="md">
                    Application footer
                </Footer>
            }
            header={
                <Header height={70} p="md">

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'space-between',
                    }}>
                        <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Text>Allomancy Bloggers</Text>
                        <Group>
                            <ColorSchemeToggle/>
                            {isAuthenticated ? <UserDropdown/> : <Link href={'/auth/signin'}><Button leftIcon={<IconLogin size={14}/>}>Sign in</Button></Link>}
                        </Group>
                    </div>

                </Header>
                // <HeaderResponsive links={[{link: '/', label: 'Home'}]}/>
            }
        >
            {children}
        </AppShell>
    );
}
