import { Button, Container, Flex, Footer, Group, Text, useMantineTheme } from '@mantine/core';
import { IconBrandGithub, IconSun, IconMoon } from '@tabler/icons-react';
import React from 'react';

export function AppFooter({ onThemeChange }: { onThemeChange: () => void }) {
    const theme = useMantineTheme();

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
        >
            <Container>
                <Flex justify='space-between' align='center' direction='row'>
                    <div>
                        <Text size={21.5}>在线校园系统</Text>
                        <Text>北京市八一学校 - NPC Station</Text>
                        <Group spacing='xs' mt='4px' ml='-2px'>
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
