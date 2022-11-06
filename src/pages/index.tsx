import {Box, Card, Stack, Text} from "@mantine/core";
import {useContext} from "react";
import {AuthContext} from "../auth/AuthContext";
import {getUserProfilePicture} from "../services/utils/SlResolver";
import BloggerNextDeadlines from "../components/Views/Deadlines/BloggerNextDeadlines";
import {NextPage} from "next";
import {AuthGuard} from "../auth/AuthGuard";
import BloggerMonthlyRequiredPosts from "../components/Views/Deadlines/BloggerMonthlyRequiredPosts";

const profileImageFetcher = (profileUuid: string) => getUserProfilePicture(profileUuid).then((res) => res)

const usernameParse = (username: string) => {
    // using regex, replace dots with space and capitalize first letter of each word
    return username.replace(/\./g, ' ').replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const IndexPage: NextPage = () => {
    // const {data, error} = useSWR('818714f1-d474-48e3-a9b1-3d7b9b107273', profileImageFetcher)
    const {userProfile} = useContext(AuthContext);
    return (
        <Stack align={'center'}>
            {userProfile && <Text size={'xl'} weight={700} align={'center'}>Welcome, {usernameParse(userProfile?.username)}!</Text>}
            {/*<Button size="xl">Welcome to Mantine!</Button>*/}

            {/*/!*    show user profile bellow *!/*/}
            {/*{userProfile && <pre style={{fontSize: '0.75rem'}}>{JSON.stringify(userProfile, null, 2)}</pre>}*/}
            {/*/!*{data && <Image src={data.url} alt="Profile image" width={200} height={200}/>}*!/*/}
            {/*{userProfile && <ProfileImage userProfile={userProfile}/>}*/}
            <Box mt={20} sx={{width: '100%', maxWidth: '1000px'}}>
                <Text align={'center'}>Your next deadlines</Text>
                <Card mt={10} shadow={'xl'}><BloggerNextDeadlines/></Card>
            </Box>
            <Box mt={20} sx={{width: '100%', maxWidth: '1000px'}}>
                <Text align={'center'}>Required Posts this month</Text>
                <Card mt={10} shadow={'xl'}><BloggerMonthlyRequiredPosts/></Card>
            </Box>
        </Stack>
    );
}

export default AuthGuard(IndexPage);
