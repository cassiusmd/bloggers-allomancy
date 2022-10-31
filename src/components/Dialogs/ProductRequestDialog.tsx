import {Badge, Box, Group, Image, Modal, Text} from "@mantine/core";
import {useState} from "react";
import {ApiGet, GetErrorsString, useFetchApi} from "../../services/api/Api";
import {BlogProductListing} from "../../models/BlogProductListing";
import {ErrorToast, SuccessToast} from "../../services/utils/Toasts";
import CardWithImage from "../Cards/CardWithImage";
import useSWR from "swr";
import {getBiggerResTexture} from "../../services/utils/SlResolver";

export interface ProductRequestDialogProps {
    product: BlogProductListing;
}

const ProductRequestDialog = ({product}: ProductRequestDialogProps) => {
    const [opened, setOpened] = useState(false);

    const productDesc = useFetchApi<string>(`blogger/product-desc/${product.id}`);
    const image = useSWR(product.image, getBiggerResTexture);

    const requestProduct = () => {
        ApiGet<boolean>(`blogger/product-request/${product.id}`).then(
            (res) => {
                if (res) {
                    if (res.data) SuccessToast('Product requested!');
                    else ErrorToast('Error requesting product');
                    setOpened(false);
                }
            },
            (error) => {
                ErrorToast(GetErrorsString(error));
            }
        );
    };

    return (
        <>
            <Modal
                size={'auto'}
                opened={opened}
                onClose={() => setOpened(false)}
                title={product.name}
            >
                {/* Modal content */}

                <Group sx={{minHeight: '60vh', width: '100%'}} position="center">
                    <Box sx={{minWidth: '30vw', maxWidth: '600px', maxHeight: '600px', height: 'auto'}}>
                        <Image withPlaceholder src={image.data} alt="Profile image"
                            // width={'100%'} height={'100%'}
                               fit={'contain'}
                        />
                    </Box>
                    <Box sx={{maxWidth: '600px'}}>
                        <Text>{productDesc.data?.data ?? ''}</Text>
                    </Box>
                </Group>

            </Modal>

            <Group position="center">
                {/*<Button onClick={() => setOpened(true)}>Open Modal</Button>*/}
                <CardWithImage description={product.name} imageUuid={product.image}
                               badge={(Date.now() - new Date(product.created ?? Date.now()).getTime() < 14 * 24 * 3600 * 1000)
                                   && (<Badge color="red">new</Badge>)} onClick={() => setOpened(true)}
                               sx={(theme) => ({
                                   cursor: 'pointer',
                                   // show border only if selected, and according to theme
                                   minWidth: 200,
                                   maxWidth: 200,

                               })}
                />
            </Group>
        </>
    );
}

export default ProductRequestDialog;
