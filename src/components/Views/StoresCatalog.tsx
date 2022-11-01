import {NextPage} from 'next';
import {useFetchPaginatedApi} from '../../services/api/Api';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Store} from '../../models/Store';
import {Box, Card, Group, Loader, Pagination, Stack, Text} from "@mantine/core";
import Link from "next/link";
import ImgSl from "../Images/ImgSl";
import {AuthGuard} from "../../auth/AuthGuard";
import useDebounce from "../../hooks/useDebounce";
import SearchInput from "../Utils/SearchInput";


const NoStoresFound = ({storeAmount}: { storeAmount: number }) => {
    if (storeAmount > 0) return <></>;
    return (
        <Stack>
            <Text>Stores could not be loaded, please try refreshing your browser</Text>
        </Stack>
    );
};

interface ViewStoresProps {
    page: number;
    pageSize: number;
    search?: string;
    totalPagesCallback: (totalPages: number) => void;
}

function ViewStores({page, pageSize, search, totalPagesCallback}: ViewStoresProps) {

    const {data, error, mutate, isLoading} = useFetchPaginatedApi<Store>(
        '/blogstores',
        page,
        pageSize,
        search);
    const totalPages = data?.totalPages ?? 0;
    const products = data?.data ?? [];

    useEffect(() => {
        totalPagesCallback(totalPages);
    }, [totalPages]);

    return (
        <Stack spacing={10} align={'center'}>
            <Text size={'xl'}>Select a store</Text>

            {isLoading && (<Loader size={'xl'}/>)}
            <Group align={'center'}>
                {!!data?.data.length &&
                    data.data.map((store) => {
                        return (
                            <Box key={store.id}>
                                <Link href={`/stores/view/${store.id}`}>
                                    <Card sx={{
                                        cursor: 'pointer',
                                        minWidth: 240,
                                        maxWidth: 240,
                                        ":hover": {
                                            filter: 'brightness(1.2)'
                                        }
                                    }}
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
}

const StoresCatalog: NextPage = () => {

    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 21;
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce<string>(search, 500);

    useEffect(() => {
        setPage(1);
    }, [debouncedValue]);
    return (
        <Stack spacing={5} align={'center'}>
            <Text size={'lg'}>Available stores</Text>
            <SearchInput onChange={setSearch}/>
            <Pagination mt={10} page={page} onChange={setPage} total={totalPages}/>

            <ViewStores page={page} pageSize={pageSize}
                        totalPagesCallback={setTotalPages}
                        search={debouncedValue}/>
            <div style={{display: 'none'}}>
                <ViewStores page={page + 1} pageSize={pageSize}
                            totalPagesCallback={() => null}
                            search={debouncedValue}/>
            </div>


        </Stack>
    );
};

export default AuthGuard(StoresCatalog);
