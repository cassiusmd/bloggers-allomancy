import {Button, Group, Text} from "@mantine/core";
import {ColorSchemeToggle} from "../components/ColorSchemeToggle/ColorSchemeToggle";
import {useContext} from "react";
import {AuthContext} from "../auth/AuthContext";

export default function IndexPage() {
    const {userProfile} = useContext(AuthContext);
    return (
        <Group mt={50} position="center">
            <Button size="xl">Welcome to Mantine!</Button>

            {/*    show user profile bellow */}
            {userProfile && <Text>{JSON.stringify(userProfile, null, 2)}</Text>}
        </Group>
    );
}
