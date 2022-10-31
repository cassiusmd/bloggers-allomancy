import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorToast, SuccessToast} from "../../services/utils/Toasts";
import {DateTime} from "luxon";
import {Box, Button, Group, Modal, Stack, Text, Textarea} from "@mantine/core";
import {ApiPost, GetErrorsString, useFetchApi} from "../../services/api/Api";
import {useState} from "react";
import {useRouter} from "next/router";
import {Store} from "../../models/Store";
import RangeDatePicker from "../DatePickers/RangeDatePicker";

interface VacationDateRange {
    startingDate: Date;
    endingDate: Date;
}

export default function RequestVacationButton() {
    // const {store} = useSelector<State, SelectedStore>(
    //     (state) => state.selectedStore
    // );

    const router = useRouter();
    const {storeid} = router.query;

    // if (storeid !== undefined && store?.id !== storeid) {
    //     ApiGet<Store>(`blogstores/${storeid}`).then((res) => {
    //         // console.log(res.data);
    //         dispatch(selectedStoreSet(res.data));
    //     });
    // }

    const storeData = useFetchApi<Store>(`blogstores/${storeid}`);
    const store = storeData.data?.data;

    // const [vacationStartDate, setVacationStartDate] = useState<DateTime>(
    //     DateTime.utc()
    // );
    // const [vacationEndDate, setVacationEndDate] = useState<DateTime>(
    //     DateTime.utc().plus({months: 1})
    // );
    const [vacationDateRange, setVacationDateRange] = useState<VacationDateRange>({
        startingDate: DateTime.utc().toJSDate(),
        endingDate: DateTime.utc().plus({months: 1}).toJSDate(),
    });

    function requestVacation(requestVacation: RequestVacationFormData): void {
        // console.log(vacationStartDate.toISO());
        if (!store) return;

        ApiPost(`blogger/request-vacation/${store.id}`, {
            // vacationStart: vacationStartDate.toUTC().toJSDate(),
            // vacationEnd: vacationEndDate?.toUTC().toJSDate(),
            vacationStart: vacationDateRange.startingDate,
            vacationEnd: vacationDateRange.endingDate,
            // moreInfo: moreInfo,
            moreInfo: requestVacation.moreInfo,
        }).then(
            () => {
                SuccessToast(
                    `You have requested a vacation from ${store.name ?? 'the store'}`
                );
                setOpened(false);
            },
            (reason) => {
                ErrorToast(GetErrorsString(reason));
            }
        );

    }

    const [opened, setOpened] = useState(false);


    // const requestVacationFormSchema = yup
    //     .object({
    //         moreInfo: yup
    //             .string()
    //             .max(500, 'Your message is too long. (max of 500 characters)'),
    //     })
    //     .required();


    // use zod
    const requestVacationFormSchema = z.object({
        moreInfo: z.string().max(500, 'Your message is too long. (max of 500 characters)'),
    });
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RequestVacationFormData>({
        resolver: zodResolver(requestVacationFormSchema),
    });

    type RequestVacationFormData = {
        moreInfo: string;
    };

    const handleRequestVacationSubmit: SubmitHandler<RequestVacationFormData> = (
        data
    ) => {
        // console.log(data);

        requestVacation(data);
    };

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} title={'Request vacation'}>
                <Box
                    component={'form'}
                    sx={{mt: 1}}
                    onSubmit={handleSubmit(handleRequestVacationSubmit)}
                >
                    <Stack spacing={10}>
                        <Text>Please choose the date range for your vacation bellow.</Text>
                        <Box>
                            <RangeDatePicker
                                startingDate={vacationDateRange.startingDate}
                                endingDate={vacationDateRange.endingDate}
                                callback={(startingDate, endingDate) => {
                                    // if (
                                    //   date !== null &&
                                    //   vacationStartDate !== null &&
                                    //   date < vacationStartDate
                                    // ) {
                                    //   return;
                                    // }

                                    setVacationDateRange({
                                        startingDate: startingDate ?? vacationDateRange.startingDate,
                                        // if ending date is null, set it to the starting date plus 1 month
                                        endingDate: endingDate
                                            ?? DateTime.fromJSDate(startingDate ?? vacationDateRange.startingDate)
                                                .plus({months: 1}).toJSDate(),
                                    });

                                }}
                            />
                        </Box>
                        <Textarea
                            autoFocus
                            minRows={5}
                            maxRows={10}
                            id="reason"
                            label="Info/reason"
                            {...register('moreInfo')}
                            error={!!errors.moreInfo && errors.moreInfo?.message}
                        />


                        <Group>
                            <Button color={'red'} onClick={() => setOpened(false)}>Cancel</Button>
                            {/* disable if picked date is before now */}
                            <Button
                                type="submit"
                                disabled={
                                    // !vacationEndDate ||
                                    // vacationEndDate <=
                                    // DateTime.fromJSDate(new Date()).plus({days: 3})
                                    vacationDateRange.endingDate <= DateTime.fromJSDate(new Date()).plus({days: 3}).toJSDate()
                                }
                            >
                                Request
                            </Button>
                        </Group>
                    </Stack>
                </Box>
            </Modal>
            <Group position={'center'}>
                <Button onClick={() => setOpened(true)}>
                    Request vacation
                </Button>
            </Group>
        </>
    );
}
