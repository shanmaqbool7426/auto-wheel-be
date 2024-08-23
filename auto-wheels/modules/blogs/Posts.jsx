"use client";

import { Box, Card, Flex, Image, Text, Title, Badge } from '@mantine/core';
import React from 'react';
import Link from "next/link"
import BlogPagination from "@/components/blog/pagination"
import { EyeIcon, ViewIcon } from '@/components/Icons';
import { formatDate } from '@/utils/index';

const Posts = ({ title, posts, count, description }) => {
    return (
        <>
            <Title order={2} mb="lg">
                {title}{" "}
                <Text span className="text-primary" inherit>
                    Posts
                </Text>
            </Title>
            {description && <Text className="mb-4" inherit>
                {description}
            </Text>}
            {posts?.length > 0 ? (posts.map((post) => (
                <Card
                    key={post._id}
                    shadow="none"
                    padding="none"
                    className="pb-4 mb-4 card-border-bottom"
                >
                    <Flex align="top" wrap={{ sm: "wrap", md: "nowrap" }}>
                        <Image
                            src={post.imageUrl || "/blogs/recent-placeholder.png"}
                            radius="md"
                            alt={post.title}
                            height={210}
                            width={192}
                        />
                        <Flex gap="xs" direction="column" p="sm" pl="md">
                            <Title fw={600} order={4}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-decoration-none text-dark"
                                >
                                    {post.title}
                                </Link>
                            </Title>
                            <Flex
                                direction="row"
                                c="dimmed"
                                wrap={true}
                                justify="space-between"
                                align="center"
                            >
                                <Box className="left d-flex gap-2">
                                    <Text
                                        span
                                        size="sm"
                                        className="d-flex gap-1 align-items-center"
                                    >
                                        {post.author} <span className="dot"></span>
                                    </Text>
                                    <Text span size="sm">
                                        {formatDate(post.publishDate)}
                                    </Text>
                                    <Text
                                        span
                                        className="d-flex gap-1 align-items-center"
                                        size="sm"
                                    >
                                        <EyeIcon />
                                        {post.viewCount}
                                    </Text>
                                </Box>
                                <Box className="right">
                                    <Text
                                        span
                                        className="d-flex gap-1 align-items-center"
                                        size="sm"
                                    >
                                        <ViewIcon />
                                        10
                                    </Text>
                                </Box>
                            </Flex>
                            <Text lineClamp={4} size="sm">
                                {post.content}
                            </Text>
                        </Flex>
                    </Flex>
                </Card>

            ))
            ) : (
                <Text c="dimmed" align="center" mt="md">
                    No posts available.
                </Text>
            )}
            {posts?.length > 0 && <BlogPagination count={count} />}

        </>
    );
};

export default Posts;
