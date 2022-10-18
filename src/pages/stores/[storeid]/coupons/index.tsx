import {NextPage} from 'next';
import {AuthGuard} from '../../../../auth/AuthGuard';
import * as React from 'react';
import {useCallback} from 'react';
import {StoreBloggerCouponSettingsDto} from '../../../../models/StoreBloggerCouponSettingsDto';
import {useFetchApi} from '../../../../services/api/Api';
import {useRouter} from 'next/router';
import {CouponDto} from '../../../../models/CouponDto';
import {Card, Group, Loader, Stack, Text, Tooltip} from "@mantine/core";
import CopyToClipboardSpan from "../../../../components/Clipboard/CopyToClipboardSpan";
import CopyToClipboardButton from "../../../../components/Clipboard/CopyToClipboardButton";
import CouponDialog from "../../../../components/Dialogs/CouponDialog";

const Coupons: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;

    // const [couponSettings, setCouponSettings] =
    //     useState<StoreBloggerCouponSettingsDto | null>(null);
    //
    // const [coupon, setCoupon] = useState<CouponDto | null>(null);
    //
    // const fetchSettings = async () => {
    //     ApiGet<StoreBloggerCouponSettingsDto>(
    //         `BloggerCoupon/${storeid}/settings`
    //     ).then(
    //         (response) => {
    //             // console.log(response.data);
    //             setCouponSettings(response.data);
    //         },
    //         (error) => {
    //             // toast.error(GetErrorsString(error));
    //             ErrorToast(GetErrorsString(error));
    //             //
    //         }
    //     );
    // };


    // const fetchCoupon = async () => {
    //     ApiGet<CouponDto>(`BloggerCoupon/${storeid}/coupon`).then(
    //         (response) => {
    //             // console.log(response.data);
    //             setCoupon(response.data);
    //         },
    //         (error) => {
    //             // toast.error(GetErrorsString(error));
    //             ErrorToast(GetErrorsString(error));
    //         }
    //     );
    // };
    //
    // useEffect(() => {
    //     fetchSettings().then(() => fetchCoupon());
    // }, [storeid]);

    const settingsData = useFetchApi<StoreBloggerCouponSettingsDto>(`BloggerCoupon/${storeid}/settings`);
    const couponData = useFetchApi<CouponDto>(`BloggerCoupon/${storeid}/coupon`);

    const coupon = couponData.data?.data;

    const handleCouponChange = useCallback(() => {


        couponData.mutate(couponData.data, true)

    }, [couponData.data, couponData.mutate()]);

    return (
        <>
            <Stack spacing={5} align={'center'}>
                <Text size={'lg'} weight={700}>Coupons</Text>
                <Text>
                    Customers can use the coupon code to get a discount (as store credit)
                    on vendors with the coupon plugin by clicking on the discount button
                    and pasting the coupon code.
                </Text>
                <Text>
                    For every sale that your coupon is used you will receive a L$ payment
                    according to your commission set by the store owner.
                </Text>
                {/*{JSON.stringify(couponSettings)}*/}

                {storeid === undefined || coupon === null ? (
                    // <Typography variant={'h5'}>Loading</Typography>
                    // <LoadingOverlay />
                    <Loader size="xl"/>
                ) : settingsData.data?.data?.enabled ? (
                    <Card sx={{minWidth: 275}} shadow="sm" p="lg" withBorder mt={20}>

                        <Text sx={{fontSize: 14}} color="text.secondary">
                            {coupon ? 'Your coupon code:' : 'Generate your coupon'}
                        </Text>
                        {coupon == null ? (
                            <Text sx={{mb: 1.5, mt: 1.5}} color="text.secondary">
                                No coupon yet...
                            </Text>
                        ) : (
                            <>
                                <Group>
                                    <Text
                                        sx={{mb: 1.5, mt: 1.5}}
                                        size={'lg'} weight={700}
                                    >
                                        {/*{currentCoupon.code}*/}
                                        <CopyToClipboardSpan text={coupon.code}/>
                                    </Text>
                                    {/*<CopyToClipboardButton text={currentCoupon.code} />*/}
                                </Group>
                                <Tooltip multiline color={'dark'}
                                         label={'Profit you will receive from each sale your coupon is used'}>
                                    <Group spacing={5}>
                                        <Text color={'secondary'}>
                                            Your profit:
                                        </Text>
                                        <Text color={'yellow'}>
                                            {settingsData.data.data.bloggerProfit}%
                                        </Text>
                                    </Group>
                                </Tooltip>
                                <Tooltip
                                    color={'dark'}
                                    multiline
                                    label={'Discount the customer will receive, as store credit'}
                                >
                                    <Group spacing={5}>
                                        <Text color={'secondary'}>
                                            Customer discount:
                                        </Text>

                                        <Text color={'yellow'}>
                                            {settingsData.data.data.customerDiscount}%
                                        </Text>
                                    </Group>
                                </Tooltip>
                            </>
                        )}


                        {/*<Button size="small">Learn More</Button>*/}
                        {/*<Center m={10}>*/}
                        <Group mt={20}>
                            <CouponDialog currentCode={coupon?.code} storeId={storeid.toString()}
                                          callback={handleCouponChange}/>
                            {coupon && (
                                <span style={{marginLeft: 'auto'}}>
                                    <CopyToClipboardButton text={coupon.code}/>
                                    </span>
                            )}
                        </Group>
                        {/*</Center>*/}

                    </Card>
                ) : (
                    <Text size={'lg'} weight={600}>
                        Coupons are disabled on this store
                    </Text>
                )}
            </Stack>
        </>
    );
};

export default AuthGuard(Coupons);
