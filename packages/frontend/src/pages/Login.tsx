import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
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
} from "@mantine/core";
import React from "react";

export default function LoginPage(props: PaperProps) {
  const [type, toggle] = useToggle(["登录", "注册"]);
  const registerForm = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => {
        return /^\S+@\S+$/.test(val) ? null : "不符合邮箱规则";
      },
      name: (val) => {
        if (val.length < 4) {
          return "用户名需要至少 4 位！";
        } else if (val.length > 36) {
          return "用户名最多只能 36 位！";
        } else {
          return;
        }
      },
      password: (val) => {
        if (val.length < 8) {
          return "密码需要至少 8 位！";
        } else if (val.length > 36) {
          return "密码最多只能 36 位！";
        } else if (!/(?=.*[0-9])(?=.*[a-zA-Z]).*/.test(val)) {
          return "密码需要数字与字母混合！";
        } else {
          return;
        }
      },
    },

    validateInputOnChange: true,
  });

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Container>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500} mb="sm">
            欢迎来到 在线校园，请您{type}：
          </Text>

          {type === "注册" ? (
            <form
              onSubmit={registerForm.onSubmit(() => {
                console.log(114514);
              })}
            >
              <Stack>
                <TextInput
                  required={type === "注册"}
                  label="用户名"
                  placeholder="您的用户名"
                  radius="md"
                  {...registerForm.getInputProps("name")}
                />

                <TextInput
                  required
                  label="邮箱"
                  placeholder="hello@bjbybbs.com"
                  radius="md"
                  {...registerForm.getInputProps("email")}
                />

                <PasswordInput
                  required
                  label="密码"
                  placeholder="您的密码（要保密！）"
                  radius="md"
                  {...registerForm.getInputProps("password")}
                />

                <Checkbox
                  required={type === "注册"}
                  label="我同意用户条款"
                  checked={registerForm.values.terms}
                  {...registerForm.getInputProps("terms")}
                />
              </Stack>

              <Group position="apart" mt="xl">
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  onClick={() => toggle()}
                  size="xs"
                >
                  {type === "注册"
                    ? "已经有账号了? 点这里登录"
                    : "还没有账号吗? 点这里注册"}
                </Anchor>
                <Button type="submit" radius="xl">
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
                <TextInput
                  required
                  label="邮箱"
                  placeholder="hello@bjbybbs.com"
                  radius="md"
                  {...loginForm.getInputProps("email")}
                />

                <PasswordInput
                  required
                  label="密码"
                  placeholder="您的密码（要保密！）"
                  radius="md"
                  {...loginForm.getInputProps("password")}
                />
              </Stack>

              <Group position="apart" mt="xl">
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  onClick={() => toggle()}
                  size="xs"
                >
                  {type === "注册"
                    ? "已经有账号了? 点这里登录"
                    : "还没有账号吗? 点这里注册"}
                </Anchor>
                <Button type="submit" radius="xl">
                  {upperFirst(type)}
                </Button>
              </Group>
            </form>
          )}
        </Paper>
      </Container>
    </>
  );
}
