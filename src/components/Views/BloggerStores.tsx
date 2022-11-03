import {NextPage} from 'next';

import {useFetchPaginatedApi} from '../../services/api/Api';
import * as React from 'react';
import {Store} from '../../models/Store';


import {Box, Card, Group, Loader, Stack, Text} from "@mantine/core";
import Link from "next/link";
import ImgSl from "../Images/ImgSl";
import {AuthGuard} from "../../auth/AuthGuard";


const NoStoresFound = ({storeAmount}: { storeAmount: number }) => {
    if (storeAmount > 0) return <></>;
    return (
        <Stack>
            <Text>You were not added as a blogger in any store.</Text>
            {/*<Text>*/}
            {/*    You can apply for stores in the <b>Browse Stores</b>*/}
            {/*</Text>*/}
        </Stack>
    );
};

const BloggerStores: NextPage = () => {

    const {data, error, mutate, isLoading} = useFetchPaginatedApi<Store>(
        '/blogger/stores',
        1,
        100);

    return (
        <Stack spacing={10} align={'center'}>
            <Text size={'xl'}>Select a store</Text>

            {!isLoading ? (
                <NoStoresFound storeAmount={data!.data.length}/>
            ) : (
                <Loader size={'xl'}/>
            )}
            <Group align={'center'}>
                {!!data?.data.length &&
                    data.data.map((store) => {
                        return (
                            <Box key={store.id}>
                                <Link href={`/stores/${store.id}`}>
                                    <Card sx={{
                                        cursor: 'pointer',
                                        minWidth: 240,
                                        maxWidth: 240,
                                        ":hover": {
                                            filter: 'brightness(1.2)'
                                        }
                                    }}
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
                            </Box>
                        );
                    })}
            </Group>
        </Stack>
    );
};

export default AuthGuard(BloggerStores);
