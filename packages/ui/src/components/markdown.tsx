import React from 'react';
import Vditor from 'vditor';
import { TypographyStylesProvider, useMantineTheme } from '@mantine/core';

interface MarkdownRenderProp {
    md: string;
    vid: string;
}

export function MarkdownRender({ md, vid }: MarkdownRenderProp) {
    const theme = useMantineTheme();
    React.useEffect(() => {
        const previewElement = document.getElementById(vid);
        Vditor.preview(previewElement as HTMLDivElement, md, {
            // cdn: "",
            mode: 'light',
            renderers: {

            },
            theme: {
                current: theme.colorScheme === 'dark' ? 'dark' : 'light',
            },
            after() {
                const setItemEvent = new Event(`${vid}-render-done`);
                window.dispatchEvent(setItemEvent);
                window.addEventListener('changetheme', function() {
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
