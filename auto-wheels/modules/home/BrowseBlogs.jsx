import {
  Anchor,
  Box,
  Center,
  Flex,
  Text,
  Title,
  BackgroundImage,
  rem,
  Group,
  Image,
  Grid,
  SimpleGrid,
} from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const BrowseBlogs = () => {
  return (
    <section className="blogs py-5 bg-light">
      <div className="container">
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={2}>
            Our Latest{" "}
            <Text span c="#E90808" inherit>
              Blogs
            </Text>
          </Title>
          <Anchor component={Link} href="#" c="#E90808">
            Read all Blogs
          </Anchor>
        </Flex>
        <Grid>
          <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
            <Box
              w="100%"
              h={{ base: 300, lg: "100%" }}
              className="position-relative"
              // component={Anchor}
              // href="#"
            >
              <BackgroundImage src="/blogs/blogs-1.png" radius="sm" h="100%">
                <Flex p="xl" w="100%" className="position-absolute bottom-0">
                  <Text fw={600} size={rem(24)} c="white">
                    2017 Mercedes-Benz E-Class Coupe review
                  </Text>
                </Flex>
              </BackgroundImage>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <>
                  <article className="article-inline mb-2" key={index}>
                    <Grid justify="space-between" align="stretch">
                      <Grid.Col span={9}>
                        <Text c="dimmed" size="sm">
                          November 25, 2023
                        </Text>
                        <Title
                          my={5}
                          href="#"
                          component={Anchor}
                          order={5}
                          fw={600}
                          lineClamp={1}
                          c="#333"
                          className="text-decoration-none"
                        >
                          Audi RS 3 Sedan Review with pricing specs performance
                          and safety
                        </Title>
                        <Text c="dimmed" size="sm" lineClamp={3} mb="5">
                          Lorem ipsum dolor sit amet consectetur. Gravida
                          pellentesque ornare bibend Nemo enim ipsam voluptatem
                          quia
                        </Text>
                        <Anchor c="#E90808" href="#" size="sm">
                          Read More <BsArrowRight />
                        </Anchor>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Image
                          src="/blogs/blogs-1.png"
                          alt="Blog Placeholder"
                          className="img-fluid"
                        />
                      </Grid.Col>
                    </Grid>
                  </article>
                </>
              );
            })}
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default BrowseBlogs;
