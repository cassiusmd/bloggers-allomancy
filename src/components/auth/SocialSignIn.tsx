import {Button, Stack} from "@mantine/core";
import {signInWithGoogle} from "../../auth/FirebaseAuth";
import {IconBrandGoogle} from "@tabler/icons";

export default function SocialSignIn() {
    return (
        <Stack>
            {/*<Button*/}
            {/*    fullWidth*/}
            {/*    sx={{mt: 3, mb: 2}}*/}
            {/*    style={{backgroundColor: '#d52626'}}*/}
            {/*    onClick={signInWithGoogle}*/}
            {/*>*/}
            {/*    Sign in with Google*/}
            {/*</Button>*/}
            <Button color={'red'} onClick={signInWithGoogle}><IconBrandGoogle style={{marginRight: '0.5rem'}}/> Google
                sign in</Button>
        </Stack>
    );
}
