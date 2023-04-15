import { Badge, Card, Container, Grid, Group, Space, Text, Timeline, useMantineTheme } from '@mantine/core';
import { IconFileCertificate } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { Activity } from '../interfaces/activity';
import axios from 'axios';
import { StandardCard } from '../components/Card';

export default function HomePage() {
    const [popularActivities, setPopularActivities] = React.useState<Activity[]>([]);
	const theme = useMantineTheme();
    useEffect(() => {
        axios
            .get('http://localhost:3000/home/popular')
            .then((res) => {
                if (res.data.code != 0) {
                    console.error(res.data.msg);
                } else {
                    setPopularActivities(res.data.activities);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

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
