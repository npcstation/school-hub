import React from 'react';
import Vditor from 'vditor';
import { TypographyStylesProvider, useMantineTheme } from '@mantine/core';

interface MarkdownRenderProp {
    md: string;
    vid: string;
}

export function MarkdownFirstChange(md: string) {
    console.log(md.replaceAll(`\[heimu\](.*?)\[\/heimu\]`, `<div class='heimu'>$1</div>`));
    return md.replaceAll(/\[heimu\](.*?)\[\/heimu\]/g, `<span class='heimu'>$1</span>`);
}

export function MarkdownRender({ md, vid }: MarkdownRenderProp) {
    const theme = useMantineTheme();
    React.useEffect(() => {
        const previewElement = document.getElementById(vid);
        Vditor.preview(previewElement as HTMLDivElement, MarkdownFirstChange(md), {
            // cdn: "",
            mode: 'light',
            renderers: {
                renderHeading: (node, entering) => {
                    if (entering) {
                    return [`<h${node.__internal_object__.HeadingLevel}><span>`, Lute.WalkContinue];
                    } else {
                    return [`</span></h${node.__internal_object__.HeadingLevel}><div class='endheading'></div>`, Lute.WalkContinue];
                    }
                }
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
