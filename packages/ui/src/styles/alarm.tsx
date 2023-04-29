/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MantineTheme } from '@mantine/core';

export function alarm(status: 'error' | 'success') {
    return (theme: any) => ({
        root: {
            backgroundColor: status === 'error' ? theme.colors.red[6] : theme.colors.green[6],
            borderColor: status === 'error' ? theme.colors.red[6] : theme.colors.green[6],
            '&::before': { backgroundColor: theme.white },
        },
        title: { color: theme.white },
        description: { color: theme.white },
    });
} 