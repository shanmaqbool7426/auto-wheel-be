"use client";

import React from 'react';
import { Box, Card, Flex, Image, Title, Text, Badge } from '@mantine/core';
import { formatDate } from '@/utils/index';
import Link from 'next/link';

const CategoryPosts = ({ category }) => {
  if (!category?.blogs || category?.blogs?.length === 0) {
    return (
      <Text align="center" c="dimmed">
        No posts available in this category.
      </Text>
    );
  }

  return (
    <Box className="row">
      <Title order={2} mb="lg">
        {category.category}
      </Title>

      <Box className="row">
        {category.blogs.map((blog) => (
          <Box className="col-md-3" key={blog._id}>
            <Card padding="none" mb="xl">
              <Card.Section className="position-relative">
              <Link href={`/blog/${category.slug}`}>
                <Badge
                  bg="#E90808"
                  c="white"
                  radius="sm"
                  size="lg"
                  className="position-absolute bottom-0"
                >
                  {category.category}
                </Badge>
              </Link>
                <Image
                  src={blog.imageUrl || "/blogs/img-large.png"}
                  alt={blog.title}
                  radius="md"
                  height={210}
                />
              </Card.Section>
              <Link href={`/blog/${category.slug}`} className='text-decoration-none text-black'>
              <Title order={5} fw={600} lineClamp={2} mt="md">
                {blog.title}
              </Title>
              </Link>
              <Flex gap="sm" mt="5">
                <Text span fw={400} className="d-flex gap-1 align-items-center">
                  {blog.author} <span className="dot"></span>
                </Text>
                <Text span>
                    {formatDate(blog.publishDate)}
                </Text>
              </Flex>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryPosts;
