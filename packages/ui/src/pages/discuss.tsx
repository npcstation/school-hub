/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, Badge, Avatar, Popover, Button, Container, Space, Alert, Grid, Text, Card, Group, Pagination, rem, Indicator, Modal, Select, Input } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { StandardCard } from '../components/card';
import { NoStyleCard } from '../components/card';
import { useForm } from '@mantine/form';
import { VditorProvider, VditorThemeChangeProvider } from '../components/editor';
import { IconDiscountCheck } from '@tabler/icons-react';
import { handleCreateComment, createError } from '../handlers/discussHandler';
// import { noBorderAlarm } from '../styles/alarm';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';
// import { BlockSuitEditor } from '../components/editor';
import { DiscussSchema, fetchDiscussError, handleInfo } from '../handlers/discussHandler';
import { useParams } from 'react-router-dom';
import { Discuss } from '../components/discuss';
import { InfoLoad } from '../components/load';
import { useDisclosure, useToggle } from '@mantine/hooks';
import { standardSelect } from '../styles/select';
import Vditor from 'vditor';

const useStyles = createStyles((theme) => ({}));

// class BadgeShow extends React.Component {
//     componentDidMount() {
//         setTimeout(() => {
//             console.log('qw');
//             init({ data });
//         }, 4000)
//     }

//     render() {
//         // 返回需要渲染的内容
//         return <em-emoji set='twitter' id={this.props.id} size='10px'></em-emoji>;
//     }
// }

const righticon = (
    <Avatar size={24} color='indigo'>
        18
    </Avatar>
);

interface EmojiData {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    shortcodes: string;
    aliases: string[];
    skin: number;
}

export default function DiscussPage() {
    const [contentVditor, setContentVditor] = useState({});
    function onEmojiSelected(emoji: EmojiData) {
        // TODO: Emoji Selection
        alert(emoji.native);
    }

    const { classes, cx, theme } = useStyles();
    const [opened, setOpened] = useState(false);
    // init({ data });
    const [replyVditor, setReplyVditor] = useState({});

    const [discuss, setDiscuss] = useState<DiscussSchema>({
        did: -1,
        author: 0,
        topic: '',
        tags: [],
        title: '',
        content: '',
        createdTime: 0,
        lastModified: 0,
        parsedResponds: [],
        deleted: false,
        official: false,
        officialNotice: '',
        authorName: '',
        authorAvatar: '',
        commentCount: 0,
        comments: [],
    });

    const [loaded, setLoaded] = useState(false);
    const [status, setStatus] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const param = useParams();
    const did = parseInt(param.id || '-1', 10);
    const createForm = useForm({
        initialValues: {
            did: did
        },
    });
    var [nowPage, setNowPage] = useState(1);
    useEffect(() => {
        if (did === -1) {
            setLoaded(true);
            setStatus(false);
            setErrorMsg('帖子不存在');
            return;
        }
        handleInfo({ did: did, limit: 10,page: nowPage}).then((response) => {
            if (response.status === 'success') {
                if (response.data) {
                    setDiscuss(response.data);
                    setLoaded(true);
                    setStatus(true);
                }
            } else {
                setLoaded(true);
                setStatus(false);
                setErrorMsg(response.type ? fetchDiscussError[response.type] || '后端未知错误' : '后端未知错误');
            }
        });
    }, [did]);
    const getCommentWithPage = (value: number) => {
        handleInfo({ did: did, limit: 10,page: value}).then((response) => {
            if (response.status === 'success') {
                if (response.data) {
                    setNowPage(value);
                    setDiscuss(response.data);
                }
            } else {
                setErrorMsg(response.type ? fetchDiscussError[response.type] || '后端未知错误' : '后端未知错误');
            }
        });
    }
    return (
        <>
            <Container>
                {loaded ? (
                    status ? (
                        <Grid>
                            <Grid.Col xs={12} lg={8}>
                                <div style={{ display: 'none' }}>
                                    {/*预加载*/}
                                    <Picker theme={theme.colorScheme} set={'twitter'} locale='zh' data={data} />
                                </div>
                                <Discuss
                                    DiscussId={did}
                                    Header={{
                                        enable: discuss.official,
                                        title: '已认证的官方消息',
                                        description: discuss.officialNotice,
                                        icon: <IconDiscountCheck />,
                                        color: theme.colors.green[8],
                                    }}
                                    Comments={discuss.comments.map((comment) => {
                                        return {
                                            content: comment.content,
                                            user: {
                                                uid: comment.authorId,
                                                name: comment.authorName,
                                                gravatar: comment.authorAvatar,
                                            },
                                            sendTime: comment.createdTime,
                                            id: comment.cid,
                                            reaction: Object.entries(comment.responds).map(([k, v]) => ({
                                                code: k,
                                                count: v.length,
                                            })),
                                        };
                                    })}
                                    onPageChange={getCommentWithPage}
                                    pageNumber={discuss.commentCount / 10 + 1}
                                    nowPage={nowPage}
                                    Content={{
                                        title: discuss.title,
                                        content: discuss.content,
                                        user: {
                                            uid: discuss.author,
                                            name: discuss.authorName,
                                            gravatar: discuss.authorAvatar,
                                        },
                                        sendTime: discuss.createdTime,
                                        reaction: discuss.parsedResponds.map((v) => {
                                            return {
                                                code: v.emoji,
                                                count: v.count,
                                            };
                                        }),
                                    }}
                                ></Discuss>
                                <Space h={10} />
                                <NoStyleCard>
                                    <form
                                        onSubmit={createForm.onSubmit(async (data) => {
                                            const response = await handleCreateComment({
                                                ...data,
                                                content: (contentVditor as Vditor).getValue(),
                                                token: localStorage.getItem('token') || '',
                                            });
                                            console.info('技术参数');
                                            console.info(response);
                                            handleInfo({ did: did, limit: 10, page: nowPage}).then((response) => {
                                                if (response.status === 'success') {
                                                    if (response.data) {
                                                        setDiscuss(response.data);
                                                    }
                                                } else {
                                                    setErrorMsg(response.type ? fetchDiscussError[response.type] || '后端未知错误' : '后端未知错误');
                                                }
                                            });
                                        })}
                                    >
                                        <Input.Wrapper
                                            id='content'
                                            description='*正文部分, 支持markdown语法'
                                            required={true}
                                            inputWrapperOrder={['input', 'description', 'label', 'error']}
                                        >
                                            <Space h={4} />
                                            <VditorProvider fontLimit={3000} minHeight={300} id='create-vditor' setVd={setContentVditor} />
                                            {<VditorThemeChangeProvider vditor={contentVditor as Vditor} />}
                                        </Input.Wrapper>
                                        <Space h={10} />
                                        <Button className='shadowButton' type='submit' radius={'xl'}>
                                            发表评论
                                        </Button>
                                    </form>
                                </NoStyleCard>
                                
                            </Grid.Col>
                            <Grid.Col xs={12} lg={4}>
                                <StandardCard title='讨论详情'>
                                    <Group position='apart'>
                                        <Text fw={700} size={13}>
                                            回复
                                        </Text>
                                        <Text size={13}>{discuss.commentCount}</Text>
                                    </Group>
                                    <Group position='apart'>
                                        <Text fw={700} size={13}>
                                            讨论ID
                                        </Text>
                                        <Text size={13}>{did}</Text>
                                    </Group>                   
                                </StandardCard>
                                <Space h={10}></Space>
                            </Grid.Col>
                        </Grid>
                    ) : (
                        <StandardCard title='帖子详情'>加载讨论失败，错误信息：{errorMsg}</StandardCard>
                    )
                ) : (
                    <Grid>
                        <Grid.Col sm={12} xs={12} lg={8}>
                            <InfoLoad waitingfor='Discuss Data' />
                        </Grid.Col>
                    </Grid>
                )}
            </Container>
        </>
    );
}
