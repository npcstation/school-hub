import { Button, Container, Flex, Footer, Group, Text, rem, useMantineTheme } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconBrandGithub, IconSun, IconMoon } from '@tabler/icons-react';
import React, { useEffect } from 'react';

export function AppFooter({ onThemeChange }: { onThemeChange: () => void }) {
    const theme = useMantineTheme();

    const [displaysStyles, cgDisplaysStyles] = useToggle(['', 'none']);

    useEffect(() => {
        function changeFooter() {
            cgDisplaysStyles();
        }
        window.addEventListener('changeFooter', changeFooter);

        return () => {
            window.removeEventListener('changeFooter', changeFooter);
        };
    }, []);

    return (
        <Footer
            withBorder={false}
            styles={{
                root: {
                    position: 'relative',
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white',
                },
            }}
            fixed={false}
            height='auto'
            p='md'
            style={{
                display: displaysStyles,
            }}
        >
            <Container>
                <Flex justify='space-between' align='center' direction='row'>
                    <div>
                        <Text size={21.5}>在线校园系统</Text>
                        <Text>北京市八一学校 - NPC Station</Text>
                        <Group spacing='xs' mt={rem('4px')} ml={rem('-2px')}>
                            <Button
                                onClick={() => {
                                    location.href = 'https://github.com/npcstation/school-hub';
                                }}
                                leftIcon={<IconBrandGithub size={13} />}
                                variant='light'
                                color='gray'
                                radius='xs'
                                size='xs'
                                compact
                            >
                                Github Repo
                            </Button>
                            <Button
                                onClick={onThemeChange}
                                leftIcon={
                                    <>
                                        <IconSun
                                            size={16}
                                            display={(() => {
                                                if (localStorage.getItem('colorScheme') === 'light') {
                                                    return 'none';
                                                }
                                            })()}
                                        />
                                        <IconMoon
                                            size={16}
                                            display={(() => {
                                                if (localStorage.getItem('colorScheme') === 'dark') {
                                                    return 'none';
                                                }
                                            })()}
                                        />
                                    </>
                                }
                                variant='light'
                                color='gray'
                                radius='xs'
                                size='xs'
                                compact
                            >
                                Change Theme
                            </Button>
                        </Group>
                    </div>
                    <Text>alpha</Text>
                </Flex>
            </Container>
        </Footer>
    );
}
