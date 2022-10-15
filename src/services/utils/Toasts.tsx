import { IconCheck, IconCross } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

// Bare minimum – message is required for all notifications
// showNotification({ message: 'Hello' });

// Most used notification props
// showNotification({
//     id: 'hello-there',
//     disallowClose: true,
//     onClose: () => console.log('unmounted'),
//     onOpen: () => console.log('mounted'),
//     autoClose: 5000,
//     title: "You've been compromised",
//     message: 'Leave the building immediately',
//     color: 'red',
//     icon: <IconX />,
//     className: 'my-notification-class',
//     style: { backgroundColor: 'red' },
//     sx: { backgroundColor: 'red' },
//     loading: false,
// });
export function SuccessToast(message: string) {
    showNotification({
        id: 'success-toast',
        // disallowClose: true,
        // onClose: () => console.log('unmounted'),
        // onOpen: () => console.log('mounted'),
        autoClose: 4000,
        title: "Success",
        message: message,
        color: 'green',
        icon: <IconCheck />,
        // style: { backgroundColor: 'red' },
        // sx: { backgroundColor: 'red' },
        // loading: false,
    });
}

export function ErrorToast(message: string) {
    showNotification({
        id: 'error-toast',
        // disallowClose: true,
        // onClose: () => console.log('unmounted'),
        // onOpen: () => console.log('mounted'),
        autoClose: 4000,
        title: "Error",
        message: message,
        color: 'red',
        icon: <IconCross />,
    })
}
