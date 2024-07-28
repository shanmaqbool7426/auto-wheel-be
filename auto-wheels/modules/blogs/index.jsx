"use client";
import React from "react";
import {
  BackgroundImage,
  Box,
  Flex,
  Text,
  Title,
  Image,
  Group,
  Card,
  Stack,
  Grid,
  Anchor,
  Badge,
  Pagination,
  Select,
  ActionIcon,
  Progress,
} from "@mantine/core";
import Link from "next/link";
import {
  EyeIcon,
  ViewIcon,
  FacebookCircle,
  YoutubeCircle,
  InstagramCircle,
  GearsHandle,
  CameraIcon,
} from "@/components/Icons";
import NextImage from "next/image";
import { FaCalendarDays, FaClock, FaLocationDot } from "react-icons/fa6";
import {
  IconAdjustments,
  IconCameraFilled,
  IconStar,
} from "@tabler/icons-react";

const BlogModule = () => {
  return (
    <>
      <section className="blog-page py-5">
        <div className="container">
          <div className="row ">
            <div className="col-md-6">
              <Box h={"100%"}>
                <BackgroundImage
                  h={450}
                  src="/blogs/blog-placeholder.png"
                  radius="sm"
                >
                  <Flex
                    p="md"
                    h="100%"
                    direction="column"
                    align="flex-start"
                    justify="flex-end"
                  >
                    <Link href={"#"} className="text-decoration-none">
                      <Title c="white" fw={500} order={4} mb="xs" lineClamp={2}>
                        BackgroundImage component can be used to add any content
                        on image. It is useful for hero headers and other
                        similar sections
                      </Title>
                    </Link>
                    <Text c="white">September 7, 2023</Text>
                  </Flex>
                </BackgroundImage>
              </Box>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <Box h={214} mb={"md"}>
                    <BackgroundImage
                      h={214}
                      src="/blogs/thumbnail-sm.png"
                      radius="sm"
                    >
                      <Flex
                        p="md"
                        h="100%"
                        direction="column"
                        align="flex-start"
                        justify="flex-end"
                      >
                        <Link href={"#"} className="text-decoration-none">
                          <Title
                            c="white"
                            fw={500}
                            order={5}
                            mb="xs"
                            lineClamp={2}
                          >
                            Bull Power Tractor 577 Price in Pakistan 2023
                            (September Update)
                          </Title>
                        </Link>
                        <Text c="white">September 7, 2023</Text>
                      </Flex>
                    </BackgroundImage>
                  </Box>
                </div>
                <div className="col-md-6">
                  <Box h={214} mb={"md"}>
                    <BackgroundImage
                      h={214}
                      src="/blogs/thumbnail-sm.png"
                      radius="sm"
                    >
                      <Flex
                        p="md"
                        h="100%"
                        direction="column"
                        align="flex-start"
                        justify="flex-end"
                      >
                        <Link href={"#"} className="text-decoration-none">
                          <Title
                            c="white"
                            fw={500}
                            order={5}
                            mb="xs"
                            lineClamp={2}
                          >
                            Bull Power Tractor 577 Price in Pakistan 2023
                            (September Update)
                          </Title>
                        </Link>
                        <Text c="white">September 7, 2023</Text>
                      </Flex>
                    </BackgroundImage>
                  </Box>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Box h={214} mb={"md"}>
                    <BackgroundImage
                      h={214}
                      src="/blogs/thumbnail-sm.png"
                      radius="sm"
                    >
                      <Flex
                        p="md"
                        h="100%"
                        direction="column"
                        align="flex-start"
                        justify="flex-end"
                      >
                        <Link href={"#"} className="text-decoration-none">
                          <Title
                            c="white"
                            fw={500}
                            order={5}
                            mb="xs"
                            lineClamp={2}
                          >
                            Bull Power Tractor 577 Price in Pakistan 2023
                            (September Update)
                          </Title>
                        </Link>
                        <Text c="white">September 7, 2023</Text>
                      </Flex>
                    </BackgroundImage>
                  </Box>
                </div>
                <div className="col-md-6">
                  <Box h={214} mb={"md"}>
                    <BackgroundImage
                      h={214}
                      src="/blogs/thumbnail-sm.png"
                      radius="sm"
                    >
                      <Flex
                        p="md"
                        h="100%"
                        direction="column"
                        align="flex-start"
                        justify="flex-end"
                      >
                        <Link href={"#"} className="text-decoration-none">
                          <Title
                            c="white"
                            fw={500}
                            order={5}
                            mb="xs"
                            lineClamp={2}
                          >
                            Bull Power Tractor 577 Price in Pakistan 2023
                            (September Update)
                          </Title>
                        </Link>
                        <Text c="white">September 7, 2023</Text>
                      </Flex>
                    </BackgroundImage>
                  </Box>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Post Section */}
          <section className="recent-posts my-5 border-bottom pb-5 mb-5">
            <Title order={2} mb="lg">
              Recent{" "}
              <Text span className="text-primary" inherit>
                Posts
              </Text>
            </Title>
            <div className="row">
              <div className="col-md-8">
                {[1, 2, 3, 4, 5].map((_, index) => {
                  return (
                    <>
                      <Card
                        key={index}
                        shadow="none"
                        padding="none"
                        className=" pb-4 mb-4 card-border-bottom"
                      >
                        <Flex align="top" wrap={{ sm: "wrap", md: "nowrap" }}>
                          <Image
                            src="/blogs/recent-placeholder.png"
                            radius="md"
                            alt="Norway"
                            className="img-fluid"
                          />

                          <Flex gap="xs" direction="column" p="sm" pl="md">
                            <Title fw={600} order={4}>
                              <Link
                                href={"#"}
                                className="text-decoration-none text-dark"
                              >
                                Atlas Honda Recorded Highest-Ever Quarterly
                                Profits
                              </Link>
                            </Title>
                            <Flex
                              direction="row"
                              c="dimmed"
                              wrap={true}
                              justify="space-between"
                              align="center"
                            >
                              <div className="left d-flex gap-2">
                                <Text
                                  span
                                  size="sm"
                                  className="d-flex gap-1 align-items-center"
                                >
                                  Sulman Ali <span className="dot"></span>
                                </Text>
                                <Text span size="sm">
                                  Oct 23, 2023
                                </Text>
                                <Text
                                  span
                                  className="d-flex gap-1 align-items-center"
                                  size="sm"
                                >
                                  <EyeIcon />
                                  56
                                </Text>
                              </div>
                              <div className="right">
                                <Text
                                  span
                                  className="d-flex gap-1 align-items-center"
                                  size="sm"
                                >
                                  <ViewIcon />
                                  10
                                </Text>
                              </div>
                            </Flex>
                            <Text lineClamp={4} size="sm">
                              Atlas Honda, commonly known as Honda Bikes, has
                              recorded the highest quarterly profits in the
                              September 30, 2023 quarter. According to its
                              letter to the Pakistan Stock Exchange (PSX). Atlas
                              Honda, commonly known as Honda Bikes, has recorded
                              the highest quarterly profits in the September 30,
                              2023 quarter. According to its letter to the
                              Pakistan Stock Exchange (PSX).
                            </Text>
                          </Flex>
                        </Flex>
                      </Card>
                    </>
                  );
                })}
                <Pagination total={10} color="#E90808" mb="md" />
                <Title order={2} my="xl">
                  Top
                  <Text span className="text-primary" inherit>
                    {" "}
                    News
                  </Text>
                </Title>
                {/* Large Post */}
                <Box className="article-large" component="article">
                  <Card padding="none">
                    <Card.Section className="position-relative">
                      <Badge
                        bg="#E90808"
                        c="white"
                        radius="sm"
                        size="xl"
                        className="position-absolute bottom-0"
                      >
                        GUIDES
                      </Badge>
                      <Image
                        src="/blogs/img-large.png"
                        radius="md"
                        alt="Norway"
                        className="img-fluid"
                      />
                    </Card.Section>
                    <Flex gap="xs" direction="column" mt="md">
                      <Title fw={600} order={4}>
                        <Link
                          href={"#"}
                          className="text-decoration-none text-dark"
                        >
                          Atlas Honda Recorded Highest-Ever Quarterly Profits
                        </Link>
                      </Title>
                      <Flex
                        direction="row"
                        c="dimmed"
                        wrap={true}
                        justify="space-between"
                        align="center"
                      >
                        <div className="left d-flex gap-2">
                          <Text
                            span
                            size="sm"
                            className="d-flex gap-1 align-items-center"
                          >
                            Sulman Ali <span className="dot"></span>
                          </Text>
                          <Text span size="sm">
                            Oct 23, 2023
                          </Text>
                          <Text
                            span
                            className="d-flex gap-1 align-items-center"
                            size="sm"
                          >
                            <EyeIcon />
                            56
                          </Text>
                        </div>
                        <div className="right">
                          <Text
                            span
                            className="d-flex gap-1 align-items-center"
                            size="sm"
                          >
                            <ViewIcon />
                            10
                          </Text>
                        </div>
                      </Flex>
                      <Text lineClamp={4} size="sm">
                        Atlas Honda, commonly known as Honda Bikes, has recorded
                        the highest quarterly profits in the September 30, 2023
                        quarter. According to its letter to the Pakistan Stock
                        Exchange (PSX). Atlas Honda, commonly known as Honda
                        Bikes, has recorded the highest quarterly profits in the
                        September 30, 2023 quarter. According to its letter to
                        the Pakistan Stock Exchange (PSX).
                      </Text>
                    </Flex>
                  </Card>
                </Box>
                {/* Large Post */}

                {/* Two Cols Grid Posts */}
                <Grid mt="xl">
                  <Grid.Col span={6}>
                    <Flex>
                      <Image
                        component={NextImage}
                        width={100}
                        height={100}
                        radius="sm"
                        src="/blogs/blog-sm.png"
                      />
                      <Box pl="md">
                        <Title order={5} fw={600}>
                          Gujranwala Motorway link Road Is Set To Open on
                          December 25
                        </Title>
                        <Text c="dimmed">Oct 23, 2023</Text>
                      </Box>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Flex>
                      <Image
                        component={NextImage}
                        width={100}
                        height={100}
                        radius="sm"
                        src="/blogs/blog-sm.png"
                      />
                      <Box pl="md">
                        <Title order={5} fw={600}>
                          Gujranwala Motorway link Road Is Set To Open on
                          December 25
                        </Title>
                        <Text c="dimmed">Oct 23, 2023</Text>
                      </Box>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Flex>
                      <Image
                        component={NextImage}
                        width={100}
                        height={100}
                        radius="sm"
                        src="/blogs/blog-sm.png"
                      />
                      <Box pl="md">
                        <Title order={5} fw={600}>
                          Gujranwala Motorway link Road Is Set To Open on
                          December 25
                        </Title>
                        <Text c="dimmed">Oct 23, 2023</Text>
                      </Box>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Flex>
                      <Image
                        component={NextImage}
                        width={100}
                        height={100}
                        radius="sm"
                        src="/blogs/blog-sm.png"
                      />
                      <Box pl="md">
                        <Title order={5} fw={600}>
                          Gujranwala Motorway link Road Is Set To Open on
                          December 25
                        </Title>
                        <Text c="dimmed">Oct 23, 2023</Text>
                      </Box>
                    </Flex>
                  </Grid.Col>
                </Grid>
                {/* Two Cols Grid Posts */}
              </div>
              <div className="col-md-4">
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
                    <Grid.Col span={4}>
                      <Stack
                        align="center"
                        justify="center"
                        gap="0"
                        component={Anchor}
                      >
                        <FacebookCircle />
                        <Text fw={600} mt="xs" c="#222222">
                          563
                        </Text>
                        <Text size="sm" c="#222222">
                          Fans
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack
                        align="center"
                        justify="center"
                        gap="0"
                        component={Anchor}
                      >
                        <YoutubeCircle />
                        <Text fw={600} mt="xs" c="#222222">
                          20,100
                        </Text>
                        <Text size="sm" c="#222222">
                          Subscribers
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack
                        align="center"
                        justify="center"
                        gap="0"
                        component={Anchor}
                      >
                        <InstagramCircle />
                        <Text fw={600} mt="xs" c="#222222">
                          563
                        </Text>
                        <Text size="sm" c="#222222">
                          Followers
                        </Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Card>
                <Card
                  mb="lg"
                  shadow="0px 4px 20px 0px #00000014"
                  padding="md"
                  withBorder
                  className="border-light"
                >
                  <Title
                    order={5}
                    className="title-with-border"
                    pb="xs"
                    mb="xs"
                  >
                    Popular Posts
                  </Title>
                  <Box className="small-post" pb="md" mb="md">
                    <Image
                      className="img-fluid w-auto"
                      src="/blogs/bike.svg"
                      mx="auto"
                      my="md"
                    />
                    <Title order={5} fw={600}>
                      Honda 125 Price in Pakistan 2023 (September Update)
                    </Title>
                    <Text c="dimmed" mt="xs">
                      Oct 23, 2023
                    </Text>
                  </Box>
                  {[1, 2, 3, 4, 5].map((_, index) => {
                    return (
                      <>
                        <Box className="small-post" pb="md" mb="md" key={index}>
                          <Group grow>
                            <Image
                              className="img-fluid "
                              src="/blogs/small-car.svg"
                            />
                            <Box>
                              <Title order={6} fw={600}>
                                Toyota Corolla 2023 Price in Pakistan
                              </Title>
                              <Text c="dimmed" mt="5px" size="sm">
                                Oct 23, 2023
                              </Text>
                            </Box>
                          </Group>
                        </Box>
                      </>
                    );
                  })}
                </Card>
                <Card
                  shadow="0px 4px 20px 0px #00000014"
                  padding="md"
                  withBorder
                  className="border-light"
                >
                  <Title
                    order={5}
                    className="title-with-border"
                    pb="xs"
                    mb="xs"
                  >
                    Popular Tags
                  </Title>
                  <Group my="sm" gap="xs">
                    <Badge
                      variant="light"
                      size="lg"
                      fw={500}
                      c="#222222"
                      p="md"
                      bg="#F3F3F3"
                    >
                      Autowheels.pk
                    </Badge>
                    <Badge
                      variant="light"
                      size="lg"
                      fw={500}
                      c="#222222"
                      p="md"
                      bg="#F3F3F3"
                    >
                      Changan Alsvin Price
                    </Badge>
                    <Badge
                      variant="light"
                      size="lg"
                      fw={500}
                      c="#222222"
                      p="md"
                      bg="#F3F3F3"
                    >
                      DFSK Glory 580 Pro
                    </Badge>
                    <Badge
                      variant="light"
                      size="lg"
                      fw={500}
                      c="#222222"
                      p="md"
                      bg="#F3F3F3"
                    >
                      DFSK Glory 580 Pro
                    </Badge>
                  </Group>
                </Card>
              </div>
            </div>
          </section>
          <section className="tips-section">
            <div className="row">
              <Title order={2} mb="lg">
                Tips & Advice
              </Title>

              <div className="row">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                  return (
                    <div className="col-md-3" key={index}>
                      <Card padding="none" mb="xl">
                        <Card.Section className="position-relative">
                          <Badge
                            bg="#E90808"
                            c="white"
                            radius="sm"
                            size="lg"
                            className="position-absolute bottom-0"
                          >
                            GUIDES
                          </Badge>
                          <Image
                            src="/blogs/img-large.png"
                            alt="Norway"
                            radius="md"
                          />
                        </Card.Section>

                        <Title order={5} fw={600} lineClamp={2} mt="md">
                          Your Electric Motorcycles Care Guide
                        </Title>
                        <Flex gap="sm" mt="5">
                          <Text
                            span
                            fw={400}
                            className="d-flex gap-1 align-items-center"
                          >
                            Sulman Ali <span className="dot"></span>
                          </Text>
                          <Text span>Oct 23, 2023</Text>
                        </Flex>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
        <section className="find-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Title
                  order={2}
                  pb="md"
                  mb="xl"
                  className="title-with-border--lg"
                >
                  Find whatever you want
                </Title>
              </div>
              <div className="col-md-3">
                <Select
                  size="md"
                  placeholder="Select your preference"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              </div>
              <div className="col-md-3">
                <Select
                  size="md"
                  placeholder="Choose Make"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              </div>
              <div className="col-md-3">
                <Select
                  size="md"
                  placeholder="Choose Model"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              </div>
              <div className="col-md-3">
                <Select
                  size="md"
                  placeholder="Select your preference"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="blog-products py-5">
          <div className="container">
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map((_, index) => {
                return (
                  <div className="col-md-4">
                    <Card padding="none" mb="lg">
                      <Card.Section className="position-relative">
                        <Flex
                          align="center"
                          className="position-absolute"
                          c="white"
                          style={{ top: "15px", left: "15px" }}
                        >
                          <CameraIcon />
                          <Text span ml="5">
                            5
                          </Text>
                        </Flex>

                        <IconStar
                          color="white"
                          stroke={2}
                          className="position-absolute"
                          style={{ bottom: "25px", left: "15px" }}
                        />

                        <Image
                          radius="md"
                          src="/products/product-placeholder.png"
                          className="img-fluid"
                        />
                        <Group gap="10" grow mt="5">
                          <Progress
                            radius="0"
                            color="#EB2322"
                            size="sm"
                            value={100}
                          />
                          <Progress
                            radius="0"
                            color="#EB2322"
                            size="sm"
                            value={0}
                          />
                          <Progress
                            radius="0"
                            color="#EB2322"
                            size="sm"
                            value={0}
                          />
                        </Group>
                      </Card.Section>
                      <Box className="product-content" pt="md">
                        <Title order={5} lineClamp={2}>
                          <Link
                            href={"#"}
                            className="text-decoration-none text-dark"
                          >
                            USED 2.0 L 2016 Toyota Yaris..
                          </Link>
                        </Title>
                        <div className="product-price">Rs 7,400,000</div>
                      </Box>
                      <div className="product-meta">
                        <div className="meta-info d-flex justify-content-between align-items-center">
                          <span className="text-muted d-flex align-items-center gap-1">
                            <FaCalendarDays /> 2021
                          </span>
                          <span className="text-muted d-flex align-items-center gap-1">
                            <GearsHandle /> Automatic
                          </span>
                          <span className="text-muted d-flex align-items-center gap-1">
                            <FaLocationDot /> Automatic
                          </span>
                        </div>
                        <div className="stock-info d-flex justify-content-between align-items-center mt-2">
                          <span>
                            <span className="text-muted">Stock#</span> 324
                          </span>
                          <span className="text-muted">
                            <FaClock /> (Updated 1 month ago)
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default BlogModule;
