import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Image,
  Modal,
  Paper,
  rem,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import NextImage from "next/image";
import personal from "../../public/auth/personal.svg";
import dealer_icon from "../../public/auth/dealer_icon.svg";
import SocialsLogin from "./SocialsLogins";

const AccountTypeModal = ({ opened, onClose }) => {
  const [activeType, setActiveType] = useState("personal");
  const [modalOpened, setModalOpened] = useState(false);

  const handleAccountTypeClick = (type) => {
    setModalOpened(true);
    setActiveType(type);
    onClose();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        centered
        size="35%"
        padding="xl"
      >
        <Title order={3} fw={600} tt="uppercase" ta="center" pb="lg">
          Choose Account Type
        </Title>
        <Grid>
          <Grid.Col span={6}>
            <Paper
              p="lg"
              radius="md"
              // className={`account-type-box ${
              //   activeType === "personal" ? "active" : ""
              // }`}
              className="account-type-box"
              onClick={() => handleAccountTypeClick("personal")}
            >
              <Flex align="flex-start" gap="md">
                <NextImage
                  src={personal}
                  alt="Personal Account"
                  width={30}
                  height={30}
                />

                <Box>
                  <Title fw={600} order={5}>
                    Personal Account
                  </Title>
                  <Text size="sm" mt="3">
                    If you work individual or Want to Browse Listings
                  </Text>
                </Box>
              </Flex>
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper
              onClick={() => handleAccountTypeClick("dealer")}
              className="account-type-box"
              p="lg"
              radius="md"
            >
              <Flex align="flex-start" gap="md">
                <NextImage
                  src={dealer_icon}
                  alt="Personal Account"
                  width={30}
                  height={30}
                />

                <Box>
                  <Title fw={600} order={5}>
                    Dealer Account
                  </Title>
                  <Text size="sm" mt="3">
                    For Official or Private Dealers who have bulk Listings
                  </Text>
                </Box>
              </Flex>
            </Paper>
          </Grid.Col>
        </Grid>
      </Modal>

      <SocialsLogin
        socialOpened={modalOpened}
        socialOnClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default AccountTypeModal;
