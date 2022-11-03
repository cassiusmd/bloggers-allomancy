import useSWR from 'swr'
import {Button, Group, Stack} from "@mantine/core";
import {useContext} from "react";
import {AuthContext} from "../auth/AuthContext";
import {getUserProfilePicture} from "../services/utils/SlResolver";
import ProfileImage from "../components/User/ProfileImage";
import BloggerNextDeadlines from "../components/Views/BloggerNextDeadlines";

const profileImageFetcher = (profileUuid: string) => getUserProfilePicture(profileUuid).then((res) => res)


export default function IndexPage() {
    // const {data, error} = useSWR('818714f1-d474-48e3-a9b1-3d7b9b107273', profileImageFetcher)
    // const {userProfile} = useContext(AuthContext);
    return (
        <Stack>
            {/*<Button size="xl">Welcome to Mantine!</Button>*/}

            {/*/!*    show user profile bellow *!/*/}
            {/*{userProfile && <pre style={{fontSize: '0.75rem'}}>{JSON.stringify(userProfile, null, 2)}</pre>}*/}
            {/*/!*{data && <Image src={data.url} alt="Profile image" width={200} height={200}/>}*!/*/}
            {/*{userProfile && <ProfileImage userProfile={userProfile}/>}*/}
            <BloggerNextDeadlines/>
        </Stack>
    );
}
