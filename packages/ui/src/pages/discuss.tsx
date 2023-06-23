/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, Badge, Avatar, Popover, Button, Container, Space, Alert, Grid, Text, Card, Group, Pagination, rem } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { NoStyleCard, StandardCard } from '../components/card';
import { IconDiscountCheck, IconX } from '@tabler/icons-react';
// import { noBorderAlarm } from '../styles/alarm';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';
import { init } from 'emoji-mart';
import { VditorProvider, VditorThemeChangeProvider } from '../components/editor';
import Vditor from 'vditor';
// import { BlockSuitEditor } from '../components/editor';
import { IconHeading } from '@tabler/icons-react';
import { DiscussSchema, fetchDiscussError, handleInfo } from '../handlers/discussHandler';
import { useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { alarm } from '../styles/alarm';
import moment from 'moment';
import { Discuss } from '../components/discuss';
import { InfoLoad } from '../components/load';

const useStyles = createStyles((theme) => ({}));

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'em-emoji': { set: string; id: string; size: string, class: string };
        }
    }
}

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

    useEffect(() => {
        if (did === -1) {
            setLoaded(true);
            setStatus(false);
            setErrorMsg('帖子不存在');
            return;
        }
        handleInfo({ did }).then((response) => {
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

    return (
        <>
            <Container>
                {loaded ? (
                    status ? (
                        <Grid>
                            <Grid.Col sm={12} xs={12} lg={8}>
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
                                    pageNumber={discuss.commentCount / 10 + 1}
                                    nowPage={1}
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
