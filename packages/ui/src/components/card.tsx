import { Card, Group, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

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
    const theme = useMantineTheme();
    return (
        <Card shadow="xs" p="md" radius="sm" {...props}>
            <Card.Section inheritPadding>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={700} color={theme.colors.gray[5]} size={12.5}>
                        {title}
                    </Text>
                    {subtitle}
                </Group>
            </Card.Section>
            {content}
        </Card>
    );
}
