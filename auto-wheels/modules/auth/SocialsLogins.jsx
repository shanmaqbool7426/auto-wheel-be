import React, { useState } from "react";
import { Button, Modal, Stack, Text, Title, Box, Group } from "@mantine/core";
import Image from "next/image";
import google_icon from "../../public/auth/google_icon.svg";
import car from "../../public/auth/car.svg";
import facebook_icon from "../../public/auth/facebook_icon.svg";
import email_icon from "../../public/auth/email_icon.svg";
import apple_icon from "../../public/auth/apple_icon.svg";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";
import SignUp from "./SignUp";
import { signIn } from "next-auth/react";

// import { signIn } from 'next-auth/react';

import classes from "../../app/styles/Demo.module.scss";
const SocialsLogin = ({ socialOpened, socialOnClose }) => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <Modal
        opened={socialOpened}
        onClose={socialOnClose}
        centered
        size="md"
        padding="xl"
        withCloseButton={false}
      >
        <Carousel>
          <Carousel.Slide>
            <Stack align="center" gap={0} mb="md" ta="center">
              <Image width={120} height={120} src={car} alt="Google" />
              <Title order={5} fw={600}>
                New Car Alert
              </Title>

              <Text size="sm" w="75%" mt={5} mx="auto">
                Create alerts quickly and get notified when new car available
              </Text>
            </Stack>
          </Carousel.Slide>
          <Carousel.Slide>
            <Stack align="center" gap={0} mb="md" ta="center">
              <Image width={120} height={120} src={car} alt="Google" />
              <Title order={5} fw={600}>
                New Car Alert
              </Title>

              <Text size="sm" w="75%" mt={5} mx="auto">
                Create alerts quickly and get notified when new car available
              </Text>
            </Stack>
          </Carousel.Slide>
        </Carousel>
        <Stack w="80%" mx="auto" align="stretch" justify="center" gap="xs">
          <Button
            variant="default"
            size="lg"
            ff="heading"
            leftSection={<Image src={google_icon} alt="Google" />}
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          >
            <Text size="sm" fw={600}>
              Continue with Google
            </Text>
          </Button>

          <Button
            variant="default"
            size="lg"
            ff="heading"
            leftSection={<Image src={facebook_icon} alt="Facebook" />}
            onClick={() => signIn("facebook", { redirectTo: "/dashboard" })}
          >
            <Text size="sm" fw={600}>
              Continue with Facebook
            </Text>
          </Button>
          <Button
            variant="default"
            size="lg"
            ff="heading"
            leftSection={<Image src={apple_icon} alt="Apple" />}
          >
            <Text size="sm" fw={600}>
              Continue with Apple
            </Text>
          </Button>
          <Button
            variant="default"
            size="lg"
            ff="heading"
            leftSection={<Image src={email_icon} alt="Email" />}
          >
            <Text size="sm" fw={600}>
              Continue with Email
            </Text>
          </Button>
        </Stack>

        <Text ta="center" size="md" mt="xs">
          Don't have an account?{" "}
          <Text
            span
            fw={600}
            inherit
            className="text-primary"
            onClick={() => {
              setModalOpened(true);
              socialOnClose();
            }}
          >
            Sign Up
          </Text>
        </Text>
      </Modal>
      <SignUp
        signUpOpened={modalOpened}
        signUpOnClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default SocialsLogin;
