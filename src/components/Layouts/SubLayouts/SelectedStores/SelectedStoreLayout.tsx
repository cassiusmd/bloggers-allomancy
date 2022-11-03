import {ReactNode} from "react";
import {Box, Button, Group, Stack, Tooltip} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import {useFetchApi} from "../../../../services/api/Api";
import {Store} from "../../../../models/Store";
import ImgSl from "../../../Images/ImgSl";

interface LayoutProps {
    children: ReactNode;
}

export default function SelectedStoreLayout({children}: LayoutProps) {
    const router = useRouter();
    const {storeid} = router.query;
    const {data} = useFetchApi<Store>(storeid ? `blogstores/${storeid}` : null);
    const store = data?.data;
    return (
        <Stack>
            {storeid && <Group>
                <Link href={`/stores/${storeid.toString()}`}>
                <Box><Button color={'gray'} variant={'outline'}>Store dashboard</Button></Box>
            </Link>
                {store && <Stack sx={{flex: 1}} align={'flex-end'}>
                    <Tooltip label={store.name} position={'bottom'}>
                        <span>
                            <ImgSl uuid={data?.data.logo} width={'100px'} height={'75px'} radius={'lg'}/>
                        </span>
                    </Tooltip>
                </Stack>}
            </Group>}
            {children}
        </Stack>
    )
}
