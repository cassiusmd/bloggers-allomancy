import {Box, Card, CSSObject, MantineTheme, Text} from "@mantine/core";
import ImgSl from "../Images/ImgSl";
import * as React from "react";

export interface CardWithImageProps {
    sx?: CSSObject | ((theme: MantineTheme) => CSSObject);
    onClick?: () => void;
    description: string;
    extraInfo?: string;
    imageUuid: string;
    // badge component
    badge?: React.ReactNode;
}

export default function CardWithImage({description, imageUuid, sx, onClick, badge, extraInfo}: CardWithImageProps) {
    return (
        <Box sx={sx}>
            <Card
                withBorder
                shadow={'md'}
                sx={{
                    ":hover": {
                        // filter: 'brightness(1.2)'
                        // smoothly float on hover
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.2s ease-in-out',
                    }
                }}
                // add extra css
                // styles={{
                //
                //     ":hover": {
                //         transform: 'translateY(-5px)',
                //         transition: 'transform 0.2s ease-in-out',
                //     }
                //
                // }}
                onClick={onClick}>
                <Card.Section>

                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {/*{isProductSelected(product)*/}
                        {/*    ? (<Badge sx={{cursor: "pointer"}} color={'orange'}>Selected</Badge>)*/}
                        {/*    : (<Badge sx={{cursor: "pointer"}} color={'primary'}>Select</Badge>)*/}
                        {/*}*/}
                        {/*place badge above the image, absolute*/}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 5,
                            zIndex: 1,
                        }}>{badge}</Box>
                        <ImgSl
                            uuid={imageUuid}
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
                        {description.substring(0, 30)}
                    </Text>
                    {extraInfo && (
                        <Text align={'center'} component={'div'} size={'xs'} italic color={'orange'}>{extraInfo}</Text>)}
                </Card.Section>
            </Card>
        </Box>
    );
}
