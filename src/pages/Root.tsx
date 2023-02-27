import {
  AppShell,
  Navbar,
  Footer,
  Header,
  MediaQuery,
  Burger,
  Title,
  ActionIcon,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconUsers, IconSun, IconMoon, IconHome } from "@tabler/icons";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { SideLink } from "../components/SideLink";

interface RootProps {
  onThemeChange: () => void;
}

export function Root({ onThemeChange }: RootProps) {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section>
            <NavLink to={""}>
              <SideLink
                icon={<IconHome size={18} />}
                color="blue"
                label="主页"
              ></SideLink>
            </NavLink>
          </Navbar.Section>
          <Navbar.Section>
            <NavLink to={"forum"}>
              <SideLink
                icon={<IconUsers size={18} />}
                color="lime"
                label="论坛"
              ></SideLink>
            </NavLink>
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text>© 北京市八一学校 - NPC 信息社</Text>
            <Text>Alpha Version</Text>
          </div>
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>

            <Title order={3}>在线校园</Title>
            <ActionIcon variant="light" onClick={onThemeChange}>
              <IconSun
                size={16}
                display={(() => {
                  if (localStorage.getItem("colorScheme") === "light") {
                    return "none";
                  }
                })()}
              />
              <IconMoon
                size={16}
                display={(() => {
                  if (localStorage.getItem("colorScheme") === "dark") {
                    return "none";
                  }
                })()}
              />
            </ActionIcon>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
