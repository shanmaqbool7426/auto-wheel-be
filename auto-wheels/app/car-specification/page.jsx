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
} from "@mantine/core";
import QuickLinks from "@/components/QuickLinks";

const CarComparison = () => {
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
                      <Anchor href="#">Cars</Anchor>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Anchor href="#">Car Reviews</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">Toyota Corolla Reviews</Anchor>
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
                    <Title order={3} mb="md">
                      Toyota Corolla Reviews
                    </Title>
                    <Box className="row mb-2">
                      <Box className="col-md-3">
                        <Card shadow="none" h="100%" withBorder py="lg">
                          <Flex
                            direction="column"
                            gap="xs"
                            justify="center"
                            align="center"
                          >
                            <Image
                              src="/find-cars/img-square.png"
                              alt="Toyota Logo"
                              h={200}
                              w={200}
                            />
                            <Button variant="outline" color="#E90808" mt="sm">
                              Used Toyota Cars
                            </Button>
                          </Flex>
                        </Card>
                      </Box>
                      <Box className="col-md-2 text-center">
                        <Flex
                          direction="column"
                          h="100%"
                          align="center"
                          justify="center"
                        >
                          <Box mb="sm">
                            <Text fw="bold" size="lg" className="text-primary">
                              Toyota Corolla
                            </Text>
                            <Text>Overall Ratings</Text>
                          </Box>
                          <Box mb="sm">
                            <Flex justify="center" align="center">
                              <Rating defaultValue={3} />
                              <Text>(3/5)</Text>
                            </Flex>
                            <Text>No of reviews (50)</Text>
                          </Box>
                          <Button
                            bg="#EB2321"
                            autoContrast
                            fullWidth
                            mt="md"
                            fw={500}
                          >
                            Write a Review
                          </Button>
                        </Flex>
                      </Box>
                      <Box className="col-md-3" mt="xl" pl="lg">
                        <Table
                          withRowBorders={false}
                          verticalSpacing="md"
                          horizontalSpacing="0"
                        >
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td>Mileage</Table.Td>
                              <Table.Td>
                                <Flex justify="flex-end">
                                  <Rating defaultValue={3} />
                                  (3/5)
                                </Flex>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>Maintenance Cost</Table.Td>
                              <Table.Td>
                                <Flex justify="flex-end">
                                  <Rating defaultValue={3} />
                                  (3/5)
                                </Flex>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>Safety</Table.Td>
                              <Table.Td>
                                <Flex justify="flex-end">
                                  <Rating defaultValue={3} />
                                  (3/5)
                                </Flex>
                              </Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </Box>
                      <Box className="col-md-3" mt="xl" pl="lg">
                        <Table
                          withRowBorders={false}
                          verticalSpacing="md"
                          horizontalSpacing="0"
                        >
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td>Mileage</Table.Td>
                              <Table.Td>
                                <Flex justify="flex-end">
                                  <Rating defaultValue={3} />
                                  (3/5)
                                </Flex>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>Maintenance Cost</Table.Td>
                              <Table.Td>
                                <Flex justify="flex-end">
                                  <Rating defaultValue={3} />
                                  (3/5)
                                </Flex>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>Safety</Table.Td>
                              <Table.Td>
                                <Flex justify="flex-end">
                                  <Rating defaultValue={3} />
                                  (3/5)
                                </Flex>
                              </Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box component="recent-reviews">
          <Box className="container">
            <Box className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  Recent Toyota Corolla Car{" "}
                  <Text span inherit className="text-primary">
                    Reviews
                  </Text>
                </Title>
              </Box>
              <Box className="col-md-12">
                <Paper withBorder mb="lg" style={{ overflow: "hidden" }}>
                  <Box p="lg" px="xl" className="border-bottom bg-light">
                    <Box className="row align-items-center">
                      <Box className="col-md-2">
                        <Text>
                          <strong>1</strong> - <strong>10</strong> of{" "}
                          <strong>500</strong> Results
                        </Text>
                      </Box>
                      <Box className="col-md-6">
                        <Flex align="center" gap="xl" justify="stretch">
                          <Box
                            component="label"
                            fw={500}
                            style={{ flex: "0 0 auto" }}
                          >
                            Select Variant :
                          </Box>
                          <Select
                            id="varient"
                            w="100%"
                            size="md"
                            placeholder="All Versions"
                            data={["React", "Angular", "Vue", "Svelte"]}
                          />
                        </Flex>
                      </Box>
                      <Box className="col-md-4">
                        <Flex align="center" gap="xl" justify="stretch">
                          <Box
                            component="label"
                            fw={500}
                            style={{ flex: "0 0 auto" }}
                          >
                            Sort By :
                          </Box>
                          <Select
                            id="varient"
                            w="100%"
                            size="md"
                            placeholder="Sort By"
                            data={["React", "Angular", "Vue", "Svelte"]}
                          />
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                  {[1, 2, 3].map((_, index) => {
                    return (
                      <Card
                        key={index}
                        py="xl"
                        px={0}
                        mx="xl"
                        mb="lg"
                        className="border-bottom customer-review-card"
                        radius={0}
                      >
                        <Box className="row">
                          <Box className="col-md-3">
                            <Image
                              src="/find-cars/img-square.png"
                              alt="Toyota Logo"
                              p="md"
                            />
                          </Box>
                          <Box className="col-md-9">
                            <Title className="text-primary" order={4} fw={600}>
                              Toyota Corolla Review
                            </Title>
                            <Text>2023 Toyota Corolla XLi VVTi</Text>
                            <Flex align="center" mt="sm">
                              <Rating defaultValue={3} />
                              <Text span inherit>
                                (3.5)
                              </Text>
                            </Flex>
                            <Text mt="5">
                              No of reviews <strong>(50)</strong>
                            </Text>
                            <Text c="dimmed" fw="400" mt="md" size="lg">
                              Posted by Hamza Tahir on Feb 16, 2024
                            </Text>
                          </Box>
                          <Box className="col-md-12">
                            <Text>
                              I've driven my Toyota Corolla 1.8 automatic for
                              more than 70,000 kilometers, and it's been a solid
                              family car. It's really good for driving around
                              cities, and there's enough space inside for my
                              family of five members. The car didn't give me any
                              problems. The air conditioner works really well,
                              keeping us cool in hot UAE weather. The brakes are
                              okay, but they feel a bit soft. So, overall, the
                              Corolla is a reliable and practical choice for
                              families, even though the brakes could be a bit
                              better.
                            </Text>
                          </Box>
                          <Box className="row" mt="md">
                            <Box className="col-md-4">
                              <Table
                                withRowBorders={false}
                                horizontalSpacing={0}
                              >
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td>
                                      <Text size="md">Mileage</Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Flex justify="flex-end" gap={5}>
                                        <Rating defaultValue={3} />
                                        (3/5)
                                      </Flex>
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td>
                                      <Text size="md">Maintenance Cost</Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Flex justify="flex-end" gap={5}>
                                        <Rating defaultValue={3} />
                                        (3/5)
                                      </Flex>
                                    </Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </Box>
                            <Box className="col-md-4">
                              <Table
                                withRowBorders={false}
                                horizontalSpacing={0}
                              >
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td>
                                      <Text size="md">Mileage</Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Flex justify="flex-end" gap={5}>
                                        <Rating defaultValue={3} />
                                        (3/5)
                                      </Flex>
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td>
                                      <Text size="md">Maintenance Cost</Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Flex justify="flex-end" gap={5}>
                                        <Rating defaultValue={3} />
                                        (3/5)
                                      </Flex>
                                    </Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </Box>
                            <Box className="col-md-4">
                              <Table
                                withRowBorders={false}
                                horizontalSpacing={0}
                              >
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td>
                                      <Text size="md">Mileage</Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Flex justify="flex-end" gap={5}>
                                        <Rating defaultValue={3} />
                                        (3/5)
                                      </Flex>
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td>
                                      <Text size="md">Maintenance Cost</Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Flex justify="flex-end" gap={5}>
                                        <Rating defaultValue={3} />
                                        (3/5)
                                      </Flex>
                                    </Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    );
                  })}
                </Paper>
              </Box>
              <Box className="col-md-12">
                <Pagination
                  total={20}
                  siblings={1}
                  defaultValue={10}
                  size="md"
                  color="#E90808"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <QuickLinks />
      </Box>
    </>
  );
};

export default CarComparison;
