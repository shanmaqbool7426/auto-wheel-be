"use client";

import { Badge, Card, Group, Title, Text } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
const PopularTags = ({ tags }) => {
    const hasTags = tags?.data && tags.data.length > 0;

    return (
        <Card
            shadow="0px 4px 20px 0px #00000014"
            padding="md"
            withBorder
            className="border-light"
        >
            <Title order={5} className="title-with-border" pb="xs" mb="xs">
                Popular Tags
            </Title>

            {hasTags ? (<Group my="sm" gap="xs">
                {
                    (tags?.data.map((tag) => (
                        <Link href={`/blog/tag/${tag?.slug}`}>
                        <Badge
                            key={tag?.id}
                            variant="light"
                            size="lg"
                            fw={500}
                            c="#222222"
                            p="md"
                            bg="#F3F3F3"
                        >
                            {tag.name}
                        </Badge>
                        </Link>
                    )))}
            </Group>)
                : (
                    <Text c="dimmed" align="center" mt="md">
                        No popular tags available at the moment.
                    </Text>
                )}
        </Card>
    );
};

export default PopularTags;