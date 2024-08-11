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
  Center,
  Badge,
  CloseButton,
  Paper,
  Switch,
  Table,
} from "@mantine/core";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { comparisonData } from "@/mock-data/comparions-data";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import QuickLinks from "@/components/QuickLinks";

const CarComparionDetail = () => {
  const carDetailLabel = [
    { name: "Overview", href: "#overview" },
    { name: "Dimensions", href: "#dimension" },
    { name: "Engine & Performance", href: "#performance" },
    { name: "Transmission", href: "#transmission" },
    {
      name: "Suspension, Steering & Brakes",
      href: "#suspension_steering_brakes",
    },
    { name: "Wheels & Tyres", href: "#wheels_tyres" },
    { name: "Fuel Consumptions", href: "#fuel_consumptions" },
    { name: "Safety", href: "#safety" },
    { name: "Exterior", href: "#exterior" },
  ];

  return (
    <>
      <Box className="comparison-detail">
        <Box className="background-search-verlay" mb="420">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="#">Cars</Anchor>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Anchor href="#">Car Comparison</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">
                        Suzuki Swift vs Toyota Hilux vs Peugeot 2008
                      </Anchor>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-12">
                <Box className="search-wrapper-card" mt="md">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                    radius="sm"
                  >
                    <Title order={3} mb="md">
                      New Cars Comparison
                    </Title>
                    <div className="row mb-3">
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
                        <Card
                          withBorder
                          radius="sm"
                          padding="lg"
                          shadow="none"
                          className="position-relative"
                        >
                          <CloseButton ml="auto" />
                          <Flex direction="column" gap="5" align="center">
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
                              size="sm"
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
                        <Card
                          withBorder
                          radius="sm"
                          padding="lg"
                          shadow="none"
                          className="position-relative"
                        >
                          <CloseButton ml="auto" />
                          <Flex direction="column" gap="5" align="center">
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
                              size="sm"
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
                        <Card
                          withBorder
                          radius="sm"
                          padding="lg"
                          shadow="none"
                          className="position-relative"
                        >
                          <CloseButton ml="auto" />
                          <Flex direction="column" gap="5" align="center">
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
                              size="sm"
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

                  <Card shadow="lg" padding="0" bg="#f3f3f3">
                    <Box className="car-detail-lists">
                      <Carousel
                        withIndicators={false}
                        withControls={false}
                        draggable={true}
                        slideSize="5%"
                        slideGap="0"
                        align="start"
                        slidesToScroll={7}
                      >
                        {carDetailLabel.map((item, index) => {
                          return (
                            <Carousel.Slide key={index}>
                              <Button
                                component={Link}
                                href={item.href}
                                variant="transparent"
                                size="md"
                                fw={500}
                                c="#333333"
                                // For single item seleted just uncomment the mentioned code below
                                // className="selected"
                              >
                                {item.name}
                              </Button>
                            </Carousel.Slide>
                          );
                        })}
                      </Carousel>
                    </Box>
                  </Card>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </Box>
      <Box component="section" className="comparison-detail-wrapper" mb="xl">
        <div className="container">
          <div className="row">
            {comparisonData.map((section, sectionIndex) => {
              return (
                <>
                  <div className="col-md-12" key={sectionIndex}>
                    <Flex
                      justify="space-between"
                      align="center"
                      mb={section.title ? "lg" : "0"}
                    >
                      {section.title ? (
                        <Title order={3}>{section.title}</Title>
                      ) : null}
                      {section.isSwitchable && (
                        <Switch
                          labelPosition="left"
                          label="Hide Common Features"
                        />
                      )}
                    </Flex>
                  </div>
                  <div className="col-md-12" key={sectionIndex}>
                    <Table
                      className="table-border-light"
                      mb="lg"
                      borderColor="hsla(0, 0%, 95%, 1)"
                      withTableBorder
                      withColumnBorders
                      verticalSpacing="md"
                      horizontalSpacing="md"
                    >
                      <Table.Tbody>
                        {section.overviewTableData?.map((item, index) => {
                          return (
                            <>
                              {item.type === "icon" && (
                                <Table.Tr key={index} fw={600}>
                                  <Table.Td colSpan={4}>
                                    <Flex align="center" gap="sm">
                                      <Image
                                        src={item.iconURL}
                                        height={40}
                                        alt="Dimensions"
                                      />
                                      <Title order={4}>
                                        {item.featureName}
                                      </Title>
                                    </Flex>
                                  </Table.Td>
                                </Table.Tr>
                              )}
                              <Table.Tr
                                key={index}
                                fw={600}
                                bg={
                                  item.isRowSelected &&
                                  "hsla(0, 93%, 47%, 0.03)"
                                }
                              >
                                <Table.Td
                                  fw={600}
                                  size="md"
                                  c="dimmed"
                                  w="20%"
                                  className="border-end-0"
                                >
                                  {item.type}
                                </Table.Td>
                                <Table.Td w="25%" className="text-center">
                                  {item.first}
                                </Table.Td>
                                <Table.Td w="25%" className="text-center">
                                  {item.second}
                                </Table.Td>
                                <Table.Td w="25%" className="text-center">
                                  {item.third}
                                </Table.Td>
                              </Table.Tr>
                            </>
                          );
                        })}
                      </Table.Tbody>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Box>
      <ComparisonProducts title="Similar Car Comparison" />
      <QuickLinks
        titlePopular="Popular Used Cars"
        titleUsed="Used Cars by City"
      />
    </>
  );
};

export default CarComparionDetail;
