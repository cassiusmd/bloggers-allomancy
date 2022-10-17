import {SuccessToast} from "../../services/utils/Toasts";
import {IconClipboardCopy} from "@tabler/icons";


export interface CopyToClipboardButtonProps {
    text: string;
}

const CopyToClipboardButton = ({text}: CopyToClipboardButtonProps) => {
    const handleClick = () => {
        navigator.clipboard.writeText(text);
        SuccessToast('Coupon code copied!');
    };

    return (
        <div>
            {/*<Fab size={'small'} color={'primary'} onClick={handleClick}>*/}
            {/*    <ContentCopyIcon />*/}
            {/*</Fab>*/}
            <IconClipboardCopy onClick={handleClick} style={{cursor: 'pointer'}}/>
        </div>
    );
};
export default CopyToClipboardButton;
