import { AppShell, Footer, Text, useMantineTheme, Button } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Navbar } from '../components/NavBar';
import React from 'react';
import { AppFooter } from '../components/Footer';

interface RootProps {
    onThemeChange: () => void;
}

export function Root({ onThemeChange }: RootProps) {
    const userState = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
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
                    paddingBottom:
                        'calc(var(--mantine-header-height, 0px) + 0.05rem)',
                },
            }}
            // navbarOffsetBreakpoint='sm'
            // asideOffsetBreakpoint='sm'
            padding="md"
            footer={
                <AppFooter onThemeChange={onThemeChange}></AppFooter>
            }
            header={
                <Navbar
                    title="在线校园"
                    links={mainLinks}
                    // onThemeChange={onThemeChange}
                ></Navbar>
            }
        >
            <Outlet />
        </AppShell>
    );
}
