/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, Badge, Avatar, Popover, Button, Container, Space, Alert, Table, Grid, Text, Card, Group, rem, Tooltip, Anchor, Pagination } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { NoStyleCard, StandardCard } from '../components/card';
import { IconAd, IconDiscountCheck, IconExclamationMark } from '@tabler/icons-react';
// import { noBorderAlarm } from '../styles/alarm';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';
import { init } from 'emoji-mart'
import { VditorProvider, VditorThemeChangeProvider } from '../components/editor';
import Vditor from 'vditor';
// import { BlockSuitEditor } from '../components/editor';

import { IconHeading } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({}));

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'em-emoji': { set: string, id: string, size: string };
        }
    }
}


function BadgeShow({ id }: { id: string }) {
    init({ data });
    return (
        <em-emoji set='twitter' id={id} size='10px'></em-emoji>
    );
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

const righticon = <Avatar size={24} color='indigo' >18</Avatar>;

export default function DiscussPage() {
    const { classes, cx, theme } = useStyles();
    const [opened, setOpened] = useState(false);
    // init({ data });
    const [replyVditor, setReplyVditor] = useState({});
    return (
        <>
            <Container>
                <Grid>
                    <Grid.Col sm={12} xs={12} lg={8}>
                        <NoStyleCard>
                            <Card.Section>
                                <Alert icon={<IconDiscountCheck stroke={1.5} />} radius={0} title='已验证的官方讨论' color='green'>
                                    <Text size={12.5} color={theme.colors.green[8]}>
                                        公告类帖子
                                    </Text>
                                </Alert>
                            </Card.Section>
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
                                <IconHeading width={3} height={3} />
                                <div style={{ marginRight: 15, paddingTop: 7.435 }}>
                                    <Avatar color='pink' src='https://blog.smallfang.fun/image/tx.png' radius='xl'></Avatar>
                                </div>
                                <div>
                                    <Text size={12.5} color='dimmed'>
                                        smallfang · 2022.12.32
                                    </Text>
                                    <Text size={20}>第一条帖子 qwq</Text>
                                </div>
                            </Card.Section>

                            <Card.Section p={15} pl={10}>
                                <Text size={14.5}>qwq</Text>
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
                                                <Picker theme={theme.colorScheme} set={'twitter'} locale='zh' data={data} onEmojiSelect={alert} />
                                            </div>
                                        </Popover.Dropdown>
                                    </Popover>
                                    &nbsp;·&nbsp;
                                    <Badge color='indigo' variant='outline' radius='xl' pr={0} rightSection={righticon}>
                                        <BadgeShow id='-1' />
                                        &nbsp;
                                    </Badge>
                                </Text>
                            </Card.Section>
                        </NoStyleCard>

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
                                    <Avatar color='pink' src='' radius='xl'></Avatar>
                                </div>
                                <div>
                                    <Text size={12.5} color='dimmed'>
                                        ww · 2022.12.32
                                    </Text>
                                    <Text size={14.5} pt={5} pb={5}>
                                        如果说我换一行呢？
                                        <br />
                                        看起来也还好。
                                    </Text>

                                    {/*  */}
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
                                    <Badge color='indigo' variant='outline' radius='xl' pr={0} rightSection={righticon}>
                                        <BadgeShow id='+1' />
                                        &nbsp;
                                    </Badge>
                                </Text>
                            </Card.Section>
                        </NoStyleCard>

                        <Space h='md' />
                        <NoStyleCard>
                            <Pagination
                                position='center'
                                total={10}
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
                        <StandardCard title='回复讨论' mt={15}>
                            <VditorProvider minHeight={300} id='reply-vditor' setVd={setReplyVditor} />
                            <VditorThemeChangeProvider vditor={replyVditor as Vditor} />
                            <Space pt={10} />
                            <Button>回复</Button>
                        </StandardCard>
                    </Grid.Col>
                    <Grid.Col sm={12} xs={12} lg={4}>
                        <StandardCard title='讨论详情'>
                            <Card.Section p={5.5} pb={1.5} pl={15.5} pr={15.5}>
                                <Group position='apart'>
                                    <Text size={13} fw={800}>
                                        创建时间
                                    </Text>
                                    <div></div>
                                    <Text size={13} fw={400}>
                                        2022.12.32
                                    </Text>
                                </Group>
                            </Card.Section>
                            <Card.Section p={5.5} pb={1.5} pl={15.5} pr={15.5}>
                                <Group position='apart'>
                                    <Text size={13} fw={800}>
                                        创建用户
                                    </Text>
                                    <div></div>
                                    <Text size={13} fw={400}>
                                        smallfang
                                    </Text>
                                </Group>
                            </Card.Section>

                            <Card.Section p={5.5} pb={1.5} pl={15.5} pr={15.5}>
                                <Group position='apart'>
                                    <Text size={13} fw={800}>
                                        回复数
                                    </Text>
                                    <div></div>
                                    <Text size={13} fw={400}>
                                        150
                                    </Text>
                                </Group>
                            </Card.Section>
                            <Card.Section p={5.5} pb={15.5} pl={15.5} pr={15.5}>
                                <Group position='apart'>
                                    <Text size={13} fw={800}>
                                        ID
                                    </Text>
                                    <div></div>
                                    <Text size={13} fw={400}>
                                        123
                                    </Text>
                                </Group>
                            </Card.Section>
                        </StandardCard>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}
