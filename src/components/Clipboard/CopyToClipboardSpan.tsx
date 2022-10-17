import {SuccessToast} from "../../services/utils/Toasts";

export interface CopyToClipboardSpanProps {
    text: string;
}

const CopyToClipboardSpan = ({ text }: CopyToClipboardSpanProps) => {
    const handleClick = () => {
        navigator.clipboard.writeText(text);
        SuccessToast('Coupon code copied!');
    };

    return (
        <div>
      <span onClick={handleClick} style={{ cursor: 'pointer' }}>
        {text}
      </span>
        </div>
    );
};
export default CopyToClipboardSpan;
