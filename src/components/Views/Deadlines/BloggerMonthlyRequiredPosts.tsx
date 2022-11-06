import {useFetchPaginatedApi} from "../../../services/api/Api";
import {useEffect, useState} from "react";
import {Loader, Pagination, Stack, Table, Text, Tooltip} from "@mantine/core";
import BloggerProductDto from "../../../models/BloggerProductDto";
import {ToFormattedDate} from "../../../services/utils/Timeformat";
import {useRouter} from "next/router";
import {IconNavigation} from "@tabler/icons";
import BloggerMonthlyRequiredPostsDto from "../../../models/BloggerMonthlyRequiredPostsDto";

interface MonthlyRequiredPostsTableProps {
    page: number;
    rowsPerPage: number;
    rowsCountCallback: (total: number) => void;
}

function MonthlyRequiredPostsTable({page, rowsPerPage, rowsCountCallback}: MonthlyRequiredPostsTableProps) {
    const router = useRouter();
    const {
        data,
        error,
        isLoading
    } = useFetchPaginatedApi<BloggerMonthlyRequiredPostsDto>("/blogger/monthly-deadlines", page, rowsPerPage);

    useEffect(() => {
        if (data) {
            // console.log(data.totalPages);
            const totalPages = data.totalPages > 0 ? data.totalPages : 1;
            rowsCountCallback(totalPages);
        }
    }, [data]);

    const rows = data?.data.map((row) => (
        <tr key={row.store.id}>
            <td>{row.store?.name ?? ''}</td>
            <td>{row.requiredPostsCount - row.postsSubmitted} products</td>
            <td>
                <Tooltip label={'Go to store posting page'}>
                    <span><IconNavigation color={'lightblue'} style={{cursor: 'pointer'}}
                                          onClick={() => row.store?.id && router.push(`/stores/${row.store?.id}/newpost`)}/></span>
                </Tooltip>
            </td>
        </tr>
    ));
    return (
        <>
            {isLoading ? <Loader/> : (
                <>
                    {(rows?.length ?? 0) === 0 ? <Text>No pending posts for this month!</Text> :
                        <Table highlightOnHover
                               sx={{
                                   // display: 'block',
                                   // if mobile, display block
                                   '@media (max-width: 768px)': {
                                       display: 'block',
                                   },
                                   overflowX: 'auto',
                                   // minWidth: '400px',
                                   width: '100%',
                                   maxWidth: '100%',
                                   // tableLayout: 'fixed',
                               }}>

                            <thead>
                            <tr>
                                <td>Store</td>
                                <td>Required posts</td>
                                <td>Action</td>
                            </tr>
                            </thead>
                            {/* {...rows} */}
                            <tbody>
                            {rows}
                            </tbody>
                        </Table>}
                </>
            )}
        </>
    );
}

export default function BloggerMonthlyRequiredPosts() {

    const [page, setPage] = useState(1);
    const rowsPerPage = 50;
    const [totalRows, setTotalRows] = useState(0);

    return (<Stack spacing={5} align={'center'}>
        <Pagination total={totalRows} siblings={1} initialPage={1} page={page} onChange={x => setPage(x)}/>
        <Stack align={'center'} sx={{width: '100%'}}>
            <MonthlyRequiredPostsTable page={page} rowsPerPage={rowsPerPage}
                            rowsCountCallback={(total) => setTotalRows(total)}/>
        </Stack>
    </Stack>);
}
