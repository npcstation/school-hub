import { createStyles, Badge, Container, Space } from '@mantine/core';
import React from 'react';
import { StandardCard } from '../components/card';

const useStyles = createStyles((theme) => ({
    
}));

export default function HomePage() {
    const { classes, cx, theme } = useStyles();
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
