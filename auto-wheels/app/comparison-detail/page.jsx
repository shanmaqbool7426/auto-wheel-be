"use client";
import React from "react";
import {
  Anchor,
  Box,
  Group,
  Button,
  Card,
  Title,
  Input,
  Select,
  Text,
  Image,
  Flex,
  Rating,
  rem,
  Grid,
  Tabs,
  Center,
  Badge,
  CloseIcon,
  CloseButton,
} from "@mantine/core";
import { CarSmall, SmallReviewIcon } from "@/components/Icons";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

const CarComparionDetail = () => {
  const tagsArray = [
    { name: "All (601)", isSelected: true },
    { name: "Service (39)" },
    { name: "Mileage (217)" },
    { name: "Looks (96)", isSelected: true },
    { name: "Comfort (155)" },
    { name: "Space (53)" },
    { name: "Power (53)" },
    { name: "More ..." },
  ];
  return (
    <>
      <section className="comparison-detail">
        <Box className="background-search-verlay" mb="420">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav className="mt-3">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <Anchor href="#">Cars</Anchor>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">
                      <Anchor href="#">Car Comparison</Anchor>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">
                        Suzuki Swift vs Toyota Hilux vs Peugeot 2008
                      </Anchor>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-12">
                <Box className="search-wrapper-card" mt="xl">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                    radius="sm"
                  >
                    <Title order={3} mb="md">
                      New Cars Comparison
                    </Title>
                    <div className="row mb-5">
                      <div className="col-md-3">
                        <Flex
                          h="100%"
                          direction="column"
                          justify="center"
                          align="center"
                          gap="xs"
                        >
                          <Text fw={600}>Suzuki Swift</Text>
                          <Badge
                            h={40}
                            w={40}
                            radius={40}
                            size="md"
                            fw={500}
                            bg="#E90808"
                          >
                            VS
                          </Badge>
                          <Text fw={600}>Toyota Hilux</Text>
                          <Badge
                            h={40}
                            w={40}
                            radius={40}
                            size="md"
                            fw={500}
                            bg="#E90808"
                          >
                            VS
                          </Badge>
                          <Text fw={600}>Peugeot 2008</Text>
                        </Flex>
                      </div>
                      <div className="col-md-3">
                        <Card withBorder radius="sm" padding="lg" shadow="none" className="position-relative">
                          <CloseButton ml="auto" />
                          <Flex direction="column" gap="8" align="center">
                            <Image
                              h={80}
                              mx="auto"
                              alt="Comapare Car Small"
                              src="/compare/car-sm.svg"
                            />
                            <Text className="text-primary" fw={500} size="lg">
                              Suzuki Swift
                            </Text>
                            <Select
                              placeholder="GLX CVT"
                              data={["React", "Angular", "Vue", "Svelte"]}
                            />
                            <Text>1197 cc | 12 - 15 Km/l | Automatic</Text>
                            <Text fw={700} size="xl">
                              Rs 47.25 Lacs
                            </Text>
                            <Anchor
                              component={Link}
                              href="#"
                              className="text-primary"
                            >
                              <Center inline>
                                <Box mr={5}>Buy Used Suzuki Swift</Box>
                                <IconArrowUpRight
                                  style={{ width: rem(16), height: rem(16) }}
                                />
                              </Center>
                            </Anchor>
                          </Flex>
                        </Card>
                      </div>
                      <div className="col-md-3">
                        <Card withBorder radius="sm" padding="lg" shadow="none" className="position-relative">
                          <CloseButton ml="auto" />
                          <Flex direction="column" gap="8" align="center">
                            <Image
                              h={80}
                              mx="auto"
                              alt="Comapare Car Small"
                              src="/compare/car-sm.svg"
                            />
                            <Text className="text-primary" fw={500} size="lg">
                              Suzuki Swift
                            </Text>
                            <Select
                              placeholder="GLX CVT"
                              data={["React", "Angular", "Vue", "Svelte"]}
                            />
                            <Text>1197 cc | 12 - 15 Km/l | Automatic</Text>
                            <Text fw={700} size="xl">
                              Rs 47.25 Lacs
                            </Text>
                            <Anchor
                              component={Link}
                              href="#"
                              className="text-primary"
                            >
                              <Center inline>
                                <Box mr={5}>Buy Used Suzuki Swift</Box>
                                <IconArrowUpRight
                                  style={{ width: rem(16), height: rem(16) }}
                                />
                              </Center>
                            </Anchor>
                          </Flex>
                        </Card>
                      </div>
                      <div className="col-md-3">
                        <Card withBorder radius="sm" padding="lg" shadow="none" className="position-relative">
                          <CloseButton ml="auto" />
                          <Flex direction="column" gap="8" align="center">
                            <Image
                              h={80}
                              mx="auto"
                              alt="Comapare Car Small"
                              src="/compare/car-sm.svg"
                            />
                            <Text className="text-primary" fw={500} size="lg">
                              Suzuki Swift
                            </Text>
                            <Select
                              placeholder="GLX CVT"
                              data={["React", "Angular", "Vue", "Svelte"]}
                            />
                            <Text>1197 cc | 12 - 15 Km/l | Automatic</Text>
                            <Text fw={700} size="xl">
                              Rs 47.25 Lacs
                            </Text>
                            <Anchor
                              component={Link}
                              href="#"
                              className="text-primary"
                            >
                              <Center inline>
                                <Box mr={5}>Buy Used Suzuki Swift</Box>
                                <IconArrowUpRight
                                  style={{ width: rem(16), height: rem(16) }}
                                />
                              </Center>
                            </Anchor>
                          </Flex>
                        </Card>
                      </div>
                    
                    </div>
                  </Card>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </section>
    </>
  );
};

export default CarComparionDetail;
