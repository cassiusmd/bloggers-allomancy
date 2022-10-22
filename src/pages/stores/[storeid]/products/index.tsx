import {NextPage} from 'next';

import {useRouter} from 'next/router';
import {AuthGuard} from '../../../../auth/AuthGuard';
import {ApiGetPaginated, GetErrorsString, useFetchPaginatedApi} from '../../../../services/api/Api';
import {ChangeEvent, useEffect, useState} from 'react';
import {BlogProductListing} from '../../../../models/BlogProductListing';
import useDebounce from '../../../../hooks/useDebounce';
import {ErrorToast} from "../../../../services/utils/Toasts";
import {Badge, Box, Group, Loader, Pagination, Stack, Text} from "@mantine/core";
import SearchInput from "../../../../components/Utils/SearchInput";
import CardWithImage from "../../../../components/Cards/CardWithImage";


const Products: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;
    // const [products, setProducts] = useState<BlogProductListing[]>([]);

    const pageSize = 10;
    const [page, setPage] = useState(1);
    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    // const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce<string>(search, 500);

    // function fetchProducts(): void {
    //     // console.log(page);
    //     ApiGetPaginated<BlogProductListing>(
    //         `blogger/stores/${storeid}/products`,
    //         page,
    //         pageSize,
    //         search
    //     ).then(
    //         (res) => {
    //             // console.log(res);
    //             setProducts(res.data);
    //             setTotalPages(res.totalPages);
    //         },
    //         (reason) => ErrorToast(GetErrorsString(reason))
    //     );
    // }
    const {data, mutate, isLoading} = useFetchPaginatedApi<BlogProductListing>(
        `blogger/stores/${storeid}/products`,
        page,
        pageSize,
        debouncedValue
    );
    const totalPages = data?.totalPages ?? 0;
    const products = data?.data ?? [];

    // useEffect(() => {
    //     if (debouncedValue && page !== 1) {
    //         setPage(1);
    //     } else fetchProducts();
    // }, [debouncedValue]);
    //
    // useEffect(() => {
    //     fetchProducts();
    // }, [page]);
    return (
        <Stack spacing={5} align={'center'}>
            <Text size={'lg'}>Available products</Text>
            <SearchInput onChange={setSearch}/>

            {isLoading && (<Loader/>)}

            <Pagination mt={10} page={page} total={totalPages}/>

            <Group mt={10} align={'center'}>
                {products.map((product) => {
                    return (
                        <Box key={product.id}>
                            {/*if product.created is in a week or less, add 'new' badge*/}

                            <CardWithImage description={product.name} imageUuid={product.image}
                                           badge={(Date.now() - new Date(product.created ?? Date.now()).getTime() < 14 * 24 * 3600 * 1000)
                                               && (<Badge color="red">new</Badge>)} onClick={() => null}
                                           sx={(theme) => ({
                                               cursor: 'pointer',
                                               // show border only if selected, and according to theme
                                               minWidth: 200,
                                               maxWidth: 200,

                                           })}
                            />
                        </Box>
                    );
                })}
            </Group>
        </Stack>
    );
};

export default AuthGuard(Products);
