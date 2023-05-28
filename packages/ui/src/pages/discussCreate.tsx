import { Button, Container, Input, Space, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { StandardCard } from '../components/card';
import { VditorProvider, VditorThemeChangeProvider } from '../components/editor';
import Vditor from 'vditor';

export function DiscussCreatePage() {
    const [contentVditor, setContentVditor] = useState({});
    return (
        <>
            <Container>
                {/* <Alert  icon={<IconAlertCircle size='1rem' />} title='注意' color='red'>
                    无权限发送
                </Alert> */}
                <Space h={10} />
                <StandardCard title='创建讨论'>
                    <form>
                        <TextInput name='title' required={true} label='标题' placeholder='讨论标题' />
                        <Input.Wrapper id='content' required={true} label='正文' description='支持markdown语法'>
                            <Space h={4} />
                            <VditorProvider fontLimit={3000} minHeight={300} id='reply-vditor' setVd={setContentVditor} />
                            <VditorThemeChangeProvider vditor={contentVditor as Vditor} />
                        </Input.Wrapper>
                        <Space h={10} />
                        <Button type='submit'>发布</Button>
                    </form>
                </StandardCard>
            </Container>
        </>
    );
}