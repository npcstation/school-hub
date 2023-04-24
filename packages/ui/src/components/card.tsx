import { Card, Group, Text, useMantineTheme, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
    standardCard: {
        fontWeight: 700,
        color: theme.colors.gray[5],
        size: 12.5,
    }
}));

export function StandardCard({
    title,
    content,
    subtitle,
    ...props
}: {
    title: string | React.ReactNode;
    content: React.ReactNode;
	subtitle?: React.ReactNode;
	pt?: string | number;
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
            {content}
        </Card>
    );
}
