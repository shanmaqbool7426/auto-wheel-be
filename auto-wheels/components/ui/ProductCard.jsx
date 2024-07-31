import {
  Anchor,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Progress,
  rem,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { GearsHandle, CameraIcon } from "@/components/Icons";
import { IconStar } from "@tabler/icons-react";
import Link from "next/link";
import { FaCalendarDays, FaClock, FaLocationDot } from "react-icons/fa6";

const ProductCard = ({ bg }) => {
  return (
    <Card padding="none" mb="lg" bg={bg ? bg : ""}>
      <Card.Section className="position-relative">
        <Flex
          align="center"
          className="position-absolute"
          c="white"
          style={{ top: rem(15), left: rem(15) }}
        >
          <CameraIcon />
          <Text span ml="5">
            5
          </Text>
        </Flex>

        <IconStar
          color="white"
          stroke={2}
          className="position-absolute"
          style={{ bottom: "25px", left: "15px" }}
        />

        <Image
          radius="md"
          src="/products/product-placeholder.png"
          className="img-fluid"
        />
        <Group gap="10" grow mt="5">
          <Progress radius="0" color="#EB2322" size="sm" value={100} />
          <Progress radius="0" color="#EB2322" size="sm" value={0} />
          <Progress radius="0" color="#EB2322" size="sm" value={0} />
        </Group>
      </Card.Section>
      <Box className="product-content" pt="md">
        <Title order={5} fw={600} lineClamp={2}>
          <Anchor
            component={Link}
            inherit
            href="#"
            underline="never"
            className="text-decoration-none text-dark"
          >
            USED 2.0 L 2016 Toyota Yaris..
          </Anchor>
        </Title>
        <Box className="product-price">Rs 7,400,000</Box>
      </Box>
      <Box className="product-meta">
        <Box className="meta-info d-flex justify-content-between align-items-center">
          <Text span className="text-muted d-flex align-items-center gap-1">
            <FaCalendarDays /> 2021
          </Text>
          <Text span className="text-muted d-flex align-items-center gap-1">
            <GearsHandle /> Automatic
          </Text>
          <Text span className="text-muted d-flex align-items-center gap-1">
            <FaLocationDot /> Automatic
          </Text>
        </Box>
        <Box className="stock-info d-flex justify-content-between align-items-center mt-2">
          <Text span className="text-muted">
            Stock#
          </Text>{" "}
          324
          <Text span className="text-muted">
            <FaClock /> (Updated 1 month ago)
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
