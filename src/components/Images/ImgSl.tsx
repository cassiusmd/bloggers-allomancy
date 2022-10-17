import {gettextureUuidSlUrl, NullKeyToNull} from "../../services/utils/SlResolver";
import {Image} from "@mantine/core";

interface ImgSlProps {
    uuid: string;
    width?: string;
    height?: string;
}

export default function ImgSl({
                                  uuid,
                                  width = '320px',
                                  height = '240px',
                              }: ImgSlProps) {
    return (
        <Image
            src={NullKeyToNull(uuid) ? gettextureUuidSlUrl(uuid) : null}
            width={width}
            height={height}
        />
    );
}
