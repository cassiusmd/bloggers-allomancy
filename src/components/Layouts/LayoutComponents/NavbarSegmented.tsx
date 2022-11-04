import {useState} from 'react';
import {createStyles, Navbar, Text} from '@mantine/core';
import {
    IconBuildingStore,
    IconFileAnalytics,
    IconHome,
    IconLicense,
    IconLogout,
    IconMapSearch,
    IconMessage2,
    IconMessages,
    IconReceiptRefund,
    IconShoppingCart,
    IconUsers,
} from '@tabler/icons';
import Link from "next/link";
import {useRouter} from "next/router";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');

    return {
        navbar: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },

        title: {
            textTransform: 'uppercase',
            letterSpacing: -0.25,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor})
                    .background,
                color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
                },
            },
        },

        footer: {
            borderTop: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
            paddingTop: theme.spacing.md,
        },
    };
});

const tabs = {
    account: [
        {link: '/', label: 'Home', icon: IconHome,},
        {link: '/stores', label: 'Your stores', icon: IconBuildingStore},
        {link: '/stores/view', label: 'Apply for stores', icon: IconMapSearch},
        {link: '/sent-applications', label: 'Sent applications', icon: IconFileAnalytics},
        // {link: '', label: 'Notifications', icon: IconBellRinging},
        // {link: '', label: 'Billing', icon: IconReceipt2},
        // {link: '', label: 'Other Settings', icon: IconSettings},
    ],
    general: [
        {link: '', label: 'Orders', icon: IconShoppingCart},
        {link: '', label: 'Receipts', icon: IconLicense},
        {link: '', label: 'Reviews', icon: IconMessage2},
        {link: '', label: 'Messages', icon: IconMessages},
        {link: '', label: 'Customers', icon: IconUsers},
        {link: '', label: 'Refunds', icon: IconReceiptRefund},
        {link: '', label: 'Files', icon: IconFileAnalytics},
    ],
};

export interface NavbarSegmentedProps {
    opened: boolean;
}

export function NavbarSegmented({opened}: NavbarSegmentedProps) {
    const {classes, cx} = useStyles();
    const [section, setSection] = useState<'account' | 'general'>('account');
    const [active, setActive] = useState('Billing');

    const router = useRouter();
    const route = router.route;


    const links = tabs[section].map((item) => (
        <Link href={item.link} key={item.label}>
            <a
                // className={cx(classes.link, {[classes.linkActive]: item.label === active})}
                // active if the link is the current page
                className={cx(classes.link, {[classes.linkActive]: item.link === route})}
                // href={item.link}

                onClick={(event) => {
                    // event.preventDefault();
                    setActive(item.label);
                }}
            >
                <item.icon className={classes.linkIcon} stroke={1.5}/>
                <span>{item.label}</span>
            </a>
        </Link>
    ));

    return (
        <Navbar hidden={!opened} hiddenBreakpoint="sm" height={840} width={{sm: 250}} p="md" className={classes.navbar}>
            {/*<Navbar.Section>*/}
            {/*<Text weight={500} size="sm" className={classes.title} color="dimmed" mb="xs">*/}
            {/*    Navigation*/}
            {/*</Text>*/}

            {/*<SegmentedControl*/}
            {/*    value={section}*/}
            {/*    onChange={(value: 'account' | 'general') => setSection(value)}*/}
            {/*    transitionTimingFunction="ease"*/}
            {/*    fullWidth*/}
            {/*    data={[*/}
            {/*        {label: 'Account', value: 'account'},*/}
            {/*        {label: 'System', value: 'general'},*/}
            {/*    ]}*/}
            {/*/>*/}
            {/*</Navbar.Section>*/}

            <Navbar.Section grow mt="sm">
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {/*<a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>*/}
                {/*    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5}/>*/}
                {/*    <span>Change account</span>*/}
                {/*</a>*/}
                <Link href={'/logout'}>
                    <a className={classes.link}>
                        <IconLogout className={classes.linkIcon} stroke={1.5}/>
                        <Text color={'red'}>Sign out</Text>
                    </a>
                </Link>
            </Navbar.Section>
        </Navbar>
    );
}
