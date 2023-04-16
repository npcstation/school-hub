import {
    Badge,
    Card,
    Container,
    Group,
    Space,
    Text,
  } from "@mantine/core";
  import React from "react";
  
  export default function ForumPage() {
    return (
      <>
        <Container>
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Card.Section withBorder inheritPadding>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Welcome there!</Text>
                <Badge color="blue" variant="light">
                  PREPARING
                </Badge>
              </Group>
            </Card.Section>
  
            <Text size="sm" color="dimmed" mt="md">
              欢迎！既然能找到这里，说明这是计划的一部分。
            </Text>
          </Card>
          <Space h="md" />
        </Container>
      </>
    );
  }
  