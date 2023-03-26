import {
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Space,
  Text,
  Timeline,
} from "@mantine/core";
import { IconFileCertificate } from "@tabler/icons";
import React, { useEffect } from "react";
import { Activity } from "../interfaces/activity";
import axios from "axios";

export default function HomePage() {
  const [popularActivities, setPopularActivities] = React.useState<Activity[]>(
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/home/popular")
      .then((res) => {
        setPopularActivities(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

        <Grid>
          <Grid.Col md={8} xs={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>活动列表</Text>
                  <Badge color="red" variant="light">
                    ACTIVITIES
                  </Badge>
                </Group>
              </Card.Section>

              <Grid grow mt="sm">
                {popularActivities.map((x) => (
                  <Grid.Col md={6} key={x.id}>
                    <Card shadow="sm" p="md" radius="md" withBorder>
                      <Card.Section withBorder inheritPadding>
                        <Group position="apart" mt="md" mb="xs">
                          <Text weight={500}>{x.name}</Text>
                        </Group>
                      </Card.Section>
                      <Text mt="md">{x.description}</Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Grid.Col>
          <Grid.Col md={4} xs={0}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>大事件</Text>
                  <Badge color="lime" variant="light">
                    TIMELINE
                  </Badge>
                </Group>
              </Card.Section>

              <Timeline active={-1} bulletSize={36} lineWidth={2} mt="sm">
                <Timeline.Item
                  bullet={<IconFileCertificate size={12} />}
                  title="3月月考"
                >
                  <Text size="xs" mt={4}>
                    2023/3
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  bullet={<IconFileCertificate size={12} />}
                  title="期中考试"
                >
                  <Text size="xs" mt={4}>
                    2023/5
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  title="期末考试"
                  bullet={<IconFileCertificate size={12} />}
                  lineVariant="dashed"
                >
                  <Text size="xs" mt={4}>
                    2023/7
                  </Text>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col md={8} xs={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>活动列表</Text>
                  <Badge color="red" variant="light">
                    ACTIVITIES
                  </Badge>
                </Group>
              </Card.Section>

              <Grid grow mt="sm">
                {popularActivities.map((x) => (
                  <Grid.Col md={6} key={x.id}>
                    <Card shadow="sm" p="md" radius="md" withBorder>
                      <Card.Section withBorder inheritPadding>
                        <Group position="apart" mt="md" mb="xs">
                          <Text weight={500}>{x.name}</Text>
                        </Group>
                      </Card.Section>
                      <Text mt="md">{x.description}</Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Grid.Col>
          <Grid.Col md={4} xs={0}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>大事件</Text>
                  <Badge color="lime" variant="light">
                    TIMELINE
                  </Badge>
                </Group>
              </Card.Section>

              <Timeline active={-1} bulletSize={36} lineWidth={2} mt="sm">
                <Timeline.Item
                  bullet={<IconFileCertificate size={12} />}
                  title="3月月考"
                >
                  <Text size="xs" mt={4}>
                    2023/3
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  bullet={<IconFileCertificate size={12} />}
                  title="期中考试"
                >
                  <Text size="xs" mt={4}>
                    2023/5
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  title="期末考试"
                  bullet={<IconFileCertificate size={12} />}
                  lineVariant="dashed"
                >
                  <Text size="xs" mt={4}>
                    2023/7
                  </Text>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
