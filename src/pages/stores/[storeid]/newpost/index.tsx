import {NextPage} from 'next';

import {useRouter} from 'next/router';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {BlogProductListing} from '../../../../models/BlogProductListing';
import {useFetchPaginatedApi} from '../../../../services/api/Api';
import {AuthGuard} from '../../../../auth/AuthGuard';
import BloggerProductDto from "../../../../models/BloggerProductDto";
import {Badge, Box, Group, Loader, Stack, Text} from "@mantine/core";
import PostProductsDialog from "../../../../components/Dialogs/PostProductsDialog";
import {ApiPaginatedResponse} from "../../../../services/api/models/ApiPaginatedResponse";
import CardWithImage from "../../../../components/Cards/CardWithImage";
import SelectedStoreLayout from "../../../../components/Layouts/SubLayouts/SelectedStores/SelectedStoreLayout";


const Post: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;
    // const [products, setProducts] = useState<BloggerProductDto[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<BlogProductListing[]>([]);

    // const {store} = useSelector<State, SelectedStore>(
    //     (state) => state.selectedStore
    // );

    const isProductSelected = (product: BlogProductListing) => {
        return selectedProducts.findIndex((p) => p.id === product.id) > -1;
    };

    const toggleProductSelection = (product: BlogProductListing) => {
        if (isProductSelected(product)) {
            setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    // const fetchUnbloggedProducts = () => {
    //     ApiGet<BloggerProductDto[]>(
    //         `blogger/stores/${storeid}/unblogged-products`
    //     ).then(
    //         (res) => {
    //             // console.log(res);
    //             setSelectedProducts([]);
    //             setProducts(res.data);
    //         },
    //         (reason) => null
    //     );
    // };


    const {data, mutate, isLoading} = useFetchPaginatedApi<BloggerProductDto>(
        `blogger/stores/${storeid}/unblogged-products`,
        1,
        200
    );
    const products = data?.data ?? [];

    const handlePosPostChange = useCallback((productsToRemove: BlogProductListing[]) => {

        // mutate removing selectedProducts from the list
        const newProducts = data?.data.filter((p) => {
            return productsToRemove.findIndex((pr) => pr.id === p.id) === -1;
        });


        mutate({...data, data: newProducts ?? []} as ApiPaginatedResponse<BloggerProductDto>, false)
            .then(() => {
                setSelectedProducts([]);
            });


    }, [data, mutate]);

    // useEffect(() => {
    //     fetchUnbloggedProducts();
    // }, []);
    return (
        <SelectedStoreLayout>
            <Stack spacing={5} align={'center'}>

                <Text size={'lg'}>Unposted products</Text>
                <Stack align={'center'} spacing={1}>
                    {/*<Button variant={'contained'} disabled={!selectedProducts.length}>*/}
                    {/*  Post*/}
                    {/*</Button>*/}
                    <PostProductsDialog disabled={!selectedProducts.length} products={selectedProducts}
                                        callSuccess={() => handlePosPostChange(selectedProducts)}/>

                    <Text>Selected: {selectedProducts.length}</Text>
                </Stack>
                <Group align={'center'} mt={5}>
                    {isLoading && <Loader/>}
                    {products.map((product) => {
                        return (
                            <Box key={product.id}>
                                <CardWithImage description={product.name} imageUuid={product.image}
                                               sx={(theme) => ({
                                                   cursor: 'pointer',
                                                   border: '1px solid #eaeaea',
                                                   // show border only if selected, and according to theme
                                                   borderColor: isProductSelected(product)
                                                       ? theme.colorScheme === 'dark' ? 'white' : 'black'
                                                       : 'transparent',
                                                   minWidth: 200,
                                                   maxWidth: 200,

                                               })}
                                               onClick={() => toggleProductSelection(product)}

                                               badge={isProductSelected(product) ?
                                                   <Badge sx={{cursor: "pointer"}} color={'orange'}>Selected</Badge>
                                                   : (<Badge sx={{cursor: "pointer"}} color={'primary'}>Select</Badge>)}
                                />
                            </Box>
                        );
                    })}
                </Group>
            </Stack>
        </SelectedStoreLayout>
    );
};

export default AuthGuard(Post);
