import { AppShell, Footer, Text } from "@mantine/core";
import { IconUsers, IconHome } from "@tabler/icons";
import React from "react";
import { Outlet } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";

interface RootProps {
  onThemeChange: () => void;
}

export function Root({ onThemeChange }: RootProps) {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
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
        <MainHeader
          links={[
            {
              icon: <IconHome size={18} />,
              color: "blue",
              link: "/",
              label: "主页",
            },
            {
              icon: <IconUsers size={18} />,
              color: "lime",
              link: "/forum",
              label: "论坛",
            },
          ]}
          onThemeChange={onThemeChange}
        ></MainHeader>
      }
    >
      <Outlet />
    </AppShell>
  );
}
