"use client"
import React from 'react';
import { Card, Grid, Stack, Text, Title } from '@mantine/core';
import { FacebookCircle, YoutubeCircle, InstagramCircle } from "@/components/Icons";

const socialMediaStats = [
  {
    icon: FacebookCircle,
    count: 563,
    label: "Fans",
  },
  {
    icon: YoutubeCircle,
    count: "20,100",
    label: "Subscribers",
  },
  {
    icon: InstagramCircle,
    count: 563,
    label: "Followers",
  },
];

const FollowUs = () => {
  return (
    <Card
      shadow="0px 4px 20px 0px #00000014"
      padding="md"
      mb="lg"
      withBorder
      className="border-light"
    >
      <Title
        order={5}
        className="title-with-border"
        pb="xs"
        mb="xs"
      >
        Follow Us
      </Title>
      <Grid mt="md">
        {socialMediaStats.map(({ icon: Icon, count, label }, index) => (
          <Grid.Col key={index} span={4}>
            <Stack align="center" justify="center" gap="0">
              <Icon />
              <Text fw={600} mt="xs" c="#222222">
                {count}
              </Text>
              <Text size="sm" c="#222222">
                {label}
              </Text>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
};

export default FollowUs;
