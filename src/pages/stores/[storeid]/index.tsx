import {NextPage} from "next";
import {useRouter} from "next/router";
import {
    IconBook,
    IconCirclePlus,
    IconDotsCircleHorizontal,
    IconMessage,
    IconShoppingCart,
    IconTicket,
    TablerIcon
} from "@tabler/icons";
import {Card, Grid, Stack, Text} from "@mantine/core";
import Link from "next/link";
import {useFetchApi} from "../../../services/api/Api";
import {Store} from "../../../models/Store";
import ImgSl from "../../../components/Images/ImgSl";

interface StoreNavigation {
    route: string;
    name: string;
    icon: TablerIcon;
}

const storeNavigation: StoreNavigation[] = [
    {
        route: 'products',
        name: 'Products',
        icon: IconShoppingCart
    },
    {
        route: 'coupons',
        name: 'Coupons',
        icon: IconTicket
    },
    {
        route: 'messages',
        name: 'Messages',
        icon: IconMessage
    },
    {
        route: 'newpost',
        name: 'New Post',
        icon: IconCirclePlus
    },
    {
        route: 'posts',
        name: 'Posts',
        icon: IconBook
    },
    {
        route: 'more',
        name: 'More',
        icon: IconDotsCircleHorizontal
    }
];

const StoreView: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;

    const storeData = useFetchApi<Store>(storeid ? `blogstores/${storeid}` : null);
    const store = storeData.data?.data;
    // useEffect(() => {
    //     if (storeid) {
    //         router.push(`/stores/${storeid}/messages`);
    //     }
    // }, [storeid]);

    return (
        <Stack align={'center'}>

            {store && (
                <>
                    <Text>{store?.name}</Text>
                    <ImgSl height={'120px'} width={'160px'} uuid={store?.logo}/>
                </>
            )}

            <Grid gutter={'md'} justify={'center'}>
                {storeNavigation.map((nav) => {
                        return (
                            <Grid.Col lg={4} sm={6} key={nav.route}>
                                <Link href={`/stores/${storeid}/${nav.route}`}>
                                    <Card
                                          withBorder
                                          shadow={'md'}
                                          sx={{
                                              cursor: "pointer",
                                              ":hover": {
                                                  filter: 'brightness(1.2)'
                                              }
                                          }}>
                                        <Stack align={'center'}>
                                            <nav.icon/>
                                            <Text>{nav.name}</Text>
                                        </Stack>
                                    </Card>
                                </Link>
                            </Grid.Col>
                        )
                    }
                )}
            </Grid>

        </Stack>
    )
}

export default StoreView;
