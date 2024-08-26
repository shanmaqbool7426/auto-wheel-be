"use client";

import { Box, Card, Flex, Grid, Image, Title, Text, Badge } from '@mantine/core';
import React from 'react';
import { EyeIcon, ViewIcon } from '@/components/Icons';
import Link from 'next/link';
import { formatDate } from '@/utils/index';

const TopCategory = ({ category }) => {
  let posts = category?.blogs || [];
  let title = category?.category || "Category";

  if (!posts || posts.length === 0) {
    return (
      <Text align="center" c="dimmed">
        No posts available.
      </Text>
    );
  }

  const largePost = posts[0];
  const smallPosts = posts.slice(1);

  return (
    <>
      <Title order={2} my="xl">
        Top
        <Link href={`/blog/${category?.slug?category?.slug:''}`} className='text-decoration-none'>        
        <Text span className="text-primary" inherit>
          {" "}
          {title}
        </Text>
        </Link>
      </Title>

      {/* Large Post */}
      <Box className="article-large" component="article">
        <Card padding="none">
          <Card.Section className="position-relative">
            <Link href={`/blog/${largePost.categoryDetails?.slug}`}>
              <Badge
                bg="#E90808"
                c="white"
                radius="sm"
                size="xl"
                className="position-absolute bottom-0"
              >
                {largePost.categoryDetails?.name || "CATEGORY"}
              </Badge>
            </Link>
            <Image
              src={largePost.imageUrl || "/blogs/img-large.png"}
              radius="md"
              alt={largePost.title}
              className="img-fluid"
            />
          </Card.Section>
          <Flex gap="xs" direction="column" mt="md">
            <Title fw={600} order={4}>
              <Link href={`/blog/${largePost.slug}`} className="text-decoration-none text-dark">
                {largePost.title}
              </Link>
            </Title>
            <Flex direction="row" c="dimmed" wrap={true} justify="space-between" align="center">
              <Box className="left d-flex gap-2">
                <Text span size="sm" className="d-flex gap-1 align-items-center">
                  {largePost.author} <span className="dot"></span>
                </Text>
                <Text span size="sm">
                  {formatDate(largePost.publishDate)}
                </Text>
                <Text span className="d-flex gap-1 align-items-center" size="sm">
                  <EyeIcon />
                  {largePost.viewCount}
                </Text>
              </Box>
              <Box className="right">
                <Text span className="d-flex gap-1 align-items-center" size="sm">
                  <ViewIcon />
                  10
                </Text>
              </Box>
            </Flex>
            <Text lineClamp={4} size="sm">
              {largePost.content}
            </Text>
          </Flex>
        </Card>
      </Box>
      {/* Large Post */}

      {/* Two Cols Grid Posts */}
      {smallPosts.length > 0 && (
        <Grid mt="xl">
          {smallPosts.map((post) => (
            <Grid.Col span={6} key={post._id}>
              <Flex>
                <Image
                  src={post.imageUrl || "/blogs/blog-sm.png"}
                  width={100}
                  height={100}
                  radius="sm"
                  alt={post.title}
                />
                <Box pl="md">
                  <Title order={5} fw={600}>
                    <Link href={`/blog/${post.slug}`} className="text-decoration-none text-dark">
                      {post.title}
                    </Link>
                  </Title>
                  <Text c="dimmed">
                    {formatDate(post.publishDate)}
                  </Text>
                </Box>
              </Flex>
            </Grid.Col>
          ))}
        </Grid>
      )}
      {/* Two Cols Grid Posts */}
    </>
  );
};

export default TopCategory;
