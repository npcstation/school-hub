import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  Burger,
  Footer,
  Text,
  MediaQuery,
  useMantineTheme,
  ActionIcon,
  Title,
  ColorScheme,
  Button,
  Space,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IconHome, IconMoon, IconSun, IconUsers } from "@tabler/icons";
import { useRouter } from "next/router";
import { wrapper } from "@/store/store";
import { SideLink } from "./_components/sideLink";
import { Provider } from "react-redux";

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  var [colorScheme, setColorScheme] = useState("light");
  useEffect(() => {
    if (localStorage.getItem("colorScheme") === null) {
      localStorage.setItem("colorScheme", "light");
      setColorScheme("light");
    } else {
      if (localStorage.getItem("colorScheme") !== colorScheme) {
        setColorScheme(localStorage.getItem("colorScheme")!);
      }
    }
  }, [colorScheme]);

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  function onThemeChange() {
    if (colorScheme === "light") {
      setColorScheme("dark");
      if (typeof window !== "undefined") {
        localStorage.setItem("colorScheme", "dark");
      }
    } else {
      setColorScheme("light");
      if (typeof window !== "undefined") {
        localStorage.setItem("colorScheme", "light");
      }
    }
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Open Sans, sans serif",
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
            colorScheme: colorScheme as ColorScheme,
          }}
        >
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
                  <SideLink
                    icon={<IconHome size={18} />}
                    color="blue"
                    label="主页"
                    onClick={() => router.push("/")}
                  ></SideLink>
                </Navbar.Section>
                <Navbar.Section>
                  <SideLink
                    icon={<IconUsers size={18} />}
                    color="lime"
                    label="论坛"
                    onClick={() => router.push("/forum")}
                  ></SideLink>
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

                  <Title order={3}>
                    在线校园
                  </Title>
                  <ActionIcon variant="light" onClick={onThemeChange}>
                    <IconSun
                      size={16}
                      display={(() => {
                        if (colorScheme === "light") {
                          return "none";
                        }
                      })()}
                    />
                    <IconMoon
                      size={16}
                      display={(() => {
                        if (colorScheme === "dark") {
                          return "none";
                        }
                      })()}
                    />
                  </ActionIcon>
                </div>
              </Header>
            }
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </Provider>
    </>
  );
};

export default App;
