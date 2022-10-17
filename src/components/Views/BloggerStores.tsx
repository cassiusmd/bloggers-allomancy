import {NextPage} from 'next';

import {ApiGetPaginated} from '../../services/api/Api';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Store} from '../../models/Store';


import {Card, Grid, Loader, Stack, Text} from "@mantine/core";
import Link from "next/link";
import ImgSl from "../Images/ImgSl";
import {AuthGuard} from "../../auth/AuthGuard";


const NoStoresFound = ({storeAmount}: { storeAmount: number }) => {
    if (storeAmount > 0) return <></>;
    return (
        <Stack>
            <Text>You were not added as a blogger in any store.</Text>
            <Text>
                You can apply for stores in the <b>Browse Stores</b> tab above
            </Text>
        </Stack>
    );
};

const BloggerStores: NextPage = () => {
    // const { store: selectedStore } = useSelector<State, SelectedStore>(
    //     (state) => state.selectedStore
    // );

    const [loading, setLoading] = useState<boolean>(true);
    const [stores, setStores] = useState<Store[]>([]);
    useEffect(() => {
        setLoading(true);
        ApiGetPaginated<Store>('/blogger/stores', 1, 100)
            .then((res) => {
                // console.log(res);
                setStores(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                // console.log('error: ' + err);
            });
    }, []);

    return (
        <Stack spacing={10} align={'center'}>
            <Text size={'xl'}>Select a store</Text>

            {!loading ? (
                <NoStoresFound storeAmount={stores.length}/>
            ) : (
                <Loader size={'xl'}/>
            )}
            <Grid justify={'center'}>
                {!!stores.length &&
                    stores.map((store) => {
                        return (
                            <Grid.Col key={store.id}>
                                <Link href={`/stores/${store.id}`}><Card
                                    // sx={{
                                    //     minWidth: 240,
                                    //     maxWidth: 240,
                                    //     height: '100%',
                                    //     border: store.id === selectedStore?.id ? '2px solid' : null,
                                    //     borderColor: `${theme.palette.primary.main} !important`,
                                    // }}
                                >
                                    <Card.Section>

                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            <ImgSl
                                                uuid={store.logo}
                                                height={'180px'}
                                                width={'100%'}
                                            />
                                        </div>

                                        <Card.Section>
                                            <Text
                                                size={'sm'}
                                                component={'div'}
                                                align={'center'}
                                            >
                                                {store.name}
                                            </Text>
                                        </Card.Section>
                                    </Card.Section>
                                </Card></Link>
                            </Grid.Col>
                        );
                    })}
            </Grid>
        </Stack>
    );
};

export default AuthGuard(BloggerStores);
