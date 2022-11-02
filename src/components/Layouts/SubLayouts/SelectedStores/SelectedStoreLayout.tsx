import {ReactNode} from "react";
import {Box, Button, Stack} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";

interface LayoutProps {
    children: ReactNode;
}

export default function SelectedStoreLayout({children}: LayoutProps) {
    const router = useRouter();
    const {storeid} = router.query;
    return (
        <Stack>
            {storeid && <Link href={`/stores/${storeid.toString()}`}>
                <Box><Button color={'gray'} variant={'outline'}>Back</Button></Box>
            </Link>}
            {children}
        </Stack>
    )
}
