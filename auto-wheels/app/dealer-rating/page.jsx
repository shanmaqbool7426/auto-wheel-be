"use client";
import React from "react";
import {
  Anchor,
  Box,
  Button,
  Card,
  Title,
  Text,
  Image,
  Flex,
  Rating,
  Table,
  Paper,
  Select,
  Pagination,
  Group,
  Stack,
  List,
  ThemeIcon,
  rem,
  CheckIcon,
  BackgroundImage,
  Center,
} from "@mantine/core";
import QuickLinks from "@/components/QuickLinks";
import {
  IconCheck,
  IconRosetteDiscountCheckFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import {
  FaClock,
  FaEnvelope,
  FaLocationDot,
  FaMobile,
  FaPhone,
  FaThumbsDown,
  FaThumbsUp,
  FaUserCheck,
  FaUserLarge,
  FaUserPlus,
  FaWhatsapp,
} from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { RiUserFollowFill } from "react-icons/ri";
import BrowseByType from "@/modules/home/BrowseByType";
import Link from "next/link";

const DealerRating = () => {
  return (
    <>
      <Box component="section" className="car-specification">
        <Box className="background-search-verlay" mb="200">
          <Box className="container">
            <Box className="row">
              <Box className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="#">Home</Anchor>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Anchor href="#">Dealer List</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">John Adam</Anchor>
                    </li>
                  </ol>
                </nav>
              </Box>
              <Box className="col-md-12">
                <Box className="search-wrapper-card">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                    radius="sm"
                  >
                    <Title order={3} mb="xl">
                      John Adam Profile
                      <Text c="#919191" size="md" span ml="sm" ff="text">
                        Member Since ( 20 April 2024)
                      </Text>
                    </Title>
                    <Box className="row mb-2">
                      <Box className="col-md-2">
                        <Card shadow="none" p="0" h="100%">
                          <Image src="/user-profile.png" alt="Toyota Logo" />
                        </Card>
                      </Box>
                      <Box className="col-md-7">
                        <Group align="flex-start" justify="flex-start" gap="xs">
                          <Title order={3}>John Adam</Title>
                          <Text span c="#1FC055">
                            <IconRosetteDiscountCheckFilled />
                          </Text>
                        </Group>

                        <Group
                          component="ul"
                          mt="md"
                          mb="0"
                          pl="0"
                          align="flex-start"
                          justify="flex-start"
                          gap="xs"
                          c="dimmed"
                          className="list-unstyled"
                        >
                          <Text component="li" size="lg" mr="md">
                            <FaUserLarge
                              style={{ verticalAlign: "baseline" }}
                              size="0.9rem"
                            />
                            <Text span ml={5}>
                              Private Dealer
                            </Text>
                          </Text>
                          <Text component="li" size="lg" mr="md">
                            <FaLocationDot
                              size="0.9rem"
                              style={{ verticalAlign: "baseline" }}
                            />
                            <Text span ml={5}>
                              SF, Bay Area
                            </Text>
                          </Text>
                          <Text component="li" size="lg">
                            <FaEnvelope size="0.9rem" />
                            <Text span ml={5}>
                              abc@gmail.com
                            </Text>
                          </Text>
                        </Group>

                        <Group
                          component="ul"
                          mt="md"
                          mb={0}
                          pl="0"
                          align="flex-start"
                          justify="flex-start"
                          gap="xs"
                          c="dimmed"
                          className="list-unstyled"
                        >
                          <Text component="li" size="lg" mr="md">
                            <FaMobile
                              style={{ verticalAlign: "baseline" }}
                              size="0.9rem"
                            />
                            <Text span ml={5}>
                              +92 312 123 2345
                            </Text>
                          </Text>
                          <Text component="li">
                            <FaClock size="0.9rem" />
                            <Text span ml={5}>
                              9:30 AM - 8:30 PM (Mon - Fri)
                            </Text>
                          </Text>
                        </Group>

                        <Box className="user-rating" mt="lg">
                          <Group gap="2" mb="xs">
                            <Rating defaultValue={3} />
                            <Text span size="sm">
                              (3/5)
                            </Text>
                          </Group>
                          <Text>Reviews (50)</Text>
                        </Box>
                      </Box>
                      <Box className="col-md-3 text-center">
                        <Stack align="stretch" justify="center" gap="md">
                          <Button
                            variant="filled"
                            bg="#1FC055"
                            leftSection={
                              <FaWhatsapp style={{ fontSize: "1.2rem" }} />
                            }
                          >
                            Whatsapp
                          </Button>
                          <Button
                            bg="#EB2321"
                            leftSection={
                              <RiUserFollowFill
                                style={{ fontSize: "1.2rem" }}
                              />
                            }
                          >
                            Follow
                          </Button>
                          <Group justify="center" align="center" c="dimmed">
                            <Text className="border-end" pr="lg">
                              Followers
                              <Text display="block">
                                <RiUserFollowFill /> 1.8k
                              </Text>
                            </Text>
                            <Text>
                              Followers
                              <Text display="block">
                                <RiUserFollowFill /> 1.8k
                              </Text>
                            </Text>
                          </Group>
                          <Button bg="#EB2321">Write a Review</Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="container" mb="xl">
          <Box className="row">
            <Box className="col-md-8">
              <Card shadow="0px 4px 20px 0px #00000014" padding="xl">
                <Title order={3} mb="lg">
                  Service Offerings
                </Title>
                <Group gap="xl">
                  <List
                    spacing="xs"
                    size="sm"
                    icon={
                      <IconCheck
                        color="#E90808"
                        style={{ width: rem(24), height: rem(24) }}
                      />
                    }
                  >
                    <List.Item>Indoor inventory lot for new & Used</List.Item>
                    <List.Item>Indoor inventory lot for new & Used</List.Item>
                  </List>
                  <List
                    spacing="xs"
                    size="sm"
                    icon={
                      <IconCheck
                        color="#E90808"
                        style={{ width: rem(24), height: rem(24) }}
                      />
                    }
                  >
                    <List.Item>Indoor inventory lot for new & Used</List.Item>
                    <List.Item>Indoor inventory lot for new & Used</List.Item>
                  </List>
                </Group>

                <Title order={4} my="lg" fw={600}>
                  Explore remote services
                </Title>
                <Box className="row">
                  <Box className="col-md-6">
                    <Paper bg="#F3F3F3" radius="md" shadow="none" p="md">
                      <Flex gap="md">
                        <Image
                          src="/user-profile/trader-in.svg"
                          h={70}
                          alt="Trade-in available"
                        />
                        <Box>
                          <Title order={5} mb="5" fw={600}>
                            Trade-in available
                          </Title>
                          <Text size="sm">
                            Buy a vehicle from this dealership and trade-in your
                            old one.
                          </Text>
                        </Box>
                      </Flex>
                    </Paper>
                  </Box>
                  <Box className="col-md-6">
                    <Paper bg="#F3F3F3" radius="md" shadow="none" p="md">
                      <Flex gap="md">
                        <Image
                          src="/user-profile/buy-online.svg"
                          h={70}
                          alt="Trade-in available"
                        />
                        <Box>
                          <Title order={5} mb="5" fw={600}>
                            Buy Online
                          </Title>
                          <Text size="sm">
                            Buy a vehicle from this dealership from the comfort
                            of your home.
                          </Text>
                        </Box>
                      </Flex>
                    </Paper>
                  </Box>
                </Box>
              </Card>
            </Box>
            <Box className="col-md-4">
              <Box h="100%">
                <BackgroundImage src="/google-map.png" h="100%" radius="md" />
              </Box>
            </Box>
          </Box>
        </Box>

        <BrowseByType bg="bg-light" pagination={true} />

        <Box component="section" className="review-reply" my="xl">
          <Box className="container">
            <Box className="row">
              <Box className="col-md-12">
                <Paper
                  shadow="0px 4px 20px 0px #00000014"
                  radius="md"
                  style={{ overflow: "hidden" }}
                >
                  <Card className="border-bottom" p="xl" radius={0} shadow="none">
                    <Box className="row">
                      <Box className="col-md-6">
                        <Title order={2}>
                          User{" "}
                          <Text span inherit className="text-primary">
                            Rating
                          </Text>
                        </Title>
                        <Text my="sm">2023 Toyota Corolla XLi VVTi</Text>
                        <Flex align="center" gap="5">
                          <Rating defaultValue={3} />
                          <Text span>(3/5)</Text>
                        </Flex>
                        <Text c="dimmed" my="sm">
                          Posted by Hamza tahir on Feb 16, 2024
                        </Text>
                      </Box>
                      <Box className="col-md-6 text-end">
                        <Button
                          color="#EB2321"
                          size="md"
                          m="md"
                          w={rem(250)}
                          fw={500}
                        >
                          Write a Review
                        </Button>
                      </Box>
                      <Box className="col-md-12">
                        <Text>
                          I've driven my Toyota Corolla 1.8 automatic for more
                          than 70,000 kilometers, and it's been a solid family
                          car. It's really good for driving around cities, and
                          there's enough space inside for my family of five
                          members. The car didn't give me any problems. The air
                          conditioner works really well, keeping us cool in hot
                          UAE weather. The brakes are okay, but they feel a bit
                          soft. So, overall, the Corolla is a reliable and
                          practical choice for families, even though the brakes
                          could be a bit better.
                        </Text>
                        <Box className="row" mt="md">
                          <Box className="col-md-4">
                            <Group justify="space-between">
                              Buying Process
                              <Group>
                                <Rating defaultValue={3} />
                                <Text span>(3/5)</Text>
                              </Group>
                            </Group>
                          </Box>
                          <Box className="col-md-4">
                            <Group justify="space-between">
                              Vehicle Selection
                              <Group>
                                <Rating defaultValue={3} />
                                <Text span>(3/5)</Text>
                              </Group>
                            </Group>
                          </Box>
                          <Box className="col-md-4">
                            <Group justify="space-between">
                              Level of Services
                              <Group>
                                <Rating defaultValue={3} />
                                <Text span>(3/5)</Text>
                              </Group>
                            </Group>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                  <Card padding="md" p="md" px="xl" radius={0} shadow="none">
                    <Box className="row">
                      <Box className="col-md-6">
                        <Group>
                          <Group c="dimmed">
                            <FaThumbsUp />
                            10
                          </Group>
                          <Group c="dimmed">
                            <FaThumbsDown />
                            10
                          </Group>
                        </Group>
                      </Box>
                      <Box className="col-md-6 text-end">
                        <Anchor
                          component={Link}
                          href="#"
                          underline="always"
                          className="text-primary"
                        >
                          Reply
                        </Anchor>
                      </Box>
                    </Box>
                  </Card>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>

        <QuickLinks />
      </Box>
    </>
  );
};

export default DealerRating;
