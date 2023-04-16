import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, NavLink } from 'react-router-dom';
import React from 'react';

const useStyles = createStyles((theme) => ({
    header: {
        // display: "flex",
        width: '100%',
        // justifyContent: "space-between",
        // alignItems: "center",
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },

    title: {
        fontWeight: 300,
        fontSize: theme.fontSizes.xl,
        margin: 'auto',
        marginBottom: 5,
    },

    subTitle: {
        fontWeight: 400,
        fontSize: theme.fontSizes.sm,
        margin: 'auto',
        color: theme.colors.gray[7],
    },
}));

interface HeadersProps {
    title: string;
    color: string;
    subTitle: string;
}

export function HeaderCard({ color, subTitle, title }: HeadersProps) {
    const { classes, cx } = useStyles();
    return (
        <Header height={'auto'}>
            <div style={{ backgroundColor: color }} className={classes.header}>
                <div className={classes.title}>{title}</div>
                <div className={classes.subTitle}>{subTitle}</div>
            </div>
        </Header>
    );
}
