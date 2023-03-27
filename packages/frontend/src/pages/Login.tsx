import { useToggle, upperFirst, useMediaQuery } from "@mantine/hooks";
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
  Box,
  Popover,
  Progress,
} from "@mantine/core";
import React, { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "包含至少 1 位数字" },
  { re: /[a-z]/, label: "包含至少 1 位小写字母" },
  { re: /[A-Z]/, label: "包含 1 位大写字母（可选）" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "包含特殊符号（可选）" },
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
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ? null : "不符合邮箱规则";
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
    },

    validateInputOnChange: true,
  });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(registerForm.values.password)}
    />
  ));

  const strength = getStrength(registerForm.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const largeScreen = useMediaQuery('(min-width: 512px)');
  return (
    <>
      <Container>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500} mb="sm">
            欢迎来到在线校园，请您{type}：
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

                <Box mx="0">
                  <Popover
                    opened={popoverOpened}
                    position="bottom-start"
                    width={largeScreen ? "20rem" : "target"}
                    transitionProps={{ transition: "pop" }}
                  >
                    <Popover.Target>
                      <div
                        onFocusCapture={() => setPopoverOpened(true)}
                        onBlurCapture={() => setPopoverOpened(false)}
                      >
                        <PasswordInput
                          required
                          label="密码"
                          placeholder="您的密码（要保密！）"
                          radius="md"
                          {...registerForm.getInputProps("password")}
                        />
                      </div>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Progress
                        color={color}
                        value={strength}
                        size={5}
                        mb="xs"
                      />
                      <PasswordRequirement
                        label="至少 8 位密码"
                        meets={registerForm.values.password.length >= 8}
                      />
                      <PasswordRequirement
                        label="至多 36 位密码"
                        meets={registerForm.values.password.length <= 36}
                      />
                      {checks}
                    </Popover.Dropdown>
                  </Popover>
                </Box>

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
