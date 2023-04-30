/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Group, Text, useMantineTheme, createStyles, TextProps } from '@mantine/core';
import React from 'react';
import * as utils from '@mantine/utils';

const useStyles = createStyles((theme) => ({
    standardCard: {
        fontWeight: 700,
        color: theme.colors.gray[5],
        fontSize: 12.5,
    }
}));


export function StandardCard({
    title,
    content,
    subtitle,
    children,
    ...props
}: {
    title?: string | React.ReactNode;
    content?: React.ReactNode;
    subtitle?: React.ReactNode;
    pt?: string | number;
    children?: JSX.Element[] | JSX.Element | string;
        w?: string;
}) {
    const { classes, cx, theme } = useStyles();
    
    return (
        <Card shadow="xs" p="md" radius="sm" {...props}>
            <Card.Section inheritPadding>
                <Group position="apart" mt="md" mb="xs">
                    <Text className={classes.standardCard}>
                        {title}
                    </Text>
                    {subtitle}
                </Group>
            </Card.Section>
            {content || children}
        </Card>
    );
}
