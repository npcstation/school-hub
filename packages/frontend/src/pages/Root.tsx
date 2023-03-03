import { AppShell, Footer, Text } from "@mantine/core";
import { IconUsers, IconHome } from "@tabler/icons";
import React from "react";
import { Outlet } from "react-router-dom";
import { AdvancedHeader } from "../components/AdvancedHeader";

interface RootProps {
  onThemeChange: () => void;
}

export function Root({ onThemeChange }: RootProps) {
  return (
    <AppShell
      styles={{ main: { minHeight: "calc(100vh - 210px)" } }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      footer={
        <Footer styles={{root: {position: "relative"}}} fixed={false} height={60} p="md">
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
        <AdvancedHeader
          user={{
            name: "Username",
            image: "/akarin.webp",
          }}
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
        ></AdvancedHeader>
      }
    >
      <Outlet />
    </AppShell>
  );
}
