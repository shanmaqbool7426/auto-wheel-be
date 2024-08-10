"use client";
import React from "react";
import {
  Anchor,
  Box,
  Group,
  Badge,
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
  SimpleGrid,
  UnstyledButton,
  Pill,
  Table,
  Checkbox,
  Paper,
  List,
  ThemeIcon,
  CloseIcon,
} from "@mantine/core";
import {
  AirBags,
  CarComparisonSmall,
  CarSmall,
  DimensionIcon,
  FuelIcon,
  FuelTank,
  GearsHandle,
  SmallReviewIcon,
  TransmissionIcon,
} from "@/components/Icons";
import QuickLinks from "@/components/QuickLinks";
import FAQ from "@/components/Faq";

import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconSearch,
} from "@tabler/icons-react";
import BrowseByCategory from "@/modules/home/BrowseByCategory";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseVideos from "@/modules/home/BrowseVideos";
import BrowseBlogs from "@/modules/home/BrowseBlogs";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { FaCross, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

const NewCarsDetail = () => {
  const { ScrollContainer } = Table;
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
      <section className="find-cars cars-detail">
        <Box bg="rgba(233, 8, 8, 0.8)" pb="xl">
          <Box className="container">
            <Box className="row">
              <Box className="col-md-12">
                <nav className="mt-3">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <Anchor href="#">Cars</Anchor>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">
                      <Anchor href="#">New Cars</Anchor>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">
                      <Anchor href="#">Toyota Cars</Anchor>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">Toyota Corolla 2023</Anchor>
                    </li>
                  </ol>
                </nav>
              </Box>
              <Title order={2} c="white">
                New Toyota Corolla 2023 Price in Pakistan, Pictures and Specs
              </Title>
            </Box>
          </Box>
        </Box>

        <Box component="section" className="cars-detail" py="xl">
          <Box className="container">
            <Box className="row">
              <Box className="col-lg-7">
                <Box className="gallery-slider">
                  <Box className="large-thumbnail" pos="relative">
                    <Carousel withIndicators={false} controlSize={40} mb="md">
                      {[1, 2, 3, 4, 5].map((_, index) => {
                        return (
                          <Carousel.Slide key={index}>
                            <Image
                              radius="sm"
                              alt="cars-detaill-placeholder-large"
                              src="/cars-detaill-placeholder-large.png"
                              h="100%"
                              w="100%"
                              fit="cover"
                            />
                          </Carousel.Slide>
                        );
                      })}
                    </Carousel>
                    <Box className="img-gallery-slider">
                      <SimpleGrid cols={5}>
                        {[1, 2, 3, 4, 5].map((_, index) => {
                          return (
                            <UnstyledButton key={index}>
                              <Image
                                radius="sm"
                                alt="cars-detaill-placeholder-large"
                                src="/cars-detaill-placeholder-large.png"
                                h="100%"
                                w="100%"
                                fit="cover"
                              />
                            </UnstyledButton>
                          );
                        })}
                      </SimpleGrid>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="col-lg-5" px="lg">
                <Box className="row">
                  <Box className="col-12">
                    <Text c="dimmed" size="md">
                      Toyota Corolla 2023 Price Range in Pakistan
                    </Text>
                    <Text c="#E90808" fw="bold" my="lg" size={rem(26)}>
                      <Text span c="#E90808" size="md" fw={600} mr="xs">
                        PKR
                      </Text>
                      59.7 - 75.5 lacs
                      <Text span size="md" c="dimmed" ml="xs">
                        (*Ex-Factory Price)
                      </Text>
                    </Text>
                    <Flex gap="md" align="center">
                      <Flex align="center" gap="3">
                        <Rating defaultValue={4} count={5} />
                        <Text span inherit>
                          (3)
                        </Text>
                      </Flex>
                      <Text c="dimmed">(Review 15)</Text>
                    </Flex>
                    <Button
                      mt="md"
                      size="md"
                      fw={400}
                      color="#E90808"
                      variant="outline"
                    >
                      Used Toyota Cars for sale
                    </Button>
                  </Box>
                </Box>
                <Box className="row border-bottom" mt="xl" pb="md" mb="md">
                  <Box className="col-lg-6 border-end">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <FuelTank style={{ width: rem(24), height: rem(24) }} />
                      <Text c="dimmed">
                        Engine{" "}
                        <Text c="dark" fw={600}>
                          1598 - 1800 cc
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                  <Box className="col-lg-6">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <AirBags
                        style={{
                          width: rem(24),
                          height: rem(24),
                          marginTop: rem(6),
                        }}
                      />
                      <Text c="dimmed">
                        No of Air bags{" "}
                        <Text c="dark" fw={600}>
                          2
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box className="row border-bottom" pb="md" mb="lg">
                  <Box className="col-lg-6 border-end">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <DimensionIcon
                        style={{
                          width: rem(24),
                          height: rem(24),
                          marginTop: rem(6),
                        }}
                      />
                      <Text c="dimmed">
                        Size{" "}
                        <Text c="dark" fw={600}>
                          15′ 2″ L x 5′ 10″ W x 4′ 10″ H
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                  <Box className="col-lg-6">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <TransmissionIcon
                        customFill={true}
                        style={{
                          width: rem(24),
                          height: rem(24),
                          marginTop: rem(6),
                        }}
                      />
                      <Text c="dimmed">
                        Transmission{" "}
                        <Text c="dark" fw={600}>
                          Automatic & Manual
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box className="row">
                  <Box className="col-lg-12">
                    <Title order={4} fw={600} mb="md">
                      Toyota Corolla Available Colors
                    </Title>
                    <Group>
                      <Button size="xs" radius="xl" bg="#888888" />
                      <Button size="xs" radius="xl" bg="#C4C4C4" />
                      <Button size="xs" radius="xl" bg="#C1A3A3" />
                      <Button size="xs" radius="xl" bg="#E90808" />
                      <Button size="xs" radius="xl" bg="#C6BA7A" />
                      <Button size="xs" radius="xl" bg="#98B184" />
                      <Button size="xs" radius="xl" bg="#0000004D" />
                      <Button size="xs" radius="xl" bg="#3D6176" />
                      <Button size="xs" radius="xl" bg="#5D8DCD66" />
                      <Button size="xs" radius="xl" bg="#888888" />
                    </Group>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Details Relataed To Car */}
          <Box className="container" mt="xl">
            <Box className="row">
              <Box className="col-lg-12">
                <Title order={2}>
                  Toyota Corolla 2023{" "}
                  <Text span inherit c="#E90808">
                    Price in Pakistan
                  </Text>
                </Title>
                <Text mt="md">
                  The price of Toyota Corolla 2023 in Pakistan ranges from PKR
                  5,969,000 for the base variant Altis X Manual 1.6 to PKR
                  7,549,000 for the top of the line Altis Grande X CVT-i 1.8
                  Black Interior variant. These prices of Toyota Corolla in
                  Pakistan are ex-factory.
                </Text>
              </Box>

              {/* Comparison Table */}
              <Box className="col-lg-12" mt="lg">
                <Table
                  verticalSpacing="sm"
                  horizontalSpacing="sm"
                  withTableBorder
                  withColumnBorders
                >
                  <Table.Thead>
                    <Table.Tr bg="#E90808" c="white">
                      <Table.Th w="50%">Variants</Table.Th>
                      <Table.Th w="40%">Ex-Factory Price</Table.Th>
                      <Table.Th w="10%" align="center" ta="center">
                        Compare
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Flex justify="space-between">
                          <Text fw={500} size="md" c="#E90808">
                            Toyota Corolla Altis X Manual 1.6
                            <Text c="dimmed">1600 cc, Manual, Petrol</Text>
                          </Text>
                          <Text>Delivery Time: 1 Month</Text>
                        </Flex>
                        <Text mt="sm" c="dimmed">
                          2 Airbags, Navigation, Steering Switches, Rear Camera,
                          ABS, 9.0" Infotainment
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xl" fw="bold">
                          PKR 5,969,000
                        </Text>
                        <Text c="#E90808">
                          Get Corolla Altis X Manual 1.6 On Road Price
                        </Text>
                      </Table.Td>
                      <Table.Td align="center">
                        <Checkbox labelPosition="left" />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Flex justify="space-between">
                          <Text fw={500} size="md" c="#E90808">
                            Toyota Corolla Altis X Manual 1.6
                            <Text c="dimmed">1600 cc, Manual, Petrol</Text>
                          </Text>
                          <Text>Delivery Time: 1 Month</Text>
                        </Flex>
                        <Text mt="sm" c="dimmed">
                          2 Airbags, Navigation, Steering Switches, Rear Camera,
                          ABS, 9.0" Infotainment
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xl" fw="bold">
                          PKR 5,969,000
                        </Text>
                        <Text c="#E90808">
                          Get Corolla Altis X Manual 1.6 On Road Price
                        </Text>
                      </Table.Td>
                      <Table.Td align="center">
                        <Checkbox labelPosition="left" />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Flex justify="space-between">
                          <Text fw={500} size="md" c="#E90808">
                            Toyota Corolla Altis X Manual 1.6
                            <Text c="dimmed">1600 cc, Manual, Petrol</Text>
                          </Text>
                          <Text>Delivery Time: 1 Month</Text>
                        </Flex>
                        <Text mt="sm" c="dimmed">
                          2 Airbags, Navigation, Steering Switches, Rear Camera,
                          ABS, 9.0" Infotainment
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xl" fw="bold">
                          PKR 5,969,000
                        </Text>
                        <Text c="#E90808">
                          Get Corolla Altis X Manual 1.6 On Road Price
                        </Text>
                      </Table.Td>
                      <Table.Td align="center">
                        <Checkbox labelPosition="left" />
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                <Text c="#E90808" mt="lg">
                  Toyota Corolla 2022 Price
                  <Text span inherit mx="xs" c="dark">
                    |
                  </Text>
                  Toyota Corolla 2021 Price
                  <Text span inherit mx="xs" c="dark">
                    |
                  </Text>
                  Toyota Corolla 2020 Price
                  <Text span inherit mx="xs" c="dark">
                    |
                  </Text>
                  Toyota Corolla 2019 Price
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Pros and Cons Section */}
        <Box
          component="section"
          className="pros-const-section bg-light"
          py="xl"
        >
          <Box className="container" py="xl">
            <Box className="row">
              <Box className="col-lg-12">
                <Paper p="xl" shadow="0px 4px 20px 0px #00000014" radius="sm">
                  <Title mb="lg" order={3}>
                    Toyota Corolla 2023{" "}
                    <Text span inherit className="text-primary">
                      Pros & Cons
                    </Text>
                  </Title>
                  <Box className="row">
                    <Box className="col-lg-6">
                      <Flex align="center" mb="md">
                        <ThemeIcon
                          variant="light"
                          color="green"
                          radius="xl"
                          mr="sm"
                        >
                          <FaThumbsUp />
                        </ThemeIcon>
                        <Title order={4} fw={600}>
                          What we like
                        </Title>
                      </Flex>
                      <List
                        spacing="xs"
                        size="sm"
                        center
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="white"
                            size={rem(18)}
                          >
                            <IconCheck
                              style={{ width: rem(18), height: rem(18) }}
                            />
                          </ThemeIcon>
                        }
                      >
                        <List.Item>Availability of Spare Parts</List.Item>
                        <List.Item>Comfortable Ride Quality</List.Item>
                        <List.Item>User Friendly Infotainment System</List.Item>
                        <List.Item>High Resale Value</List.Item>
                      </List>
                    </Box>
                    <Box className="col-lg-6">
                      <Flex align="center" mb="md">
                        <ThemeIcon
                          variant="light"
                          color="red"
                          radius="xl"
                          mr="sm"
                        >
                          <FaThumbsDown />
                        </ThemeIcon>
                        <Title order={4} fw={600}>
                          What we don't like
                        </Title>
                      </Flex>
                      <List
                        spacing="xs"
                        size="sm"
                        center
                        icon={
                          <ThemeIcon color="red" variant="white" size={rem(24)}>
                            <CloseIcon
                              style={{ width: rem(24), height: rem(24) }}
                            />
                          </ThemeIcon>
                        }
                      >
                        <List.Item>
                          12th Generation has been Launched Globally.
                        </List.Item>
                        <List.Item>
                          Same Generation from over 8 Years.
                        </List.Item>
                        <List.Item>Poor Road Grip</List.Item>
                        <List.Item>No Rear AC Vents.</List.Item>
                      </List>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Detail Overview For the requested Car */}
        <Box component="section" className="detail-overview" py="xl">
          <Box className="container" py="xl">
            <Box className="row">
              <Box className="col-lg-12">
                <Paper p="xl" shadow="0px 4px 20px 0px #00000014" radius="sm">
                  <Title mb="lg" order={3}>
                    Toyota Corolla 2023{" "}
                    <Text span inherit className="text-primary">
                      Overview
                    </Text>
                  </Title>
                  <Box className="has-typography">
                    <Title order={4}>Introduction:</Title>
                    <Text>
                      Toyota Corolla 2023 is a series of compact sedans produced
                      by the Japanese manufacturer Toyota. With its comfort,
                      sleek design, and good performance, it has gained a huge
                      following around the world. Introduced in 1966, it has
                      become one of the best-selling cars worldwide. The latest
                      generation available in Pakistan is the 11th generation,
                      with the 12th generation being introduced globally but not
                      yet available in Pakistan.
                    </Text>
                    <Title order={4}>History:</Title>
                    <Text>
                      Toyota came to Pakistan in 1989 as a joint venture company
                      and launched the first Toyota Corolla in Pakistan in 1993.
                      It has since remained Pakistan's favorite car throughout
                      the years. The 7th generation Corolla was the first to be
                      locally assembled in Pakistan and instantly took over the
                      market. It was produced in Pakistan until 2002, the
                      longest period for a locally assembled Toyota model in the
                      world. In 1995, Toyota introduced the 8th generation
                      Corolla with major upgrades, including a brand new
                      four-cylinder 1.8-liter DOHC aluminum-body engine and a
                      rounder exterior. The 9th generation Corolla was launched
                      in 2000 with advanced security features such as anti-lock
                      brakes, stability control, and traction control system, as
                      well as a revolutionized sleek design. The 10th generation
                      Corolla was introduced in Pakistan in 2009 with a wide
                      variety of engine options ranging from 1.3 liters and 1.8
                      liters for the petrol variant and 2.0-liter for the diesel
                      variant. Its sales have grown exponentially since its
                      introduction, with an increase of 82.51 percent seen in
                      2021 alone.
                    </Text>
                    <Title order={4}>Features and Specs:</Title>
                    <Text>
                      Toyota Corolla's key features include fuel efficiency,
                      comfortable ride, and affordability. Its latest generation
                      in Pakistan offers a variety of options, including the
                      1.6-liter Altis, the 1.8-liter Altis Grande, and the
                      hybrid variant. The 1.6-liter Altis comes with a manual or
                      CVT transmission, while the 1.8-liter Altis Grande comes
                      with a CVT transmission. The hybrid variant offers a
                      1.8-liter engine with an electric motor, providing a
                      combined output of 121 horsepower. Other notable features
                      include a touchscreen infotainment system, keyless entry,
                      push-button start, automatic climate control, and advanced
                      safety features such as seven airbags, vehicle stability
                      control, and hill-start assist.
                    </Text>
                    <Title order={4}>Price:</Title>
                    <Text>
                      The price of Toyota Corolla 2023 in Pakistan ranges from
                      PKR 6,169,000 for the base variant Altis X Manual 1.6 to
                      PKR 7,799,000 for the top of the line Altis Grande X CVT-i
                      1.8 Black Interior variant. These prices of Toyota Corolla
                      in Pakistan are ex-factory.
                    </Text>
                    <Title order={4}>Toyota Corolla 2023:</Title>
                    <Text>
                      The 11th generation Corolla 2023 is the latest in
                      Pakistan. It had its design reimagined with a futuristic
                      exterior and more spacious interior. Its production
                      started in 2013, and it went through two face-lifts, one
                      in 2017 and the other in 2023. The latest 11th generation
                      Toyota Corolla comes in six different variants.
                    </Text>
                    <Text>
                      The 1.3L variants of the 11th generation Toyota Corolla
                      were discontinued in 2019. Pakistan is one of the few
                      countries where the 1.3L variant was introduced, which was
                      a huge hit but IMC discontinued it and replaced it with
                      Toyota Yaris. Meanwhile, Toyota Corolla received a
                      face-lift in 2017 initially and then again in 2021.
                    </Text>
                    <Text>
                      The 2017 upgrades included minor changes such as chrome
                      addition to front and rear bumper along with seatbelt
                      alert, auto-dimming rear view mirror and straightforward
                      infotainment options. The 2023 modifications in Toyota
                      Altis X 1.6 Special Edition only came as refreshers as
                      there were no major changes introduced. Instead, a choice
                      of beige and all black interior has been provided.
                    </Text>
                    <Title order={4}>Toyota Corolla 2023 Exterior:</Title>
                    <Text>
                      Toyota Corolla 11th Generation exterior features a brand
                      new modern and premium design language. The front end
                      houses sleek narrow side swept headlights, a large grille
                      with a chrome accent and a trapezium air intake. The rear
                      end has sleek sharp side swept tail lights, a large rear
                      bumper, and a chrome trim piece running the length of the
                      trunk. The Altis 1.8L CVTi stands out with an X Package
                      Emblem at the rear end. All variants of the Toyota Corolla
                      11th Generation feature almost identical styling. Toyota
                      Corolla exterior has a unique design language that allows
                      it to stand out amongst others in its class. The Special
                      Edition also has a sunroof while the X Package has a
                      sunroof, moonroof and fog lights.
                    </Text>
                    <Title order={4}>Toyota Corolla Interior:</Title>
                    <Text>
                      Toyota Corolla 11th Generation interior comprises of black
                      and beige plastic trim pieces. There is a choice of opting
                      for an all black interior in the Corolla Altis Grande 11th
                      Generation. The front and rear seats in Altis 1.8L CVTi
                      are covered in ivory fabric while those in Altis Grande
                      come in leather. Standard features of the base variant
                      include air conditioning, infotainment system, power
                      steering, Eco meter and tachometer. The higher variants
                      have further useful features to improve safety and
                      navigation such as satellite navigation, multifunction
                      steering wheel switches, cruise control, front and rear
                      camera, paddle shift, hill start assist and traction
                      control.Some other features include leather upholstery,
                      glove box lamp and rear USB charging point. Moreover, the
                      rear seats can be split to increase cargo space. Toyota
                      Corolla 11th Generation cabin is very spacious, practical
                      and luxurious. A notable improvement is the addition of
                      two front airbags for better safety. The seatbelt warning
                      is also included in the new upgrades as well as
                      auto-dimming rear view mirror is installed for a more
                      comfortable driving experience in the dark.The latest
                      inclusion of a push-button start/stop option in Toyota
                      Corolla 11th Generation makes it more modern. The upgrades
                      also include straightforward infotainment controls and
                      standard Android Auto for a fun-filled ride. The X package
                      also has vehicle stability control and driving modes.
                    </Text>
                    <Title order={4}>Toyota Corolla 2023 Exterior:</Title>
                    <Text>
                      Toyota Corolla 11th Generation exterior features a brand
                      new modern and premium design language. The front end
                      houses sleek narrow side swept headlights, a large grille
                      with a chrome accent and a trapezium air intake. The rear
                      end has sleek sharp side swept tail lights, a large rear
                      bumper, and a chrome trim piece running the length of the
                      trunk. The Altis 1.8L CVTi stands out with an X Package
                      Emblem at the rear end. All variants of the Toyota Corolla
                      11th Generation feature almost identical styling. Toyota
                      Corolla exterior has a unique design language that allows
                      it to stand out amongst others in its class. The Special
                      Edition also has a sunroof while the X Package has a
                      sunroof, moonroof and fog lights.
                    </Text>
                    <Title order={4}>Corolla Engine:</Title>
                    <Text>
                      The Toyota Corolla 2023 sedan has a 1.8 litre
                      four-cylinder base engine which produces 138 horsepower @
                      6,100 rpm and 173 Nm of torque @ 4000 rpm. It also uses
                      standard continuously variable automatic (CVT) to send
                      power to the front wheels.The other option available is
                      the 1.6-liter four-cylinder which generates 120 hp @ 6000
                      rpm and a torque of 154 Nm @ 5200 rpm. It has a 4-speed
                      automatic transmission. The I-4 cylinder engine has low
                      fuel consumption which makes it a suitable option for
                      daily use. Both the variants have dual VVTI technology.
                    </Text>
                    <Title order={4}>Corolla Mileage:</Title>
                    <Text>
                      Toyota Corolla 2023 can achieve a mileage of 12 km/L  in
                      the city and 14 km/L on the highway which is a fairly good
                      mileage for a sedan car.
                    </Text>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Detail Specificatrion */}
        <Box
          component="section"
          className="pros-const-section bg-light"
          py="xl"
        >
          <Box className="container" py="xl">
            <Box className="row">
              <Box className="col-lg-12">
                <Flex justify="space-between" align="center">
                  <Title mb="lg" order={2}>
                    Toyota Corolla 2024{" "}
                    <Text span inherit className="text-primary">
                      Specifications
                    </Text>
                  </Title>
                  <Anchor href="#" underline="hover" className="text-primary">
                    Toyota Corolla Specifications
                  </Anchor>
                </Flex>
              </Box>
              <Box className="col-lg-12">
                <Paper shadow="0px 4px 20px 0px #00000014" radius="sm" mb="md">
                  <Box className="row">
                    <Box className="col-lg-12">
                      <ScrollContainer pt="sm">
                        <Table verticalSpacing="md" horizontalSpacing="md">
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td c="dimmed">Price</Table.Td>
                              <Table.Td>28.5 - 44.0 lacs</Table.Td>
                              <Table.Td c="dimmed">Body Type</Table.Td>
                              <Table.Td>Sedan</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td c="dimmed">
                                Dimensions (Length x Width x Height)
                              </Table.Td>
                              <Table.Td>4620 x 1775 x 1475 mm</Table.Td>
                              <Table.Td c="dimmed">Ground Clearance</Table.Td>
                              <Table.Td>0 - 175 mm</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td c="dimmed">Displacement</Table.Td>
                              <Table.Td>1298 - 1800 cc</Table.Td>
                              <Table.Td c="dimmed">Transmission</Table.Td>
                              <Table.Td>Manual & Automatic</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td c="dimmed">Horse Power</Table.Td>
                              <Table.Td>84 - 138 hp</Table.Td>
                              <Table.Td c="dimmed">Torque</Table.Td>
                              <Table.Td>121 - 173 Nm</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td c="dimmed">Boot Space</Table.Td>
                              <Table.Td>470 L</Table.Td>
                              <Table.Td c="dimmed">Kerb Weight</Table.Td>
                              <Table.Td>0 - 1320 KG</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td c="dimmed">Fuel Type</Table.Td>
                              <Table.Td>Petrol</Table.Td>
                              <Table.Td c="dimmed">Mileage</Table.Td>
                              <Table.Td>8 - 16 KM/L</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td c="dimmed">Fuel Tank Capacity</Table.Td>
                              <Table.Td>55 L</Table.Td>
                              <Table.Td c="dimmed">Seating Capacity</Table.Td>
                              <Table.Td>5 - Persons</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td c="dimmed">Top Speed</Table.Td>
                              <Table.Td>180 - 240 KM/H</Table.Td>
                              <Table.Td c="dimmed">Tyre Size</Table.Td>
                              <Table.Td>195/65/R15</Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </ScrollContainer>
                    </Box>
                  </Box>
                </Paper>
                <Anchor className="text-primary float-end" href="#">
                  View Corolla Brochure
                </Anchor>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Broswse Videos Section */}
        <BrowseVideos />

        {/* Latest Reviews Section */}
        <Box component="section" className="latest-reviews bg-light py-5">
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
        </Box>

        {/* Popular New Cars */}
        <Box component="section" className="popular-new-cars py-5">
          <div className="container">
            <div className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  Toyota Corolla 2023{" "}
                  <Text span c="#E90808" inherit>
                    Competitors
                  </Text>
                </Title>
              </Box>
              {[...Array(8).keys()].map((_, index) => {
                return (
                  <Box className="col-md-3">
                    <Card
                      shadow="0px 4px 20px 0px #00000014"
                      pb="xl"
                      pt="0"
                      px="0"
                      mb="xl"
                    >
                      <Image
                        p="lg"
                        pt="xl"
                        src="/find-cars/img-square.png"
                        height={130}
                        alt="Mehran"
                        className="img-fluid"
                      />

                      <Flex direction="column" align="center" gap="xs">
                        <Title order={5} fw={500} c="#E90808">
                          Toyota Corolla
                        </Title>
                        <Text fw={600} fs="xl">
                          Rs 54.79 - 75.49 Lacs
                        </Text>
                        <Flex align="center" justify="center" gap="xs">
                          <Rating defaultValue={2} />
                          <Text span inherit>
                            (3/5)
                          </Text>
                        </Flex>
                      </Flex>
                    </Card>
                  </Box>
                );
              })}
            </div>
          </div>
        </Box>

        {/* Comparison Products Section */}
        <ComparisonProducts />

        {/* Cars For Sale */}
        <Box component="section" className="upcoming-cars py-5">
          <div className="container">
            <div className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  Used Toyota Corolla 2023 for{" "}
                  <Text span c="#E90808" inherit>
                    Sale in Pakistan
                  </Text>
                </Title>
              </Box>
              {[...Array(8).keys()].map((_, index) => {
                return (
                  <Box className="col-md-3">
                    <Card
                      shadow="0px 4px 20px 0px #00000014"
                      pb="xl"
                      pt="0"
                      px="0"
                      mb="xl"
                    >
                      <Image
                        p="lg"
                        pt="xl"
                        src="/find-cars/img-square.png"
                        height={130}
                        alt="Mehran"
                        className="img-fluid"
                      />

                      <Flex direction="column" align="center" gap="xs">
                        <Title order={5} fw={500} c="#E90808">
                          Toyota Corolla
                        </Title>
                        <Text fw={600} fs="xl">
                          Rs 54.79 - 75.49 Lacs
                        </Text>
                        <Text span inherit>
                          Lahore
                        </Text>
                      </Flex>
                    </Card>
                  </Box>
                );
              })}
            </div>
          </div>
        </Box>

        {/* News Section */}
        <Box component="section" className="news-section bg-light py-5" mb="xl">
          <Box className="container">
            <Box className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  Toyota Corolla 2023{" "}
                  <Text span c="#E90808" inherit>
                    News
                  </Text>
                </Title>
              </Box>
            </Box>
            <Box className="row">
              <Box className="col-md-3">
                <Card bg="transparent" padding={0}>
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                      radius="md"
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md">
                    <Anchor href="#">
                      <Title fw={600} order={5} lineClamp={2} c="dark">
                        Toyota Announced Installment Offers
                      </Title>
                    </Anchor>

                    <Text size="sm" c="dimmed">
                      After the downtrend in country’s economic charts has
                      eroded purchasing power of inflation-stricken masses, the
                      car
                    </Text>
                  </Group>
                </Card>
              </Box>
              <Box className="col-md-3">
                <Card bg="transparent" padding={0}>
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
                      radius="md"
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md">
                    <Anchor href="#">
                      <Title fw={600} order={5} lineClamp={2} c="dark">
                        Toyota Announced Installment Offers
                      </Title>
                    </Anchor>

                    <Text size="sm" c="dimmed">
                      After the downtrend in country’s economic charts has
                      eroded purchasing power of inflation-stricken masses, the
                      car
                    </Text>
                  </Group>
                </Card>
              </Box>
              <Box className="col-md-3">
                <Card bg="transparent" padding={0}>
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
                      radius="md"
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md">
                    <Anchor href="#">
                      <Title fw={600} order={5} lineClamp={2} c="dark">
                        Toyota Announced Installment Offers
                      </Title>
                    </Anchor>

                    <Text size="sm" c="dimmed">
                      After the downtrend in country’s economic charts has
                      eroded purchasing power of inflation-stricken masses, the
                      car
                    </Text>
                  </Group>
                </Card>
              </Box>
              <Box className="col-md-3">
                <Card bg="transparent" padding={0}>
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                      radius="md"
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md">
                    <Anchor href="#">
                      <Title fw={600} order={5} lineClamp={2} c="dark">
                        Toyota Announced Installment Offers
                      </Title>
                    </Anchor>

                    <Text size="sm" c="dimmed">
                      After the downtrend in country’s economic charts has
                      eroded purchasing power of inflation-stricken masses, the
                      car
                    </Text>
                  </Group>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
        <FAQ title="Toyota Corolla 2023" titleSpan="FAQs" />
      </section>
    </>
  );
};

export default NewCarsDetail;
