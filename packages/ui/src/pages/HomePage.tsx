import { Badge, Container, Space, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Activity } from '../interfaces/activity';
import { StandardCard } from '../components/Card';

export default function HomePage() {
    const [popularActivities, setPopularActivities] = React.useState<Activity[]>([]);
	const theme = useMantineTheme();

    return (
        <>
            <Container>
                <StandardCard
                    title='公告列表'
                    subtitle={
                        <Badge color='blue' variant='light'>
                            测试
                        </Badge>
                    }
					content={
						'qwq'
					}
                />
                <Space h='md' />
            </Container>
        </>
    );
}
