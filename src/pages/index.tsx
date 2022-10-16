import {Button, Group} from "@mantine/core";
import {useContext} from "react";
import {AuthContext} from "../auth/AuthContext";

export default function IndexPage() {
    const {userProfile} = useContext(AuthContext);
    return (
        <Group mt={50} position="center">
            <Button size="xl">Welcome to Mantine!</Button>

            {/*    show user profile bellow */}
            {userProfile && <pre style={{fontSize:'0.75rem'}}>{JSON.stringify(userProfile, null, 2)}</pre>}
        </Group>
    );
}
