import { PlayButton } from "@/components/Icons";
import { Anchor, Card, Flex, Text, Title, Image, Box } from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";

const BrowseVideos = () => {
  return (
    <section className="browse-videos bg-white py-5">
      <Box className="container">
        <Box className="row">
          <Box className="col-12">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2}>
                Browse Our{" "}
                <Text span c="#E90808" inherit>
                  Videos
                </Text>
              </Title>
              <Anchor component={Link} href="#" c="#E90808">
                View all Videos
              </Anchor>
            </Flex>
          </Box>
        </Box>
        <Box className="row">
          <Box className="col-lg-6">
            <Card
              // component={Link}
              padding={0}
              // href="#"
              target="_blank"
              className="video-thumbnail"
            >
              <Card.Section className="position-relative">
                <span className="play-button position-absolute">
                  <PlayButton />
                </span>
                <Image
                  src="/videos/thumbnail.png"
                  radius="md"
                  h={400}
                  className="img-fluid"
                  alt="No way!"
                />
              </Card.Section>
              <Title
                order={3}
                lineClamp={1}
                truncate
                mt="xs"
                fw={600}
                className="title"
              >
                Honda BR-V S 2020 Facelift Detail Review | Price and
                Specifications
              </Title>
            </Card>
          </Box>
          <Box className="col-lg-6">
            <Box className="row">
              {[...Array(4).keys()].map((_, index) => {
                return (
                  <Box className="col-lg-6" key={index}>
                    <Card
                    mb="xs"
                      component={Link}
                      padding={0}
                      href="#"
                      target="_blank"
                      className="video-thumbnail video-thumbnail-sm"
                    >
                      <Card.Section className="position-relative">
                        <span className="play-button position-absolute">
                          <PlayButton />
                        </span>
                        <Image
                          src="/videos/thumbnail.png"
                          radius="sm"
                          className="img-fluid"
                          alt="No way!"
                        />
                      </Card.Section>
                      <Title
                        order={5}
                        lineClamp={1}
                        mt="5"
                        fw={600}
                        className="title"
                      >
                        Honda BR-V S 2020 Facelift Detail Review | Price and
                        Specifications
                      </Title>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default BrowseVideos;
