import {NextPage} from "next";
import {useState} from "react";
import {BlogApplicationViewDto} from "../../models/BlogApplicationViewDto";
import {useFetchPaginatedApi} from "../../services/api/Api";
import {Card, Loader, Pagination, Stack, Table, Text} from "@mantine/core";
import BlogPostState from "../../components/Utils/BlogPostState";
import {ToFormattedDate} from "../../services/utils/Timeformat";

const SentApplications: NextPage = () => {

    const [page, setPage] = useState(1);
    const rowsPerPage = 50;


    const {
        data: applications,
        error,
        isLoading
    } = useFetchPaginatedApi<BlogApplicationViewDto>(`/BlogApplication/sent-applications`,
        page, rowsPerPage);

    const rows = applications?.data.map((application) => (
        <tr key={application.id}>
            <td><BlogPostState accepted={application.accepted}/></td>
            <td>{application.storeName}</td>
            <td>{ToFormattedDate(application.created, 'system')}</td>
        </tr>

    ));
    return (
        <Stack>
            <Text size={'xl'} align={'center'}>Your sent applications</Text>
            {isLoading ? <Loader size={'lg'}/> :
                <Card>
                    <Stack align={'center'}>
                        {applications?.data.length === 0 ? <Text>No applications sent</Text> :
                            <>
                                <Pagination total={applications?.totalPages ?? 0} siblings={1} initialPage={1}
                                            page={page}
                                            onChange={x => setPage(x)}/>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Store</th>
                                        <th>Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>{rows}</tbody>
                                </Table>
                            </>
                        }
                    </Stack>
                </Card>
            }
        </Stack>
    )
}

export default SentApplications;
