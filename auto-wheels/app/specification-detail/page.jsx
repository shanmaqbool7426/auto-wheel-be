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
  Switch,
  Table,
} from "@mantine/core";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";
import { carSpecificationData } from "@/mock-data/car-specification";
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
        <Box className="background-search-verlay" mb="220">
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
                <Box className="search-wrapper-card" mt="md">
                  <Card
                    radius="6 6 0 0"
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                  >
                    <Title order={3} mb="md">
                      Toyota Corolla Specifications
                    </Title>
                    <div className="row mb-2">
                      <div className="col-md-3">
                        <Card shadow="none" h="100%" withBorder py="lg">
                          <Flex
                            direction="column"
                            gap="xs"
                            justify="center"
                            align="center"
                          >
                            <Image
                              src="/brands/toyota.svg"
                              alt="Toyota Logo"
                              h={100}
                              w={100}
                            />
                            <Button variant="outline" color="#E90808" mt="sm">
                              Used Toyota Cars
                            </Button>
                          </Flex>
                        </Card>
                      </div>
                      <div className="col-md-9">
                        <Text mb="md">
                          The prices of a Toyota Car in Pakistan start from PKR
                          4,399,000.0 for a new Toyota Yaris to PKR
                          156,829,000.0 for a new Toyota Land Cruiser. There are
                          currently 12 new car models available at Toyota
                          dealerships across Pakistan. Toyota Cars are also
                          widely available in used conditions starting from PKR
                          180,000 for a used Toyota Corolla to PKR 145,000,000
                          for a used Toyota Land Cruiser. There are a total of
                          26648 Toyota Cars available for sale in Pakistan on
                          PakWheels.
                        </Text>
                      </div>
                    </div>
                  </Card>

                  <Card radius=" 0 0 6 6" shadow="lg" padding="0" bg="#f3f3f3">
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
            {carSpecificationData.map((section, sectionIndex) => {
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
                              {item.typeIcon && (
                                <Table.Tr key={index} >
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
                                  size="lg"
                                  c="dimmed"
                                  w="25%"
                                  className="border-end-0"
                                >
                                  {item.th}
                                </Table.Td>
                                <Table.Td w="75%" className="text-center">
                                  {item.td}
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
