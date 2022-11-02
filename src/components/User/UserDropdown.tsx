import {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext";
import ProfileImage from "./ProfileImage";
import {Box, Group, Menu, Text} from "@mantine/core";
import {
    IconArrowsLeftRight,
    IconLogout,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconSettings,
    IconTrash, IconUser
} from "@tabler/icons";
import {NextLink} from "@mantine/next";

export default function UserDropdown() {
    const {userProfile} = useContext(AuthContext);


    return (
        <Group spacing={5}>
            {userProfile && (
                <>
                    <Menu shadow="md" width={200} trigger={'hover'}>
                        <Menu.Target>
                            <Box>
                                <ProfileImage userProfile={userProfile}/>
                            </Box>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Application</Menu.Label>
                            {/*<Menu.Item icon={<IconSettings size={14}/>}>Settings</Menu.Item>*/}
                            <Menu.Item component={NextLink} href={'/blogger-profile'} icon={<IconUser size={14}/>}>Profile</Menu.Item>
                            <Menu.Item icon={<IconMessageCircle size={14}/>}>Messages</Menu.Item>
                            <Menu.Item icon={<IconPhoto size={14}/>}>Gallery</Menu.Item>
                            <Menu.Item
                                icon={<IconSearch size={14}/>}
                                rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                            >
                                Search
                            </Menu.Item>

                            <Menu.Divider/>

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item icon={<IconArrowsLeftRight size={14}/>}>Transfer my data</Menu.Item>
                            <Menu.Item component={NextLink} href={'/logout'} color="red" icon={<IconLogout size={14}/>}>Sign out</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </>
            )}
        </Group>
    );
}
