import React from 'react';
import { Box, Card, Group, Image, Text, Title } from '@mantine/core';
import { formatDate } from '@/utils/index';
import Link from 'next/link';
const PopularPosts = ({ posts }) => {
  const displayedPosts = posts && posts.length > 0 ? posts.slice(0, 6) : [];

  return (
    <Card
      mb="lg"
      shadow="0px 4px 20px 0px #00000014"
      padding="md"
      withBorder
      className="border-light"
    >
      <Title order={5} className="title-with-border" pb="xs" mb="xs">
        Popular Posts
      </Title>

      {displayedPosts.length > 0 ? (
        <>
          <Box className="big-post" pb="md" mb="md">
            <Image
              className="img-fluid w-auto"
              src={displayedPosts[0].imageUrl}
              alt={displayedPosts[0].title}
              mx="auto"
              my="md"
            />
              <Link href={`/blog/${displayedPosts[0].slug}`} className="text-decoration-none text-black">            
            <Title order={5} fw={600}>
              {displayedPosts[0].title}
            </Title>
            </Link>
            <Text c="dimmed" mt="xs">
              {formatDate(displayedPosts[0].publishDate)}
            </Text>
          </Box>

          {displayedPosts?.slice(1).map((post) => (
            <Box className="small-post" pb="md" mb="md" key={post._id}>
              <Group grow>
                <Image
                  className="img-fluid"
                  src={post.imageUrl}
                  alt={post.title}
                />
                <Box>
                <Link href={`/blog/${post.slug}`} className="text-decoration-none text-black">
                  <Title order={6} fw={600}>
                    {post.title}
                  </Title>
                </Link>
                  <Text c="dimmed" mt="5px" size="sm">
                    {formatDate(post.publishDate)}
                  </Text>
                </Box>
              </Group>
            </Box>
          ))}
        </>
      ) : (
        <Text c="dimmed" align="center" mt="md">
          No popular posts available at the moment.
        </Text>
      )}
    </Card>
  );
};

export default PopularPosts;