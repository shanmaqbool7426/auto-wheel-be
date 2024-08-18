"use client";
import {
  Modal,
  Box,
  Group,
  Title,
  Flex,
  Text,
  rem,
  CloseButton,
  TextInput,
  Button,
} from "@mantine/core";
import React from "react";
import { DollarIcon } from "../Icons";

const OfferPriceModal = ({ opened, open, close }) => {
  return (
    <>
      <Modal
        opened={opened}
        size="lg"
        padding={0}
        onClose={close}
        withCloseButton={false}
      >
        <Box className="modal-header" p="xl" bg="#333" c="white">
          <Flex gap="sm" align="center">
            <DollarIcon style={{ width: rem(40), height: rem(40) }} />
            <Title order={4} fw={500}>
              OFFER PRICE
              <Text size="sm" ff="text">
                Used 2.0 L 2020 KIA Sportage
              </Text>
            </Title>
          </Flex>
          <CloseButton c="#878787" bg="transparent" ml="auto" onClick={close} />
        </Box>
        <Box className="modal-body" p="xl">
          <Box className="row g-4">
            <Box className="col-md-6">
              <TextInput label="Name" placeholder="John" />
            </Box>
            <Box className="col-md-6">
              <TextInput label="Email" placeholder="abc@gmail.com" />
            </Box>
            <Box className="col-md-6">
              <TextInput label="Phone" placeholder="+91 321 674 9854" />
            </Box>
            <Box className="col-md-6">
              <TextInput label="Trade Price" placeholder="Rs 9,750,000" />
            </Box>
            <Box className="col-md-12 text-end">
              <Button bg="#EB2321" autoContrast w={rem(150)} fw={500} size="md">
                Request
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default OfferPriceModal;
