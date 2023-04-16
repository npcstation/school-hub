import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Title,
  Paper,
  Collapse,
  Button,
  Text,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { SideLink } from "./SideLink";
import { Link } from "react-router-dom";
import { IconSun, IconMoon } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface MainHeaderProps {
  links: {
    icon: React.ReactNode;
    color: string;
    link: string;
    label: string;
  }[];
  onThemeChange: () => void;
}

export function MainHeader({ links, onThemeChange }: MainHeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const headerItems = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      onClick={() => {
        setActive(link.link);
      }}
    >
      <Button
        leftIcon={link.icon}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        variant="light"
      >
        <Text>{link.label}</Text>
      </Button>
    </Link>
  ));

  const burgerItems = links.map((link) => (
    <Link key={link.label} to={link.link}>
      <SideLink
        color={link.color}
        icon={link.icon}
        onClick={() => {
          setActive(link.link);
        }}
        label={link.label}
      ></SideLink>
    </Link>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Title order={3}>在线校园</Title>
        <Group spacing={10} className={classes.links}>
          {headerItems}
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
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
      <Collapse className={classes.burger} in={opened} p="sm">
        <Paper>
          {burgerItems}
          <Container pb="sm">
            <ActionIcon
              size={32}
              variant="light"
              onClick={onThemeChange}
              style={{
                margin: "0 auto",
              }}
            >
              <IconSun
                size={24}
                display={(() => {
                  if (localStorage.getItem("colorScheme") === "light") {
                    return "none";
                  }
                })()}
              />
              <IconMoon
                size={24}
                display={(() => {
                  if (localStorage.getItem("colorScheme") === "dark") {
                    return "none";
                  }
                })()}
              />
            </ActionIcon>
          </Container>
        </Paper>
      </Collapse>
    </Header>
  );
}
