import { AppShell, Footer, Text, useMantineTheme, ActionIcon, Button } from '@mantine/core';
import { IconUsers, IconHome, IconBrandGithub } from '@tabler/icons-react';
import { IconHeart, IconSettings, IconChevronDown, IconMoon, IconSun, IconLogout, IconSend, IconLogin } from '@tabler/icons-react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdvancedHeader } from '../components/AdvancedHeader';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { HeaderCard } from '../components/Header';
import { Navbar } from '../components/NavBar';

interface RootProps {
    onThemeChange: () => void;
}

export function Root({ onThemeChange }: RootProps) {
    const userState = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();
    const mainLinks = [
        { link: '/', label: '主页' },
        { link: '/login', label: '登录' },
    ];

    return (
        <AppShell
            styles={{
                main: {
                    minHeight: 'calc(100vh - 175px)',
                    paddingTop: '25px',
                    paddingBottom: 'calc(var(--mantine-header-height, 0px) + 0.05rem)',
                },
            }}
            // navbarOffsetBreakpoint='sm'
            // asideOffsetBreakpoint='sm'
            padding='md'
            footer={
                <Footer
                    withBorder={false}
                    styles={{ root: { position: 'relative', backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white' } }}
                    fixed={false}
                    height={'auto'}
                    p='md'
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'space-between',
                            fontWeight: 200,
                            paddingTop: 10,
                            paddingBottom: 30,
                            paddingLeft: 50,
                            paddingRight: 50,
                        }}
                    >
                        <div>
                            <Text size={21.5}>在线校园系统</Text>
							<Text>北京市八一学校 - NPC Station</Text>
                            <Text size={15}>
                                <Button
                                    onClick={() => {
                                        location.href = 'https://github.com/npcstation/school-hub';
                                    }}
                                    leftIcon={<IconBrandGithub size={13} />}
                                    variant='light'
                                    color='gray'
                                    radius='xs'
                                    size='xs'
                                    compact
                                >
                                    Github Repo
                                </Button>{' '}
                                &nbsp;
								<Button
									onClick={onThemeChange}
                                    leftIcon={
                                        <>
                                            <IconSun
                                                size={16}
                                                display={(() => {
                                                    if (localStorage.getItem('colorScheme') === 'light') {
                                                        return 'none';
                                                    }
                                                })()}
                                            />
                                            <IconMoon
                                                size={16}
                                                display={(() => {
                                                    if (localStorage.getItem('colorScheme') === 'dark') {
                                                        return 'none';
                                                    }
                                                })()}
                                            />
                                        </>
                                    }
                                    variant='light'
                                    color='gray'
                                    radius='xs'
                                    size='xs'
                                    compact
                                >
                                    Change Theme
                                </Button>
                            </Text>
                        </div>
                        <Text>alpha</Text>
                    </div>
                </Footer>
            }
            header={
                <Navbar
                    title='在线校园'
                    links={mainLinks}
                    // onThemeChange={onThemeChange}
                ></Navbar>
            }
        >
            <Outlet />
        </AppShell>
    );
}
