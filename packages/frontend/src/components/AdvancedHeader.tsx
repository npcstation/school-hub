import { useState } from 'react';
import { createStyles, Container, Avatar, UnstyledButton, Group, Text, Menu, Burger, Title, ActionIcon, Collapse, Paper, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHeart, IconSettings, IconChevronDown, IconMoon, IconSun, IconLogout, IconSend, IconLogin } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SideLink } from './SideLink';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.xs,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        paddingBottom: theme.spacing.xs,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    userLogin: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burgerUser: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface AdvancedHeaderProps {
    user: { name: string; image: string };
    links: {
        icon: React.ReactNode;
        color: string;
        link: string;
        label: string;
    }[];
    onThemeChange: () => void;
}

export function AdvancedHeader({ user, links, onThemeChange }: AdvancedHeaderProps) {
    const { classes, theme, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(true);

    const headerItems = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            onClick={() => {
                setActive(link.link);
            }}
        >
            <Button
                leftIcon={link.icon}
                className={cx(classes.link, {
                    [classes.linkActive]: active === link.link,
                })}
                variant='light'
            >
                <Text>{link.label}</Text>
            </Button>
        </Link>
    ));

    const burgerItems = links.map((link) => (
        <Link key={link.label} to={link.link}>
            <SideLink
                color={link.color}
                icon={link.icon}
                onClick={() => {
                    setActive(link.link);
                }}
                label={link.label}
            ></SideLink>
        </Link>
    ));

    const menuItems = (
        <>
            <Menu.Item icon={<IconHeart size='0.9rem' color={theme.colors.red[6]} stroke={1.5} />}>关注的活动</Menu.Item>
            <Menu.Item icon={<IconSend size='0.9rem' color={theme.colors.yellow[6]} stroke={1.5} />}>发布的活动</Menu.Item>
            <Menu.Label>设置</Menu.Label>
            <Menu.Item icon={<IconSettings size='0.9rem' color={theme.colors.blue[6]} stroke={1.5} />}>用户设置</Menu.Item>
            <Menu.Item icon={<IconLogout size='0.9rem' color={theme.colors.blue[6]} stroke={1.5} />}>退出登录</Menu.Item>
        </>
    );

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection}>
                <Group position='apart'>
                    <Title order={3}>在线校园</Title>

                    <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />

                    <Menu
                        width={260}
                        position='bottom-end'
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <div className={cx(classes.userLogin)}>
                                {userLoggedIn ? (
                                    <UnstyledButton
                                        className={cx(classes.user, {
                                            [classes.userActive]: userMenuOpened,
                                        })}
                                    >
                                        <Group spacing={7} p='xs'>
                                            <Avatar src={user.image} alt={user.name} radius='xl' size={20} />
                                            <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
                                                {user.name}
                                            </Text>
                                            <IconChevronDown size='1rem' stroke={1.5} />
                                        </Group>
                                    </UnstyledButton>
                                ) : (
                                    <Link
                                        to='/login'
                                        onClick={() => {
                                            setActive('/login');
                                        }}
                                    >
                                        <Button
                                            leftIcon={<IconLogin size={16} />}
                                            className={cx(classes.link, {
                                                [classes.linkActive]: active === '/login',
                                            })}
                                            variant='light'
                                        >
                                            <Text>登录 | 注册</Text>
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
            <Container>
                <Group spacing={10} className={classes.links}>
                    {headerItems}
                    <ActionIcon variant='light' onClick={onThemeChange}>
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
                    </ActionIcon>
                </Group>
            </Container>
            <Collapse className={classes.burger} in={opened} p='sm'>
                <Paper>
                    {userLoggedIn ? (
                        <Menu
                            width={240}
                            position='bottom-end'
                            transitionProps={{ transition: 'pop-top-right' }}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            withinPortal
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    display={userLoggedIn ? '' : 'none'}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        margin: '0 auto',
                                    }}
                                    className={cx(classes.burgerUser, {
                                        [classes.userActive]: userMenuOpened,
                                    })}
                                >
                                    <Group spacing={7} p='xs'>
                                        <Avatar src={user.image} alt={user.name} radius='xl' size={20} />
                                        <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
                                            {user.name}
                                        </Text>
                                        <IconChevronDown size='1rem' stroke={1.5} />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                        </Menu>
                    ) : (
                        <Link to='/login'>
                            <SideLink
                                color='purple'
                                icon={<IconLogin size={16} />}
                                onClick={() => {
                                    setActive('/login');
                                }}
                                label='登录 | 注册'
                            ></SideLink>
                        </Link>
                    )}
                    {burgerItems}
                    <Container pb='sm'>
                        <ActionIcon
                            size={32}
                            variant='light'
                            onClick={onThemeChange}
                            style={{
                                margin: '0 auto',
                            }}
                        >
                            <IconSun
                                size={24}
                                display={(() => {
                                    if (localStorage.getItem('colorScheme') === 'light') {
                                        return 'none';
                                    }
                                })()}
                            />
                            <IconMoon
                                size={24}
                                display={(() => {
                                    if (localStorage.getItem('colorScheme') === 'dark') {
                                        return 'none';
                                    }
                                })()}
                            />
                        </ActionIcon>
                    </Container>
                </Paper>
            </Collapse>
        </div>
    );
}
