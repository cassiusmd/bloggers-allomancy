import {Box, Card, CSSObject, MantineTheme, Text} from "@mantine/core";
import ImgSl from "../Images/ImgSl";
import * as React from "react";

export interface CardWithImageProps {
    sx?: CSSObject | ((theme: MantineTheme) => CSSObject);
    onClick?: () => void;
    description: string;
    imageUuid: string;
    // badge component
    badge?: React.ReactNode;
}

export default function CardWithImage({description, imageUuid, sx, onClick, badge}: CardWithImageProps) {
    return (
        <Box sx={sx}>
            <Card
                withBorder
                shadow={'md'}
                sx={{
                    ":hover": {
                        filter: 'brightness(1.2)'
                    }
                }}
                // add extra css
                  styles={{

                      ":hover": {
                          filter: 'brightness(1.2)'
                      }

                  }}
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
                        {badge}
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
                </Card.Section>
            </Card>
        </Box>
    );
}
