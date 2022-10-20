import {Tooltip} from "@mantine/core";
import {IconCheck, IconClock, IconX} from "@tabler/icons";


interface BlogPostStateProps {
    accepted?: boolean;
}

export default function BlogPostState({ accepted }: BlogPostStateProps) {
    switch (accepted) {
        case true:
            return (
                // <Typography variant={'body1'} color={'#337e25'}>
                //   Accepted
                // </Typography>
                <Tooltip label={'Accepted!'}>
          <span>
            <IconCheck color={'#337e25'} />
          </span>
                </Tooltip>
            );
        case false:
            return (
                // <Typography variant={'body1'} color={'#e53935'}>
                //   Rejected
                // </Typography>
                <Tooltip label={'Rejected'}>
          <span>
            <IconX color={'#e53935'} />
          </span>
                </Tooltip>
            );
        default:
            return (
                // <Typography variant={'body1'} color={'#d5e9f3'}>
                //   Pending
                // </Typography>
                <Tooltip label={'Pending'}>
          <span>
            <IconClock color={'#d5e9f3'} />
          </span>
                </Tooltip>
            );
    }
}
