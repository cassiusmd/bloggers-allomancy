import useSWR from 'swr'
import {Button, Group, Image} from "@mantine/core";
import {useContext, useState} from "react";
import {AuthContext} from "../auth/AuthContext";
import {getUserProfilePicture} from "../services/utils/SlResolver";

const profileImageFetcher = (profileUuid: string) => getUserProfilePicture(profileUuid).then((res) => res)



export default function IndexPage() {
    const {data, error} = useSWR('818714f1-d474-48e3-a9b1-3d7b9b107273', profileImageFetcher)
    const {userProfile} = useContext(AuthContext);
    return (
        <Group mt={50} position="center">
            <Button size="xl">Welcome to Mantine!</Button>

            {/*    show user profile bellow */}
            {userProfile && <pre style={{fontSize: '0.75rem'}}>{JSON.stringify(userProfile, null, 2)}</pre>}
            {data && <Image src={data.url} alt="Profile image" width={200} height={200}/>}
        </Group>
    );
}
