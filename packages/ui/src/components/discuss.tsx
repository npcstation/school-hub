import { UserSchema } from '../interfaces/user';
import { NoStyleCard } from './card';
import React from 'react';
import { Alert, Avatar, Card, Pagination, Popover, Space, Text, createStyles } from '@mantine/core';
// import { BadgeShow } from './exbadge';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data/sets/14/twitter.json';
import moment from 'moment';
import { MarkdownRender } from './markdown';

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
    Header: HeaderAlert;
    Content: ContentType;
}

export interface DiscussProp {
    Header: HeaderAlert;
    Content: ContentType;
    pageNumber: number;
    nowPage: number;
    Comments: CommentProps[];
}

interface EmojiData {
    id: string
    name: string
    native: string
    unified: string
    keywords: string[]
    shortcodes: string
    aliases: string[]
    skin: number
  }

export function DiscussContentCard({ Header, Content }: HeaderProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme } = createStyles((theme) => ({}))();
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

    function onEmojiSelected(emoji: EmojiData) {
        // TODO: Emoji Selection
        alert(emoji.native);
    }

    return (
        <NoStyleCard pt={0}>
            {headerAlert}
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
                <Text size={14.5}>
                    {' '}
                    <MarkdownRender md={Content.content} vid={(++contentID).toString()} />
                </Text>
            </Card.Section>
            <Card.Section withBorder p={6} pl={15}>
                <Text color='dimmed' fw={700} size={12.5}>
                    举报 · &nbsp;
                    <Popover radius='md' withinPortal width={350} withArrow shadow='md'>
                        <Popover.Target>
                            <span>Emoji</span>
                        </Popover.Target>
                        <Popover.Dropdown p={0}>
                            <div>
                                <Picker theme={theme.colorScheme} set={'twitter'} locale='zh' data={data} onEmojiSelect={onEmojiSelected} />
                            </div>
                        </Popover.Dropdown>
                    </Popover>
                    &nbsp;·&nbsp;
                </Text>
            </Card.Section>
        </NoStyleCard>
    );
}

let contentID = 0;

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
                        {user.name} · {sendTime /* 需要转化 */}
                    </Text>
                    <Text size={14.5} pt={5} pb={5}>
                        <MarkdownRender md={content} vid={(++ contentID).toString()} />
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
                    &nbsp;·&nbsp;
                </Text>
            </Card.Section>
        </NoStyleCard>
    );
}

export function Discuss({ Header, Comments, pageNumber, nowPage, Content }: DiscussProp) {
    const comments = Comments.map((item) => (
        <div key={item.id}>
            <Comment id={item.id} content={item.content} reaction={item.reaction} user={item.user} sendTime={item.sendTime} />
        </div>
    ));
    return (
        <>
            <DiscussContentCard Header={Header} Content={Content} />
            {comments}
            <Space h={4}></Space>
            <NoStyleCard>
                <Pagination
                    position='center'
                    total={pageNumber}
                    defaultValue={nowPage}
                    size={'sm'}
                    color='indigo'
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
