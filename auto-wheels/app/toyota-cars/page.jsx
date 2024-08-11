"use client";
import React from "react";
import {
  Anchor,
  Box,
  Group,
  Button,
  Card,
  Title,
  Text,
  Image,
  Flex,
  Rating,
  rem,
  Grid,
  Tabs,
  Center,
} from "@mantine/core";
import NextImage from "next/image";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseVideos from "@/modules/home/BrowseVideos";
import BrowseBlogs from "@/modules/home/BrowseBlogs";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import FAQ from "@/components/Faq";
import PopularNewCars from "../../components/sections/PopularNewCars";
import UpcomingCars from "../../components/sections/UpcomingCars";

const NewCarsDetailPage = () => {
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
  const brandsURLs = [
    { url: "/brands/acura.svg", name: "Acura" },
    { url: "/brands/hyundai.svg", name: "Hyundai", isHeightLarger: false },
    { url: "/brands/ford.svg", name: "Ford" },
    { url: "/brands/kia.svg", name: "KIA" },
    { url: "/brands/nissan.svg", name: "Nissan" },
    { url: "/brands/bmw.svg", name: "BMW" },
    { url: "/brands/bentley.svg", name: "Bentley" },
    { url: "/brands/toyota.svg", name: "Toyota" },
    { url: "/brands/chevrolet.svg", name: "Chevrolet" },
  ];
  return (
    <>
      <section className="find-cars">
        <Box className="background-search-verlay" mb="220">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="#">Bikes</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">New Bikes</Anchor>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-12">
                <Box className="search-wrapper-card">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                    radius="sm"
                  >
                    <Title order={3} mb="md">
                      Toyota 2023 Car Models, Prices & Pictures in Pakistan
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
                            <Title order={5} fw={600} c="#E90808">
                              Toyota Pricelist
                            </Title>
                            <Button variant="outline" color="#E90808" mt="sm">
                              Used Toyota Cars for sale
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
                        <Button color="#E90808" autoContrast fw={500}>
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Box>
              </div>
            </div>
          </div>
        </Box>

        <PopularNewCars />

        <UpcomingCars />
        <ComparisonProducts />
        <BrowseVideos />
        <BrowseBlogs />

        <section className="latest-reviews py-5">
          <div className="container">
            <Card shadow="0px 4px 20px 0px #00000014" padding="xl">
              <Title order={2} mb="lg">
                Latest Reviews of Toyota Corolla 2024
              </Title>
              <Box className="give-review" my="xl">
                <Grid>
                  <Grid.Col span={4}>
                    <Box>
                      <Flex align="center" gap="xs">
                        <Rating size={rem(42)} defaultValue={1} count={1} />
                        <Text size={rem(42)} fw="700">
                          4.3
                        </Text>
                        <Text ml="xl">
                          Based on 601 <br /> User reviews
                        </Text>
                      </Flex>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Box>
                      <Button color="#EB2321" size="lg" fullWidth>
                        Write a Review
                      </Button>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Box>
              <Box className="reviews-by-tags" mb="xl">
                <Group>
                  {tagsArray.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        variant={item.isSelected ? "filled" : "default"}
                        color={item.isSelected ? "#EB2321" : "#333333"}
                        autoContrast
                        size="md"
                        fw={500}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                </Group>
              </Box>

              <Box className="customer-reviews">
                <Tabs defaultValue="Latest" color="#EB2321">
                  <Tabs.List>
                    <Tabs.Tab
                      value="Latest"
                      p="md"
                      px="xl"
                      ff="heading"
                      fw={600}
                    >
                      Latest
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="Latest" py="xl">
                    <Carousel
                      loop
                      withControls={true}
                      controlsOffset="xl"
                      controlSize={40}
                      slideSize="33.33333%"
                      slideGap="none"
                      align="start"
                      slidesToScroll={3}
                    >
                      {[1, 2, 3, 4, 5].map((_, index) => {
                        return (
                          <Carousel.Slide key={index}>
                            <Card
                              shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.08)"
                              padding="lg"
                              m="md"
                            >
                              <Group mb="md">
                                <Rating defaultValue={3} count={5} />
                                <Text span inherit c="dimmed" size="sm">
                                  For LXI Opt S-CNG
                                </Text>
                              </Group>
                              <Group gap={5}>
                                <Title order={4} lineClamp={1}>
                                  Cool Car For A Small Family
                                </Title>
                                <Text c="dimmed" lineClamp={3}>
                                  The car's looks are amazing. In terms of
                                  comfort, it's acceptable. However, the mileage
                                  could be bet
                                </Text>
                                <Anchor href="#" c="#EB2321">
                                  Read More
                                </Anchor>
                              </Group>

                              <Box className="review-card-footer" mt="md">
                                <Text>By pooja kate</Text>
                                <Text c="dimmed">Oct 24, 2023 | 62 Views</Text>
                              </Box>
                            </Card>
                          </Carousel.Slide>
                        );
                      })}
                    </Carousel>
                  </Tabs.Panel>
                </Tabs>
              </Box>
            </Card>
          </div>
        </section>

        <section className="brands-faq-section pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Title order={2} mb="lg">
                  Toyota{" "}
                  <Text span c="#E90808" inherit>
                    Alternatives
                  </Text>
                </Title>
              </div>

              <div className="brands-carousel my-3">
                <Carousel
                  loop
                  withControls={true}
                  slideSize="14.28571%"
                  slideGap=""
                  align="start"
                  slidesToScroll={7}
                >
                  {brandsURLs.map((item, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <Flex
                          direction="column"
                          justify="center"
                          align="center"
                          className="single-brand-item"
                        >
                          <NextImage
                            width={100}
                            height={100}
                            src={item.url}
                            className="mx-auto text-center"
                          />
                          <Anchor component={Link} href="#" c="#333">
                            {item.name}
                          </Anchor>
                        </Flex>
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <FAQ />
      </section>
    </>
  );
};

export default NewCarsDetailPage;
