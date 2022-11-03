import {useFetchPaginatedApi} from "../../services/api/Api";
import {useEffect, useState} from "react";
import {Loader, Pagination, Stack, Table, Tooltip} from "@mantine/core";
import BloggerProductDto from "../../models/BloggerProductDto";
import {ToFormattedDate} from "../../services/utils/Timeformat";
import {useRouter} from "next/router";
import {IconNavigation} from "@tabler/icons";

interface DeadlinesTableProps {
    page: number;
    rowsPerPage: number;
    rowsCountCallback: (total: number) => void;
}

function DeadlinesTable({page, rowsPerPage, rowsCountCallback}: DeadlinesTableProps) {
    const router = useRouter();
    const {
        data,
        error,
        isLoading
    } = useFetchPaginatedApi<BloggerProductDto>("/blogger/next-deadlines", page, rowsPerPage);

    useEffect(() => {
        if (data) {
            rowsCountCallback(data.totalPages);
        }
    }, [data]);

    const rows = data?.data.map((row) => (
        <tr key={row.id}>
            {/*<td>{ToFormattedDate(row.expireDate, 'system')}</td>*/}
            {/*if expiration is in less than 5 days, make it red*/}
            {/*(Date.now() - new Date(product.created ?? Date.now()).getTime() < 14 * 24 * 3600 * 1000)*/}
            <td style={{color: ((new Date(row.expireDate).getTime() - Date.now()) < 5 * 24 * 3600 * 1000) ? 'red' : 'inherit'}}>
                {ToFormattedDate(row.expireDate, 'system')}
            </td>
            <td>{row.name}</td>
            <td>{row.store?.name ?? ''}</td>
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
                        <td>Expiration</td>
                        <td>Product</td>
                        <td>Store</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    {/* {...rows} */}
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default function BloggerNextDeadlines() {

    const [page, setPage] = useState(1);
    const rowsPerPage = 50;
    const [totalRows, setTotalRows] = useState(0);

    return (<Stack spacing={5} align={'center'}>
        <Pagination total={totalRows} siblings={1} initialPage={1} page={page} onChange={x => setPage(x)}/>
        <Stack align={'center'} sx={{width: '100%'}}>
            <DeadlinesTable page={page} rowsPerPage={rowsPerPage}
                            rowsCountCallback={(total) => setTotalRows(total)}/>
        </Stack>
    </Stack>);
}
