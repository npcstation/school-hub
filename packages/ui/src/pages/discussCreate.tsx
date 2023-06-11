import { Button, Container, Card, Grid, Input, Space, TextInput, Text, createStyles } from '@mantine/core';
import React, { useState } from 'react';
import { NoStyleCard, StandardCard } from '../components/card';
import { VditorProvider, VditorThemeChangeProvider } from '../components/editor';
import Vditor from 'vditor';
import { standardTitleColor } from '../styles/color';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = createStyles((theme) => ({}));

export function DiscussCreatePage() {
    const [contentVditor, setContentVditor] = useState({});
    const { theme } = useStyles();
    
    return (
        <>
            <Container>
                {/* <Alert  icon={<IconAlertCircle size='1rem' />} title='注意' color='red'>
                    无权限发送
                </Alert> */}
                <Space h={1} />
                <NoStyleCard style={{ backgroundImage: 'linear-gradient(45deg, #ff9a9e50 0%, #fad0c450 99%, #fad0c450 100%)' }}>
                    <Text size='sm' weight={300} c={standardTitleColor(theme)}>
                        您的讨论将会发表在
                    </Text>
                    <Space h={1} />
                    <Text size='lg' weight={700} c={standardTitleColor(theme)}>
                        灌水区
                    </Text>
                    <Text ta={'right'} size='xs' weight={300} c={standardTitleColor(theme)}>
                        点击本卡片更换
                    </Text>
                </NoStyleCard>
                <Space h={10}></Space>
                <NoStyleCard>
                    {/* <Text size='md' weight={700} c={standardTitleColor(theme)}>
                        创建讨论
                    </Text> */}
                    <form>
                        {/* <Space h={10} /> */}
                        {/* <Grid>
                            <Grid.Col span={4}>
                                <TextInput size='xs' variant='filled' name='topic' required={true} placeholder='讨论主题' />
                            </Grid.Col>
                        </Grid> */}
                        {/* <Space h={1} /> */}
                        <TextInput mt={-10} size='xl' variant='unstyled' name='title' required={true} placeholder='请输入讨论标题' />

                        {/* <Grid>
                            <Grid.Col span={8}>
                                <TextInput size='xl' variant='unstyled' name='title' required={true} placeholder='讨论标题' />
                            </Grid.Col>
                            <Grid.Col span={4}></Grid.Col>
                        </Grid> */}
                        <Input.Wrapper
                            id='content'
                            description='*正文部分, 支持markdown语法'
                            required={true}
                            inputWrapperOrder={['input', 'description', 'label', 'error']}
                        >
                            <Space h={4} />
                            <VditorProvider fontLimit={3000} minHeight={300} id='create-vditor' setVd={setContentVditor} />
                            <VditorThemeChangeProvider vditor={contentVditor as Vditor} />
                        </Input.Wrapper>

                        <Space h={10} />
                        <Button
                            className='shadowButton'
                            type='submit'
                            radius={'xl'}
                        >
                            发起讨论
                        </Button>
                    </form>
                </NoStyleCard>
            </Container>
        </>
    );
}