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
  Text,
  Paper,
  rem,
  Flex,
  Image,
  Rating,
} from "@mantine/core";
import {
  CarComparisonSmall,
  CarSmall,
  SmallReviewIcon,
} from "@/components/Icons";
import UpcomingCars from "@/components/sections/UpcomingCars";
import ProductCard from "@/components/ui/ProductCard";
import { IconSearch } from "@tabler/icons-react";
import QuickLinks from "@/components/QuickLinks";
import Link from "next/link";

const CarReviews = () => {
  return (
    <>
      <Box component="section" className="cars-reviews">
        <Box className="background-search-verlay" mb="100">
          <Box className="container">
            <Box className="row">
              <Box className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="#">Car</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">Car Reviews</Anchor>
                    </li>
                  </ol>
                </nav>
                <Group>
                  <Button
                    leftSection={<CarSmall />}
                    variant="light"
                    radius="md"
                    size="md"
                    bg="white"
                    c="#333"
                    autoContrast
                  >
                    New Cars
                  </Button>
                  <Button
                    leftSection={<CarSmall />}
                    variant="light"
                    size="md"
                    radius="md"
                    bg="white"
                    c="#333"
                    autoContrast
                  >
                    Used Cars
                  </Button>
                  <Button
                    leftSection={<CarComparisonSmall />}
                    variant="light"
                    size="md"
                    radius="md"
                    bg="white"
                    c="#333"
                    autoContrast
                  >
                    Car Comparison
                  </Button>
                  <Button
                    leftSection={<SmallReviewIcon />}
                    variant="light"
                    size="md"
                    radius="md"
                    bg="#333"
                    c="white"
                    autoContrast
                  >
                    Car Reviews
                  </Button>
                </Group>
              </Box>
              <Box className="col-md-12">
                <Box className="search-wrapper-card" mt="xl">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                    radius="sm"
                  >
                    <Title order={3} mb="md">
                      Browse Reviews For Your Perfect New Car
                    </Title>
                    <Box className="row" mb="md">
                      <Box className="col-md-9">
                        <Input
                          size="md"
                          placeholder="Search by Car Make or Model"
                          leftSection={<IconSearch size={16} />}
                        />
                      </Box>
                      <Box className="col-md-3">
                        <Button
                          size="md"
                          bg="#E90808"
                          autoContrast
                          fullWidth
                          leftSection={<IconSearch size={16} />}
                        >
                          Search
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="container">
        <Box className="row">
          <Box className="col-md-12">
            <Paper
              shadow="none"
              bg="#F3F3F3"
              radius="none"
              mb="0"
              p={0}
              className="position-relative"
            >
              <Box className="row">
                <Box className="col-lg-5 mt-3">
                  <Card h="100%" bg="transparent" p="xl">
                    <Text size="xl" fw="bold">
                      If you own a car, leave a review and let others know what
                      you think of it.
                    </Text>
                    <Button
                      bg="#EB2321"
                      autoContrast
                      size="lg"
                      fw="500"
                      mt="xl"
                      component={Link}
                      href="/car-specification"
                      miw={rem(260)}
                    >
                      Write a Review
                    </Button>
                  </Card>
                </Box>
                <Box className="col-lg-7 d-none d-lg-block">
                  <Image className="banner-bg" src="/reviews-banner-bg.svg" />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      <UpcomingCars
        reviewsText={
          <Text>
            No of reviews{" "}
            <Text inherit span fw={600}>
              (50)
            </Text>
          </Text>
        }
        reviewRating={
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} />
            <Text>(3/5)</Text>
          </Flex>
        }
      />
      <Box
        component="section"
        className="popular-used-vehicles bg-light"
        py="xl"
        mb="xl"
      >
        <Box className="container">
          <Box className="row">
            <Box className="col-md-12">
              <Title order={2} mb="xl">
                Popular Used{" "}
                <Text span inherit className="text-primary">
                  Vehicle
                </Text>
              </Title>
            </Box>
            {[...Array(6).keys()].map((_, index) => {
              return (
                <Box className="col-md-4" key={index}>
                  <ProductCard bg="transparent" />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <QuickLinks />
    </>
  );
};

export default CarReviews;
