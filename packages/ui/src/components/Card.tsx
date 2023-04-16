import React from "react";
import { Badge, Card, Container, Grid, Group, Space, Text, Timeline, useMantineTheme } from '@mantine/core';



export function StandardCard({ title, content, subtitle, ...props }: any) {
	const theme = useMantineTheme();
	return (
        <Card shadow='xs' p='md' radius='sm' {...props}>
            <Card.Section inheritPadding>
                <Group position='apart' mt='md' mb='xs'>
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