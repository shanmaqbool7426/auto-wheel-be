"use client";
import { Box, Title, SimpleGrid, Anchor } from "@mantine/core";
import Link from "next/link";
import React from "react";

const QuickLinks = ({ titlePopular, titleUsed }) => {
  return (
    <section className="quick-links py-5">
      <Box className="container">
        <SimpleGrid cols={1} mb="md">
          <Title order={3}>{titlePopular ? titlePopular : "Popular Used Trucks"}</Title>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 2, sm: 2, md: 6, lg: 6, xl: 6 }} spacing="md">
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Isuzu a for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                JS forland Wagon R for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Hino for Sale
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Honda City for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Toyota Land Cruiser for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Toyota Aqua for Sale
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Toyota Prado for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Daihatsu Move for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Suzuki Swift for Sale
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Honda Civic for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Suzuki Alto for Sale
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Suzuki Mehran for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Daihatsu Cuore for Sale
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Suzuki Cultus for Sale
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Toyota Prius for Sale
              </Anchor>
            </li>
          </ul>
        </SimpleGrid>

        {/* Used Car Links */}
        <SimpleGrid cols={1} mb="md" mt="md">
          <Title order={3}>{titleUsed ? titleUsed : "Used Cars by City"}</Title>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 2, sm: 2, md: 6, lg: 6, xl: 6 }} spacing="md">
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Lahore
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Mardan
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Abbottabad
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Karachi
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Peshawar
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Swabi
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Rawalpindi
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Multan
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Sargodha
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Islamabad
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Sialkot
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Faisalabad
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Bahawalpur
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Sukkur
              </Anchor>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Gujranwala
              </Anchor>
            </li>
            <li>
              <Anchor component={Link} href="#" underline="never">
                Used Trucks Gujrat
              </Anchor>
            </li>
          </ul>
        </SimpleGrid>
      </Box>
    </section>
  );
};

export default QuickLinks;
