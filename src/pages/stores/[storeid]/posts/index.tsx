import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {BlogPostOutput} from '../../../../models/BlogPostOutput';
import {ApiGetPaginated} from '../../../../services/api/Api';


import {NextPage} from 'next';

import {AuthGuard} from '../../../../auth/AuthGuard';
import {Anchor, Grid, Group, Pagination, Stack, Table, Text, Tooltip} from "@mantine/core";
import ImgSl from "../../../../components/Images/ImgSl";
import SocialIcon from "../../../../components/Icons/SocialIcons";
import GetExternalUrl from '../../../../services/utils/GetExternalUrl';
import {ToFormattedDate} from "../../../../services/utils/Timeformat";
import BlogPostState from "../../../../components/Utils/BlogPostState";

const Posts: NextPage = () => {
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const isFullWidth = useMediaQuery(theme.breakpoints.up('xl'));
    const router = useRouter();
    const {storeid} = router.query;
    const [posts, setPosts] = useState<BlogPostOutput[]>([]);

    const fetchPosts = (pageIndex: number, pageSize: number) => {
        ApiGetPaginated<BlogPostOutput>(
            `blogpost/${storeid}`,
            pageIndex + 1,
            pageSize
        ).then(
            (res) => {
                // console.log(res);
                setPosts(res.data);
                setRowsCount(res.totalPages);
            },
            (reason) => null
        );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsCount, setRowsCount] = useState(0);

    useEffect(() => {
        if (!storeid) return;
        fetchPosts(page, rowsPerPage);
    }, [storeid, rowsPerPage, page]);

    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // function createData({
    //   urls,
    //   created,
    //   products,
    //   comment,
    //   id,
    // }: BlogPostOutput) {
    //   // const links = urls.join(', ');
    //   return { products: products, urls, comment, created, id };
    // }

    return (
        <Stack spacing={5} align={'center'}>
            <Text size={'lg'}>Posts</Text>

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
                                <Grid>
                                    {row.products.map((p) => (
                                        <Grid.Col key={p.name}>
                                            {/*<Typography>*/}
                                            {/*  {p.slice(0, isMobile ? 14 : 50)}*/}
                                            {/*</Typography>*/}

                                            <Tooltip label={p.name}>
                            <span>
                              <ImgSl
                                  uuid={p.image}
                                  width={'4rem'}
                                  height={'3rem'}
                              />
                            </span>
                                            </Tooltip>
                                        </Grid.Col>
                                    ))}
                                </Grid>
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
            {/*<TablePagination*/}
            {/*    labelRowsPerPage={isMobile ? '' : 'Rows per page'}*/}
            {/*    rowsPerPageOptions={[10, 25, 100]}*/}
            {/*    component="div"*/}
            {/*    count={rowsCount}*/}
            {/*    rowsPerPage={rowsPerPage}*/}
            {/*    page={page}*/}
            {/*    onPageChange={handleChangePage}*/}
            {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*/>*/}
            <Pagination total={rowsCount} siblings={1} initialPage={1} page={page + 1} onChange={x => setPage(x - 1)}/>
            {/*</Box>*/}
        </Stack>
    );
};

export default AuthGuard(Posts);
