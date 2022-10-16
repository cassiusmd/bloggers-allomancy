import {NextPage} from "next";
import {AuthenticationForm} from "../../components/Auth/AuthenticationForm";
import {Center, Stack} from "@mantine/core";

const Signin: NextPage = () => {
    return <Center>
        <Stack mt={'2rem'}><AuthenticationForm/></Stack>
    </Center>;
}

export default Signin;
