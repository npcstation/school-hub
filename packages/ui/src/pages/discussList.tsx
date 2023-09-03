import {
    Alert,
    Avatar, Badge,
    Card, Center,
    Container,
    createStyles, Divider, Flex, Menu, Pagination, Popover, Space, Text,
} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    DiscussListElementSchema,
    fetchDiscussError,
    handleFetchDiscussList,
} from '../handlers/discussHandler';
import {NoStyleCard} from '../components/card';
import moment from 'moment/moment';
import {IconEye, IconInfoCircle, IconMessage} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    discussTitle: {
        fontWeight: 600,
        fontSize: 16,
    }
}));

function DiscussSingle({data}: { data: DiscussListElementSchema }) {
    const {theme, classes} = useStyles();
    return (
        <>
            <Card.Section
                withBorder
                p={6}
                pt={8}
                pb={12}
                px={10}
                ta={'left'}
                style={{
                    borderTop: 'none',
                }}
                onClick={() => {
                    window.location.href = `/discuss/${data.did}`;
                }}
            >
                <Flex direction="row">
                    <Flex align="center" ml={2} mr={16}>
                        <Avatar color="pink" src={data.authorAvatar} size={40}
                                radius="xl"></Avatar>
                    </Flex>
                    <div>
                        <Flex direction="row" align="center">
                            <Text size={12.5} color="dimmed">
                                {data.authorName} · {moment(data.createdTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                            </Text>
                            <Space w={2}></Space>
                        </Flex>
                        <Text
                            pt={1}
                            className={classes.discussTitle}>{data.title}</Text>
                        <Flex direction="row" align="center" pt={1.5}>
                            <IconEye size={12.5}
                                     color={theme.colors.gray[5]}>
                            </IconEye>
                            <Space w={4}></Space>
                            <Text size={12.5}
                                  color={theme.colors.gray[5]}>{data.commentCount}</Text>
                            <Space w={8}></Space>
                            <Text size={12.5} color="dimmed"> · </Text>
                            <Space w={8}></Space>
                            <IconMessage size={12.5}
                                         color={theme.colors.gray[5]}>
                            </IconMessage>
                            <Space w={4}></Space>
                            <Text size={12.5}
                                  color={theme.colors.gray[5]}>{data.commentCount}</Text>
                        </Flex>
                    </div>
                </Flex>
            </Card.Section>
        </>
    )
}

export default function DiscussListPage() {
    const {theme, classes} = useStyles();

    const [loaded, setLoaded] = useState(false);
    const [status, setStatus] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const param = useParams();

    const [discussList, setDiscussList] = useState<DiscussListElementSchema[]>([]);
    const [discussCount, setDiscussCount] = useState(0);

    const [nowPage, setNowPage] = useState(1);
    useEffect(() => {
        handleFetchDiscussList({
            token: localStorage.getItem('token') || '',
            limit: 5,
            page: nowPage
        }).then((response) => {
            if (response.status === 'success') {
                if (response.data) {
                    setDiscussList(response.data);
                    setDiscussCount(response.count || 0);
                    setLoaded(true);
                    setStatus(true);
                }
            } else {
                setLoaded(true);
                setStatus(false);
                setErrorMsg(response.type ? fetchDiscussError[response.type] || '后端未知错误' : '后端未知错误');
            }
        });
    }, [nowPage]);

    return (
        <>
            <Container>
                <Card.Section>
                    <Alert icon={<IconInfoCircle></IconInfoCircle>} radius={0} title="欢迎来到 灌水区" color="blue">
                        <Text size={12.5} color={theme.colors.blue[4]}>
                            规定什么的都不重要的吧，随便灌水就好了（
                        </Text>
                    </Alert>
                </Card.Section>
                <Space h={10}></Space>
                {loaded ? (
                    status ? (
                        <>
                            <NoStyleCard py={0}>
                                {discussList.map((element) => {
                                    return (
                                        <DiscussSingle key={element.did} data={element}></DiscussSingle>
                                    );
                                })}
                                <Center><Pagination py="md" value={nowPage} onChange={setNowPage}
                                                    total={Math.ceil(discussCount / 5)}/></Center>
                            </NoStyleCard>
                        </>
                    ) : (
                        <div>{errorMsg}</div>
                    )
                ) : (
                    <div>加载中……</div>
                )}
            </Container>
        </>
    );
}
