import { useToggle, upperFirst, useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Checkbox,
    Anchor,
    Stack,
    Container,
    Box,
    Popover,
    Progress,
    Select,
    Switch,
	useMantineTheme,
	Badge,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTheme } from '@emotion/react';
import { StandardCard } from '../components/Card';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text color={meets ? 'teal' : 'red'} sx={{ display: 'flex', alignItems: 'center' }} mt={7} size='sm'>
            {meets ? <IconCheck size='0.9rem' /> : <IconX size='0.9rem' />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: '包含至少 1 位数字' },
    { re: /[a-z]/, label: '包含至少 1 位小写字母' },
    { re: /[A-Z]/, label: '包含 1 位大写字母（可选）' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: '包含特殊符号（可选）' },
];

function getStrength(password: string) {
    let multiplier = password.length >= 8 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function LoginPage(props: PaperProps) {
	const [type, toggle] = useToggle(['登录', '注册']);
	const theme = useMantineTheme();
    const registerForm = useForm({
        initialValues: {
            email: '',
            grade: '2007',
            name: '',
            password: '',
            gender: 'male',
            terms: true,
        },

        validate: {
            email: (val) => {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ? null : '不符合邮箱规则';
            },
            name: (val) => {
                if (val.length < 4) {
                    return '用户名需要至少 4 位！';
                } else if (val.length > 36) {
                    return '用户名最多只能 36 位！';
                } else {
                    return;
                }
            },
        },

        validateInputOnChange: true,
    });

    const [popoverOpened, setPopoverOpened] = useState(false);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(registerForm.values.password)} />
    ));

    const strength = getStrength(registerForm.values.password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const loginForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const currDate = new Date();
    const minBirthYear = currDate.getFullYear() - (currDate.getMonth() + 1 < 9 ? 18 : 17);

    const largeScreen = useMediaQuery('(min-width: 512px)');
    return (
        <Container w={'50%'}>
            <StandardCard
                title=''
                content={
                    <>
                        <Text size='lg' weight={700} c={theme.colorScheme === 'dark' ? 'white' : theme.colors.gray[7]} mb='sm'>
                            {type}
                        </Text>

                        {type === '注册' ? (
                            <form
                                onSubmit={registerForm.onSubmit(() => {
                                    console.log(114514);
                                })}
                            >
                                <Stack>
                                    <TextInput required={type === '注册'} label='用户名' placeholder='您的用户名' {...registerForm.getInputProps('name')} />

                                    <TextInput required label='邮箱' placeholder='hello@bjbybbs.com' {...registerForm.getInputProps('email')} />

                                    <Select
                                        data={[
                                            {
                                                label: `一年级 (${minBirthYear + 11})`,
                                                value: `${minBirthYear + 11}`,
                                            },
                                            {
                                                label: `二年级 (${minBirthYear + 10})`,
                                                value: `${minBirthYear + 10}`,
                                            },
                                            {
                                                label: `三年级 (${minBirthYear + 9})`,
                                                value: `${minBirthYear + 9}`,
                                            },
                                            {
                                                label: `四年级 (${minBirthYear + 8})`,
                                                value: `${minBirthYear + 8}`,
                                            },
                                            {
                                                label: `五年级 (${minBirthYear + 7})`,
                                                value: `${minBirthYear + 7}`,
                                            },
                                            {
                                                label: `六年级 (${minBirthYear + 6})`,
                                                value: `${minBirthYear + 6}`,
                                            },
                                            {
                                                label: `初一年级 (${minBirthYear + 5})`,
                                                value: `${minBirthYear + 5}`,
                                            },
                                            {
                                                label: `初二年级 (${minBirthYear + 4})`,
                                                value: `${minBirthYear + 4}`,
                                            },
                                            {
                                                label: `初三年级 (${minBirthYear + 3})`,
                                                value: `${minBirthYear + 3}`,
                                            },
                                            {
                                                label: `高一年级 (${minBirthYear + 2})`,
                                                value: `${minBirthYear + 2}`,
                                            },
                                            {
                                                label: `高二年级 (${minBirthYear + 1})`,
                                                value: `${minBirthYear + 1}`,
                                            },
                                            {
                                                label: `高三年级 (${minBirthYear})`,
                                                value: `${minBirthYear}`,
                                            },
                                        ]}
                                        searchable
                                        required
                                        label='年级'
                                        {...registerForm.getInputProps('grade')}
                                    />

                                    <Select
                                        data={[
                                            {
                                                label: '男',
                                                value: 'male',
                                            },
                                            {
                                                label: '女',
                                                value: 'female',
                                            },
                                        ]}
                                        required
                                        label='性别'
                                        {...registerForm.getInputProps('gender')}
                                    />

                                    <Box mx='0'>
                                        <Popover
                                            opened={popoverOpened}
                                            position='bottom-start'
                                            width={largeScreen ? '20rem' : 'target'}
                                            transitionProps={{ transition: 'pop' }}
                                        >
                                            <Popover.Target>
                                                <div onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
                                                    <PasswordInput
                                                        required
                                                        label='密码'
                                                        placeholder='您的密码（要保密！）'
                                                        {...registerForm.getInputProps('password')}
                                                    />
                                                </div>
                                            </Popover.Target>
                                            <Popover.Dropdown>
                                                <Progress color={color} value={strength} size={5} mb='xs' />
                                                <PasswordRequirement label='至少 8 位密码' meets={registerForm.values.password.length >= 8} />
                                                <PasswordRequirement label='至多 36 位密码' meets={registerForm.values.password.length <= 36} />
                                                {checks}
                                            </Popover.Dropdown>
                                        </Popover>
                                    </Box>

                                    <Checkbox
                                        required={type === '注册'}
                                        label='我同意用户条款'
                                        checked={registerForm.values.terms}
                                        {...registerForm.getInputProps('terms')}
                                    />
                                </Stack>

                                <Group position='apart' mt='xl'>
                                    <Anchor component='button' type='button' color='dimmed' onClick={() => toggle()} size='xs'>
                                        {type === '注册' ? '已经有账号了? 点这里登录' : '还没有账号吗? 点这里注册'}
                                    </Anchor>
                                    <Button type='submit' radius='xl'>
                                        {upperFirst(type)}
                                    </Button>
                                </Group>
                            </form>
                        ) : (
                            <form
                                onSubmit={loginForm.onSubmit(() => {
                                    console.log(114514);
                                })}
                            >
                                <Stack>
                                    <TextInput required label='邮箱' placeholder='hello@bjbybbs.com' {...loginForm.getInputProps('email')} />

                                    <PasswordInput required label='密码' placeholder='您的密码（要保密！）' {...loginForm.getInputProps('password')} />
                                </Stack>

                                <Group position='apart' mt='xl'>
                                    <Anchor component='button' type='button' color='dimmed' onClick={() => toggle()} size='xs'>
                                        {type === '注册' ? '已经有账号了? 点这里登录' : '还没有账号吗? 点这里注册'}
                                    </Anchor>
                                    <Button type='submit' radius='xl'>
                                        {upperFirst(type)}
                                    </Button>
                                </Group>
                            </form>
                        )}
                    </>
                }
            />
        </Container>
    );
}
