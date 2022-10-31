import {Image, Modal} from "@mantine/core";
import {useState} from "react";
import ImgSl from "./ImgSl";
import useSWR from "swr";
import {getBiggerResTexture} from "../../services/utils/SlResolver";

export interface ImageViewDialogProps {
    uuid: string;
    miniWidth?: string;
    miniHeight?: string;
}

// const imageFetcher = (textureUuid: string) => getBiggerResTexture(textureUuid).then((res) => res)

export default function ImageViewDialog({uuid, miniWidth = '4rem', miniHeight = '3rem'}: ImageViewDialogProps) {
    const [opened, setOpened] = useState(false);

    const {data, error, mutate} = useSWR(uuid, getBiggerResTexture);

    return (
        <>
            <Modal
                size={'xl'}
                opened={opened}
                onClose={() => setOpened(false)}
                title=""
            >
                {/* Modal content */}
                {data && <Image withPlaceholder src={data} alt="Profile image"
                    // width={'100%'} height={'100%'}
                                fit={'contain'}
                />}
            </Modal>

            <div onClick={() => {
                setOpened(true)
            }}>
                <ImgSl
                    uuid={uuid}
                    width={miniWidth}
                    height={miniHeight}
                />
            </div>
        </>
    );
}
