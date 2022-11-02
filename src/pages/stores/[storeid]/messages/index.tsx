import {NextPage} from 'next';
import {AuthGuard} from '../../../../auth/AuthGuard';
import {useRouter} from 'next/router';
import * as React from 'react';
import {useFetchPaginatedApi} from '../../../../services/api/Api';
import {List, Loader, Stack, Text} from "@mantine/core";
import {BlogMessageDto} from "../../../../models/BlogMessageDto";
import {ToFormattedDate} from "../../../../services/utils/Timeformat";
import SelectedStoreLayout from "../../../../components/Layouts/SubLayouts/SelectedStores/SelectedStoreLayout";


const Messages: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;

    const {data, isLoading} = useFetchPaginatedApi<BlogMessageDto>(`blogstores/${storeid}/messages`, 1, 50);
    const messages = data?.data ?? [];
    return (
        <SelectedStoreLayout>
            <Stack spacing={5} align={'center'}>
                <Text size={'xl'}>Messages</Text>
                <Stack sx={{maxWidth: '1000px'}} align={'center'}>
                    {isLoading ? (
                        <Loader size={'lg'}/>
                    ) : (
                        messages.length === 0 && (
                            <Text color={'secondary'} size={'md'}>
                                No messages yet
                            </Text>
                        )
                    )}

                    <List spacing={10} listStyleType={'none'}>
                        {messages.map((message, index) => (
                            <List.Item key={index}>
                                <div>
                                    <Text size={'xs'} color={'yellow'}>
                                        {ToFormattedDate(message.created, 'system')}
                                    </Text>
                                    <Text
                                        style={{whiteSpace: 'pre-wrap'}}
                                        size={'md'}
                                    >
                                        {message.message}
                                    </Text>
                                </div>
                            </List.Item>
                        ))}
                    </List>
                </Stack>
            </Stack>
        </SelectedStoreLayout>
    );
};

export default AuthGuard(Messages);
