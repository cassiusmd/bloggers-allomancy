import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {AuthGuard} from '../../../../auth/AuthGuard';
import {useFetchPaginatedApi} from '../../../../services/api/Api';
import {useEffect, useState} from 'react';
import {BlogProductListing} from '../../../../models/BlogProductListing';
import useDebounce from '../../../../hooks/useDebounce';
import {Box, Group, Loader, Pagination, Stack, Text} from "@mantine/core";
import SearchInput from "../../../../components/Utils/SearchInput";
import ProductRequestDialog from "../../../../components/Dialogs/ProductRequestDialog";
import SelectedStoreLayout from "../../../../components/Layouts/SubLayouts/SelectedStores/SelectedStoreLayout";

interface ViewProductsProps {
    storeId: string;
    page: number;
    pageSize: number;
    search?: string;
    totalPagesCallback: (totalPages: number) => void;
}

function ViewProducts({storeId, page, pageSize, search, totalPagesCallback}: ViewProductsProps) {

    const {data, mutate, isLoading} = useFetchPaginatedApi<BlogProductListing>(
        `blogger/stores/${storeId}/products`,
        page,
        pageSize,
        search
    );
    const totalPages = data?.totalPages ?? 0;
    const products = data?.data ?? [];

    useEffect(() => {
        totalPagesCallback(totalPages);
    }, [totalPages]);

    return (
        <>
            <Group mt={10} align={'center'}>
                {isLoading && (<Loader/>)}
                {products.map((product) => {
                    return (
                        <Box key={product.id}>
                            <ProductRequestDialog product={product}/>
                        </Box>
                    );
                })}
            </Group>
        </>
    );
}

const Products: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;
    // const [products, setProducts] = useState<BlogProductListing[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 21;
    const [page, setPage] = useState(1);
    // const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    //     setPage(value);
    // };
    // const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce<string>(search, 500);

    // set page back to 1 on search change
    useEffect(() => {
        setPage(1);
    }, [debouncedValue]);
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
        <SelectedStoreLayout>
            <Stack spacing={5} align={'center'}>
                <Text size={'lg'}>Available products</Text>
                <SearchInput onChange={setSearch}/>
                <Pagination mt={10} page={page} onChange={setPage} total={totalPages}/>
                {storeid && (<>
                    <ViewProducts storeId={storeid.toString()} page={page} pageSize={pageSize}
                                  totalPagesCallback={setTotalPages}
                                  search={debouncedValue}/>
                    <div style={{display: 'none'}}>
                        <ViewProducts storeId={storeid.toString()} page={page + 1} pageSize={pageSize}
                                      totalPagesCallback={() => null}
                                      search={debouncedValue}/>
                    </div>
                </>)}


            </Stack>
        </SelectedStoreLayout>
    );
};

export default AuthGuard(Products);
