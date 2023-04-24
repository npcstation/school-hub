import { createStyles, AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Navbar } from '../components/navbar';
import React from 'react';
import { AppFooter } from '../structure/footer';

const useStyles = createStyles((theme) => ({
    
}));

interface RootProps {
    onThemeChange: () => void;
}

export function Root({ onThemeChange }: RootProps) {
    const { classes, cx, theme } = useStyles();
    const userState = useAppSelector((state) => state.user);
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
            padding='md'
            footer={<AppFooter onThemeChange={onThemeChange}></AppFooter>}
            header={
                <Navbar
                    title='在线校园'
                    links={mainLinks}
                ></Navbar>
            }
        >
            <Outlet />
        </AppShell>
    );
}