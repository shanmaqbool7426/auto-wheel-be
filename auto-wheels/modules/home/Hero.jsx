"use client";
import React, { useState } from "react";
import HeroTabs from "@/components/hero-tabs";
import { BsArrowRight } from "react-icons/bs";
import { Poppins } from "next/font/google";
import AccountTypeModal from "../auth/AccountType.jsx";
import SocialsLogin from "../auth/SocialsLogins.jsx";
// import SignIn from "../auth/SignIn.tsx"
import SignUp from "../auth/SignUp.jsx";
// import Otp from "../auth/Otp.jsx"
import {
  useMantineColorScheme,
  Button,
  Group,
  Card,
  Title,
  Text,
  Box,
  rem,
  Flex,
  Center,
  List,
  Tabs,
} from "@mantine/core";
import Link from "next/link";

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const Hero = () => {
  return (
    <>
      <Box className="hero-banner" pt={rem(60)}>
        <Box className="container">
          <Box className="row" py="xl">
            <Box className="col-lg-4 pe-5">
              <Card shadow="xl" padding={0} radius="md">
                <Box p="md" px="lg" ta="center" className="border-bottom">
                  <Title order={4} tt="uppercase">
                    Find your Right{" "}
                    <Text span inherit className="text-primary">
                      Car
                    </Text>
                  </Title>
                </Box>
                <Box p="md" px="lg">
                  <HeroTabs />
                </Box>
              </Card>
            </Box>
            <div className="col-lg-8">
              <Flex
                direction="column"
                justify="space-around"
                align="flex-start"
                h="100%"
              >
                <Box>
                  <Title size={rem(50)} mb="xl">
                    Hyundai Car Price in <br /> Pakistan 2023
                  </Title>
                  <Button
                    rightSection={<BsArrowRight />}
                    color="#E90808"
                    variant="filled"
                    fw={500}
                    size="lg"
                    tt="uppercase"
                    ff="heading"
                  >
                    Read More
                  </Button>
                </Box>
                <List
                  className="car-lists-slider"
                  listStyleType="none"
                  size="sm"
                  display="flex"
                >
                  <List.Item className="active">Hyundai Car Review</List.Item>
                  <List.Item>2023 Safari Review</List.Item>
                  <List.Item>2023 Safari Review</List.Item>
                  <List.Item>2023 Safari Review</List.Item>
                  <List.Item>2023 Safari Review</List.Item>
                  <List.Item>2023 Safari Review</List.Item>
                </List>
              </Flex>
            </div>
          </Box>
        </Box>
      </Box>
      {/* <Button onClick={() => setModalOpened(true)}>Open Modal</Button>
    <Button onClick={() => setColorScheme('dark')}>Dark</Button>
    <Button onClick={() => setColorScheme('light')}>light</Button> */}

      {/* <SocialsLogin 
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      /> */}
      {/* <AccountTypeModal 
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      /> */}
    </>
  );
};

export default Hero;
