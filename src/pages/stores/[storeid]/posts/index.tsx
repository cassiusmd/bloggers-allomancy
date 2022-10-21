import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {BlogPostOutput} from '../../../../models/BlogPostOutput';
import {useFetchPaginatedApi} from '../../../../services/api/Api';


import {NextPage} from 'next';

import {AuthGuard} from '../../../../auth/AuthGuard';
import {Anchor, Box, Group, Pagination, Stack, Table, Text, Tooltip} from "@mantine/core";
import SocialIcon from "../../../../components/Icons/SocialIcons";
import GetExternalUrl from '../../../../services/utils/GetExternalUrl';
import {ToFormattedDate} from "../../../../services/utils/Timeformat";
import BlogPostState from "../../../../components/Utils/BlogPostState";
import ImageViewDialog from "../../../../components/Images/ImageViewDialog";

interface PostsTableViewProps {
    page: number;
    rowsPerPage: number;
    rowsCountCallback: (total: number) => void;
    storeId: string;
}

function PostsTableView({page, rowsPerPage, rowsCountCallback, storeId}: PostsTableViewProps) {
    const {data, mutate, isLoading} = useFetchPaginatedApi<BlogPostOutput>(`blogpost/${storeId}`, page, rowsPerPage);
    const posts = data?.data ?? [];
    // const [rowsCount, setRowsCount] = useState(0);

    useEffect(() => {
        if (data) {
            rowsCountCallback(data.totalPages);
        }
    }, [data]);
    return (
        <Table
            aria-label="simple table"
            sx={{
                // display: 'block',
                overflowX: 'auto',
                // minWidth: '400px',
                // width: '100%',
                maxWidth: '100%',
                // tableLayout: 'fixed',
            }}
        >
            <thead>
            <tr>
                <td>Status</td>
                <td style={{minWidth: '6rem'}}>Products</td>
                <td>Links</td>
                <td align={'center'} style={{minWidth: 150}}>
                    Comment
                </td>
                <td align="right" style={{minWidth: 150}}>
                    Date
                </td>
            </tr>
            </thead>
            <tbody>
            {posts
                // .map((p) => createData(p))
                .map((row) => (
                    <tr
                        key={row.id}
                        // sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <th>
                            <BlogPostState accepted={row.accepted}/>
                        </th>
                        <td>
                            <Group>
                                {row.products.map((p) => (
                                    <Box key={p.name}>
                                        {/*<Typography>*/}
                                        {/*  {p.slice(0, isMobile ? 14 : 50)}*/}
                                        {/*</Typography>*/}

                                        <Tooltip label={p.name}>
                            <span>
                              {/*<ImgSl*/}
                                {/*    uuid={p.image}*/}
                                {/*    width={'4rem'}*/}
                                {/*    height={'3rem'}*/}
                                {/*/>*/}
                                <ImageViewDialog uuid={p.image}/>
                            </span>
                                        </Tooltip>
                                    </Box>
                                ))}
                            </Group>
                        </td>
                        <td align="right">
                            <Group spacing={1}>
                                {row.urls.map((l) => (
                                    <Group key={l}>
                                        <Tooltip label={l}>
                                            <Anchor component="a"
                                                // color="dimmed"
                                                    size="xs"
                                                    target="_blank"
                                                    rel={'noopener'}
                                                    key={l}
                                                    href={GetExternalUrl(l)}><SocialIcon link={l}/>
                                            </Anchor>
                                        </Tooltip>
                                    </Group>
                                ))}
                            </Group>
                        </td>

                        <td align="right">{row.comment}</td>
                        <td align="right">
                            {ToFormattedDate(row.created, 'system')}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

const Posts: NextPage = () => {
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const isFullWidth = useMediaQuery(theme.breakpoints.up('xl'));
    const router = useRouter();
    const {storeid} = router.query;

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);


    return (
        <Stack spacing={5} align={'center'}>
            <Text size={'lg'}>Posts</Text>

            {storeid && (
                <>
                    <PostsTableView page={page} storeId={storeid.toString()} rowsPerPage={rowsPerPage}
                                    rowsCountCallback={(totalPages) => setTotalRows(totalPages)}/>
                    <div style={{display: 'none'}}>
                        <PostsTableView page={page + 1} storeId={storeid.toString()} rowsPerPage={rowsPerPage}
                                        rowsCountCallback={() => null}/>
                    </div>
                </>
            )}

            <Pagination total={totalRows} siblings={1} initialPage={1} page={page } onChange={x => setPage(x)}/>
            {/*</Box>*/}
        </Stack>
    );
};

export default AuthGuard(Posts);
