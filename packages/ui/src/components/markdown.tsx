import React from 'react';
import Vditor from 'vditor';
import { TypographyStylesProvider, useMantineTheme } from '@mantine/core';

interface MarkdownRenderProp {
    md: string,
    vid: string
}

export function MarkdownRender({ md, vid }: MarkdownRenderProp) {
    const theme = useMantineTheme();
    React.useEffect(() => {
        const previewElement = document.getElementById(vid);
        Vditor.preview(previewElement as HTMLDivElement, md, {
            // cdn: "",
            mode: 'light',
            theme: {
                current: theme.colorScheme === 'dark' ? 'dark' : 'light',
            },
            after() {
                window.addEventListener('changetheme', function () {
                    const nowtheme = localStorage.getItem('bgColor');
                    Vditor.setContentTheme(nowtheme === 'dark' ? 'dark' : 'light', 'https://unpkg.com/vditor@3.9.0/dist/css/content-theme/');
                });
            },
        });
    }, [md]);
    return (
        <TypographyStylesProvider id={vid} className={'preview'}>
            {/* <div id={vid} className='preview' /> */}
        </TypographyStylesProvider>
    );
}