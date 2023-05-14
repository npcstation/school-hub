import { useEffect } from 'react';
import React from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { createStyles } from '@mantine/core';
import { IconArrowsMaximize, IconBold, IconBoxModel, IconHeading, IconInfoCircle, IconItalic, IconMoodHappy } from '@tabler/icons-react';
// import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import '../assets/vditor.css'
import { Modal, Text, TypographyStylesProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = createStyles((theme) => ({
    
}));

// interface BlockSuitEditorProps {
//     title?: string;
//     content?: string;
//     hint?: string;
// }

// declare global {
//     // eslint-disable-next-line @typescript-eslint/no-namespace
//     namespace JSX {
//         interface IntrinsicElements {
//             'simple-affine-editor': {id: string};
//         }
//     }
// }


interface VditorRegisterProp {
    minHeight?: number,
    content?: string,
    id: string,
    setVd: (vditor: Vditor) => void
}

interface VditorThemeChangeProviderProp {
    vditor: Vditor
}

export function VditorThemeChangeProvider({vditor}: VditorThemeChangeProviderProp) {
    
    useEffect(() => {
        function handleThemeChange() {
            console.log('ee');
            const nowTheme = localStorage.getItem('colorScheme') as string;
            vditor.setTheme(nowTheme === 'dark' ? 'dark' : 'classic', nowTheme);
        }
        console.log('Register');
        window.addEventListener('changeTheme', handleThemeChange);
        return () => {
            console.log('delete ');
            window.removeEventListener('changeTheme', handleThemeChange);
        }
    }, [vditor]);
    return <></>;
}

export function VditorProvider({ id, minHeight, content, setVd }: VditorRegisterProp) {
    const { theme } = useStyles();

    const [infoModalStatus, { open, close }] = useDisclosure(false);

    useEffect(() => {
        const vditor = new Vditor(id, {
            theme: theme.colorScheme === 'dark' ? 'dark' : 'classic',
            counter: {
                enable: true,
                max: 500,
                type: 'text'
            },
            toolbar: [
                {
                    name: 'headings',
                    icon: ReactDOMServer.renderToString(<IconHeading />),
                },
                {
                    name: 'bold',
                    icon: ReactDOMServer.renderToString(<IconBold />),
                },
                {
                    name: 'italic',
                    icon: ReactDOMServer.renderToString(<IconItalic />),
                },
                {
                    name: 'emoji',
                    icon: ReactDOMServer.renderToString(<IconMoodHappy />),
                },
                {
                    name: 'fullscreen',
                    icon: ReactDOMServer.renderToString(<IconArrowsMaximize />),
                },
                {
                    name: 'edit-mode',
                    icon: ReactDOMServer.renderToString(<IconBoxModel />),
                    className: 'divBR',
                },
                {
                    name: '',
                    tip: '关于 & 帮助',
                    icon: ReactDOMServer.renderToString(<IconInfoCircle />),
                    click() {
                        open();
                    },
                    tipPosition: 'n',
                },
            ],
            preview: {
                theme: {
                    current: theme.colorScheme,
                },
                actions: [],
                transform(html) {
                    const JSXHTML = (
                        <TypographyStylesProvider>
                            <div style={{ fontSize: 12 }} dangerouslySetInnerHTML={{ __html: html }} />
                        </TypographyStylesProvider>
                    );
                    return ReactDOMServer.renderToString(JSXHTML);
                },
                markdown: {
                    mark: true,
                },
            },
            mode: 'ir',
            minHeight,
            after: () => {
                setVd(vditor);
                vditor.setValue(content || '');
            },
        });
    }, [])
    return (
        <>
            <Modal
                opened={infoModalStatus}
                title={
                    <>
                        <Text weight={200}>关于 & 帮助</Text>
                    </>
                }
                onClose={close}
                centered
                lockScroll={false}
            >
                <Text size={14} pb={5}>
                    该编辑器使用 Markdown 语法。
                    <br />
                    若您需要其他编辑器可以在设置中调整。
                </Text>
                <Text color={theme.colors.gray[7]} size={10}>
                    本项目 Markdown 编辑器部分由 Vditor.js 提供。
                </Text>
            </Modal>
            <div className='vditor' id={id} />
        </>
    );
}