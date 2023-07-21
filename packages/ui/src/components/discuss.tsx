/* eslint-disable @typescript-eslint/no-namespace */
import { UserSchema } from '../interfaces/user';
import { NoStyleCard } from './card';
import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Card, Badge, Pagination, Popover, Space, Text, createStyles } from '@mantine/core';
// import { BadgeShow } from './exbadge';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data/sets/14/twitter.json';
import moment from 'moment';
import { MarkdownRender } from './markdown';
import { handleRespond } from '../handlers/discussHandler';
import { InfoLoad } from './load';
import { EmojiBadge } from './emojibadge';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { alarm } from '../styles/alarm';
import { useAsync } from 'react-use';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'em-emoji': { set: string; native: string; size: string; class: string };
        }
    }
}

export interface CommentProps {
    content: string;
    user: Omit<UserSchema, 'gender'>;
    sendTime: number;
    id: number;
    reaction: {
        code: string;
        count: number;
    }[];
}

export interface HeaderAlert {
    enable: boolean;
    icon: JSX.Element;
    title: string;
    color: string;
    description: string;
}

export interface ContentType {
    title: string;
    content: string;
    user: Omit<UserSchema, 'gender'>;
    sendTime: number;
    reaction: {
        code: string;
        count: number;
    }[];
}

export interface HeaderProps {
    DiscussId: number;
    Header: HeaderAlert;
    Content: ContentType;
}

export interface DiscussProp {
    DiscussId: number;
    Header: HeaderAlert;
    Content: ContentType;
    pageNumber: number;
    nowPage: number;
    Comments: CommentProps[];
}

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

// function BadgeShow({ native }: { native: string }) {
//     return <em-emoji set='twitter' class={'icons'} native={native} size='13px'></em-emoji>;
// }

export function DiscussContentCard({ DiscussId, Header, Content }: HeaderProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme } = createStyles((theme) => ({}))();
    const [tid, setTid] = useState((++contentID).toString());
    const [markdownLoaded, setMarkdownLoaded] = useState(false);
    const [responds, setResponds] = useState(Content.reaction);
    useEffect(() => {
        function handleDone() {
            setTid(tid);
            document.getElementById(tid)?.classList.remove('vditor-reset');
            setMarkdownLoaded(true);
        }
        window.addEventListener(`${tid}-render-done`, handleDone);
        return () => {
            window.removeEventListener(`${tid}-render-done`, handleDone);
        };
    }, []);
    const headerAlert = Header.enable ? (
        <>
            <Card.Section>
                <Alert icon={Header.icon} radius={0} title={Header.title} color={Header.color}>
                    <Text size={12.5} color={theme.colors.green[8]}>
                        {Header.description /*markdown render*/}
                    </Text>
                </Alert>
            </Card.Section>
        </>
    ) : (
        <></>
    );

    async function onEmojiSelected(emoji: EmojiData) {
        const token: string = localStorage.getItem('token') || '';
        // eslint-disable-next-line no-console
        console.log(emoji);
        if (token === '') {
            // TODO: Respond on logout state
            notifications.show({
                title: '未登录',
                message: '请先登录再进行操作！',
                color: 'red',
                icon: <IconX />,
                styles: alarm('error'),
            });
            return;
        }
        const resp = await handleRespond({
            token,
            did: DiscussId,
            emoji: emoji.native,
        });
        if (resp.status === 'success') {
            setResponds([...responds, { code: emoji.native, count: 1 }]);
        }
    }

    async function onExistingEmojiClicked(emoji: string) {
        const token: string = localStorage.getItem('token') || '';
        // eslint-disable-next-line no-console
        console.log(emoji);
        if (token === '') {
            // TODO: Respond on logout state
            notifications.show({
                title: '未登录',
                message: '请先登录再进行操作！',
                color: 'red',
                icon: <IconX />,
                styles: alarm('error'),
            });
            return;
        }
        const resp = await handleRespond({
            token,
            did: DiscussId,
            emoji: emoji,
        });
        if (resp.status === 'success') {
            const incEmoji = responds.find((e) => e.code === emoji);
            if (incEmoji) {
                incEmoji.count++;
            }
        }
    }

    return (
        <>
            {markdownLoaded ? <></> : <InfoLoad waitingfor='Markdown Rendering' />}
            <NoStyleCard className='cardt' pt={0} style={{ display: markdownLoaded ? '' : 'none' }}>
                {headerAlert}
                <Card.Section
                    withBorder
                    p={6}
                    pt={10}
                    pl={10}
                    ta={'left'}
                    style={{
                        borderTop: 'none',
                        display: 'flex',
                    }}
                >
                    <div style={{ marginRight: 15, paddingTop: 7.435 }}>
                        <Avatar color='pink' src={Content.user.gravatar} radius='xl'></Avatar>
                    </div>
                    <div>
                        <Text size={12.5} color='dimmed'>
                            {Content.user.name} · {moment(Content.sendTime * 1000).format('YYYY-MM-DD HH:mm:ss') /* render */}
                        </Text>
                        <Text size={20}>{Content.title}</Text>
                    </div>
                </Card.Section>

                <Card.Section p={15} pl={10}>
                    <Text size={14.5}>{Content.content.length === 0 ? ' ' : <MarkdownRender md={Content.content} vid={tid} />}</Text>
                </Card.Section>
                <Card.Section withBorder p={7} pt={6} pl={10}>
                    <div className='bottomBar'>
                        <Text color='dimmed' fw={700} size={13}>
                            <Badge size='sm' radius='xl' color='blue'>
                                <span style={{ textTransform: 'none' }}>修改</span>
                            </Badge>
                            &nbsp;
                            <Badge size='sm' radius='xl' color='red'>
                                <span>举报</span>
                            </Badge>
                            &nbsp;
                            <Popover radius='md' withinPortal width={350} withArrow shadow='md'>
                                <Popover.Target>
                                    <Badge size='sm' radius='xl' color='green'>
                                        <span style={{ textTransform: 'none' }}>Emoji</span>
                                    </Badge>
                                </Popover.Target>
                                <Popover.Dropdown p={0}>
                                    <div>
                                        <Picker theme={theme.colorScheme} set={'twitter'} locale='zh' data={data} onEmojiSelect={onEmojiSelected} />
                                    </div>
                                </Popover.Dropdown>
                            </Popover>
                            &nbsp;
                            {responds.map((item) => {
                                return (
                                    <div key={item.code} style={{ marginLeft: '0.125rem', marginRight: '0.125rem', display: 'inline-flex' }}>
                                        <EmojiBadge
                                            native={item.code}
                                            count={item.count}
                                            onClick={() => onExistingEmojiClicked(item.code)}
                                        ></EmojiBadge>
                                    </div>
                                );
                            })}
                        </Text>
                    </div>
                </Card.Section>
            </NoStyleCard>
        </>
    );
}

let contentID = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Comment({ content, user, sendTime, reaction }: CommentProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme } = createStyles((theme) => ({}))();
    return (
        <NoStyleCard mt={10}>
            <Card.Section
                withBorder
                p={6}
                pt={10}
                pl={10}
                ta={'left'}
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ marginRight: 15, paddingTop: 4.435 }}>
                    <Avatar color='pink' src={user.gravatar} radius='xl'></Avatar>
                </div>
                <div>
                    <Text size={12.5} color='dimmed'>
                        {user.name} · {moment(sendTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>
                    <Text size={14.5} pt={5} pb={5}>
                        <MarkdownRender md={content} vid={(++contentID).toString()} />
                    </Text>
                </div>
            </Card.Section>
            <Card.Section p={6} pl={15}>
                <Text color='dimmed' fw={700} size={12.5}>
                    举报 · &nbsp;
                    <Popover radius='md' withinPortal width={350} withArrow shadow='md'>
                        <Popover.Target>
                            <span>Emoji</span>
                        </Popover.Target>
                        <Popover.Dropdown p={0}>
                            <div>
                                <Picker theme={theme.colorScheme} set={'twitter'} locale='zh' data={data} onEmojiSelect={alert} />
                            </div>
                        </Popover.Dropdown>
                    </Popover>
                    &nbsp;
                </Text>
            </Card.Section>
        </NoStyleCard>
    );
}

export function Discuss({ DiscussId, Header, Comments, pageNumber, nowPage, Content }: DiscussProp) {
    const comments = Comments.map((item) => (
        <div key={item.id}>
            <Comment id={item.id} content={item.content} reaction={item.reaction} user={item.user} sendTime={item.sendTime} />
        </div>
    ));
    return (
        <>
            <DiscussContentCard DiscussId={DiscussId} Header={Header} Content={Content} />
            {comments}
            <Space h={4}></Space>
            <NoStyleCard>
                <Pagination
                    position='center'
                    total={pageNumber}
                    defaultValue={nowPage}
                    size={'sm'}
                    color='gray'
                    styles={(theme) => ({
                        control: {
                            '&[data-active]': {
                                border: 'none',
                                background:
                                    theme.colorScheme === 'dark' ? theme.colors.gray[7] : 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);',
                                color: theme.colorScheme === 'dark' ? 'white' : 'black',
                            },
                        },
                    })}
                />
            </NoStyleCard>
        </>
    );
}
