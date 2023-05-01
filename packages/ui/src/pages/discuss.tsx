/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, Badge, Avatar, Popover, Button, Container, Space, Alert, Table, Grid, Text, Card, Group, rem, Tooltip } from '@mantine/core';
import React, { useState } from 'react';
import { NoStyleCard, StandardCard } from '../components/card';
import { IconAd, IconDiscountCheck, IconExclamationMark } from '@tabler/icons-react';
// import { noBorderAlarm } from '../styles/alarm';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';

const useStyles = createStyles((theme) => ({}));

export default function DiscussPage() {
    const { classes, cx, theme } = useStyles();
    const [opened, setOpened] = useState(false);
    return (
        <>
            <Container>
                <Grid>
                    <Grid.Col sm={12} xs={12} lg={8}>
                        <NoStyleCard>
                            {/* <Card.Section>
                                <Alert icon={<IconExclamationMark stroke={1.5} />} radius={0} title='信息' color='red'>
                                    <Text size={12.5} color={theme.colors.red[4]}>
                                        本讨论已被删除。
                                        <br />
                                        该信息 / 帖子仅拥有 管理讨论 的权限可查看。
                                    </Text>
                                </Alert>
                            </Card.Section> */}
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
                                qwq
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
                                                <Picker theme={theme.colorScheme} set={'twitter'} locale='zh' data={data} onEmojiSelect={console.log} />
                                            </div>
                                        </Popover.Dropdown>
                                    </Popover>
                                </Text>
                            </Card.Section>
                        </NoStyleCard>
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
                    <Space h='md' />
                </Grid>
            </Container>
        </>
    );
}
