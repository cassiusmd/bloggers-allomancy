import {gettextureUuidSlUrl, NullKeyToNull} from "../../services/utils/SlResolver";
import {Image, MantineNumberSize} from "@mantine/core";

interface ImgSlProps {
    uuid: string;
    width?: string;
    height?: string;
    radius?: MantineNumberSize;
}

export default function ImgSl({
                                  uuid,
                                  width = '320px',
                                  height = '240px',
                                  radius
                              }: ImgSlProps) {
    return (
        <Image
            withPlaceholder
            src={NullKeyToNull(uuid) ? gettextureUuidSlUrl(uuid) : 'https://stores.allomancy.com/assets/noimage.png'}
            width={width}
            height={height}
            radius={radius}
            // fit={'fill'}
        />
    );
}
