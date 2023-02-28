import { UnstyledButton, Group, ThemeIcon, Text } from "@mantine/core";
import React from "react";

interface SideLinkProps {
  className?: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function SideLink({
  className,
  icon,
  color,
  label,
  onClick,
}: SideLinkProps) {
  return (
    <UnstyledButton
      className={className}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={onClick}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
