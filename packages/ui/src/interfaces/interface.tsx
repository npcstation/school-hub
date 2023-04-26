import { IconCheck, IconX } from '@tabler/icons-react';
import { StandardCard } from '../components/card';
import React from 'react';
import { Button, Container, createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    feedbackSuccess: {
        marginTop: -10,
        fontSize: '25px',
        color: theme.colors.green[6],
        paddingLeft: 1,
        fontWeight: 700,
    },
    feedbackError: {
        marginTop: -15,
        fontSize: '25px',
        color: theme.colors.red[6],
        paddingLeft: 1,
        fontWeight: 700,
    },
    feedbackIcon: {
        paddingTop: 7,
    },
}));

export function Feedback({ status, title, msg, links }: any) {
    const { classes, cx, theme } = useStyles();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const link = (
        links as {
            link: string;
            title: string;
            color: string;
            style: string;
        }[]
    ).map((item) => (
        <>
            <a href={item.link}>
                <Button mr={2} color={item.color || 'indigo'} variant={item.style || 'filled'}>{item.title}</Button>
            </a>
        </>
    ));
    return (
        <Container>
            <StandardCard title='结果信息'>
                {status === 'success' ? (
                    <>
                        <IconCheck className={classes.feedbackIcon} size={25} color={theme.colors.green[6]} stroke={3} />
                        <span className={classes.feedbackSuccess}>{title}</span>
                    </>
                ) : (
                    <>
                        <IconX className={classes.feedbackIcon} size={25} color={theme.colors.red[6]} stroke={3} />
                        <span className={classes.feedbackError}>{title}</span>
                    </>
                )}
                <Text p={theme.spacing.xs}></Text>
                <Text>信息：{msg}</Text>
                <Text pt={theme.spacing.xs}></Text>
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    link as any
                }
            </StandardCard>
        </Container>
    );
}
