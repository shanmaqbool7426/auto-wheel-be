import { Box, Card, Flex, Image, Text, Title } from "@mantine/core";
import React from "react";

const UpcomingCars = ({ reviewsText, reviewRating }) => {
  return (
    <Box component="section" className="upcoming-cars py-5">
      <Box className="container">
        <Box className="row">
          <Box className="col-md-12" mb="xl">
            <Title order={2}>
              Upcoming{" "}
              <Text span c="#E90808" inherit>
                Cars
              </Text>
            </Title>
          </Box>
          {[...Array(8).keys()].map((_, index) => {
            return (
              <Box className="col-lg-3 col-md-4 col-sm-6" key={index}>
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

                  <Flex direction="column" align="center" gap="xs" px="lg">
                    <Title order={5} fw={500} c="#E90808">
                      Toyota Corolla
                    </Title>
                    {reviewRating ? (
                      reviewRating
                    ) : (
                      <Text fw={600} fs="xl">
                        Rs 54.79 - 75.49 Lacs
                      </Text>
                    )}

                    <Text span inherit>
                      {reviewsText ? reviewsText : "(Launched Expected 2024*)"}
                    </Text>
                  </Flex>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingCars;
