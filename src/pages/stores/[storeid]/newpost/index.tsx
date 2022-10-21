import {NextPage} from 'next';

import {useRouter} from 'next/router';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {BlogProductListing} from '../../../../models/BlogProductListing';
import {useFetchPaginatedApi} from '../../../../services/api/Api';
import {AuthGuard} from '../../../../auth/AuthGuard';
import BloggerProductDto from "../../../../models/BloggerProductDto";
import {Badge, Box, Card, Group, Loader, Stack, Text} from "@mantine/core";
import PostProductsDialog from "../../../../components/Dialogs/PostProductsDialog";
import ImgSl from "../../../../components/Images/ImgSl";


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

    const handlePosPostChange = useCallback(() => {
        mutate(data, true)
        setSelectedProducts([]);
    }, [data, mutate]);

    // useEffect(() => {
    //     fetchUnbloggedProducts();
    // }, []);
    return (
        <Stack spacing={5} align={'center'}>

            <Text size={'lg'}>Unposted products</Text>
            <Stack align={'center'} spacing={1}>
                {/*<Button variant={'contained'} disabled={!selectedProducts.length}>*/}
                {/*  Post*/}
                {/*</Button>*/}
                <PostProductsDialog disabled={!selectedProducts.length} products={selectedProducts}
                                    callSuccess={() => handlePosPostChange}/>

                <Text>Selected: {selectedProducts.length}</Text>
            </Stack>
            <Group align={'center'} mt={5}>
                {isLoading && <Loader/>}
                {products.map((product) => {
                    return (
                        <Box key={product.id}>
                            {/*<CardImageDialog*/}
                            {/*  contentComponent={ProductDialogContent}*/}
                            {/*  componentData={product}*/}
                            {/*  title={'Product'}*/}
                            {/*  image={product.image}*/}
                            {/*  name={product.name}*/}
                            {/*/>*/}

                            {/*<SelectableCard*/}
                            {/*    image={product.image}*/}
                            {/*    name={product.name}*/}
                            {/*    info={*/}
                            {/*        !store.vip*/}
                            {/*            ? 'Deadline: ' +*/}
                            {/*            ToFormattedDate(product.expireDate, 'system')*/}
                            {/*            : undefined*/}
                            {/*    }*/}
                            {/*    onClick={() => toggleProductSelection(product)}*/}
                            {/*    active={isProductSelected(product)}*/}
                            {/*    disableSelection={selectedProducts.length >= 3}*/}
                            {/*/>*/}
                            <Card sx={(theme) => ({
                                cursor: 'pointer',
                                border: '1px solid #eaeaea',
                                // show border only if selected, and according to theme
                                borderColor: isProductSelected(product)
                                    ? theme.colorScheme === 'dark' ? 'white' : 'black'
                                    : 'transparent',
                                minWidth: 200,
                                maxWidth: 200,
                                ":hover": {
                                    filter: 'brightness(1.2)'
                                }
                            })}

                                  onClick={() => toggleProductSelection(product)}
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
                                        {isProductSelected(product)
                                            ? (<Badge sx={{cursor: "pointer"}} color={'orange'}>Selected</Badge>)
                                            : (<Badge sx={{cursor: "pointer"}} color={'primary'}>Select</Badge>)
                                        }
                                        <ImgSl
                                            uuid={product.image}
                                            // height={'180px'}
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    </div>


                                </Card.Section>
                                <Card.Section>
                                    <Text
                                        size={'xs'}
                                        component={'div'}
                                        align={'center'}
                                    >
                                        {product.name.substring(0, 30)}
                                    </Text>
                                </Card.Section>
                            </Card>
                        </Box>
                    );
                })}
            </Group>
        </Stack>
    );
};

export default AuthGuard(Post);
