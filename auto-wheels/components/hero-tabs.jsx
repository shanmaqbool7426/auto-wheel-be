import React from "react";
import { CarFrontView, MotorBike, Truck } from "@/components/Icons";
import {
  Anchor,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  Input,
  List,
  Modal,
  Paper,
  ScrollArea,
  Tabs,
  Title,
} from "@mantine/core";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const HeroTabs = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tabs color="pink" radius="xs" defaultValue="cars" autoContrast>
        <Tabs.List grow justify="center">
          <Tabs.Tab value="cars" leftSection={<CarFrontView />} c="#6c757d">
            Car
          </Tabs.Tab>
          <Tabs.Tab
            value="bikes"
            leftSection={<MotorBike />}
            c="#6c757d"
            onClick={open}
          >
            Bike
          </Tabs.Tab>
          <Tabs.Tab value="trucks" leftSection={<Truck />} c="#6c757d">
            Truck
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cars" p="xs">
          <Input placeholder="Car Make or Model" size="md" mt="lg" />
          <Input placeholder="Enter Your Location" size="md" mt="lg" />
          <Button
            mt="lg"
            fullWidth
            size="md"
            ff="heading"
            tt="uppercase"
            color="#E90808"
          >
            Search
          </Button>
          <Group justify="end" mt="sm">
            <Button
              component={Link}
              href="#"
              rightSection={<BsArrowRight />}
              variant="transparent"
              px={0}
              fw={500}
              tt="uppercase"
              color="#E90808"
              ff="heading"
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>
        <Tabs.Panel value="bikes" p="xs">
          <Input placeholder="Car Make or Model" size="md" mt="lg" />
          <Input placeholder="Enter Your Location" size="md" mt="lg" />
          <Button
            mt="lg"
            fullWidth
            size="md"
            ff="heading"
            tt="uppercase"
            color="#E90808"
          >
            Search
          </Button>
          <Group justify="end" mt="sm">
            <Button
              component={Link}
              href="#"
              rightSection={<BsArrowRight />}
              variant="transparent"
              px={0}
              fw={500}
              tt="uppercase"
              color="#E90808"
              ff="heading"
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>
        <Tabs.Panel value="trucks" p="xs">
          <Input placeholder="Car Make or Model" size="md" mt="lg" />
          <Input placeholder="Enter Your Location" size="md" mt="lg" />
          <Button
            mt="lg"
            fullWidth
            size="md"
            ff="heading"
            tt="uppercase"
            color="#E90808"
          >
            Search
          </Button>
          <Group justify="end" mt="sm">
            <Button
              component={Link}
              href="#"
              rightSection={<BsArrowRight />}
              variant="transparent"
              px={0}
              fw={500}
              tt="uppercase"
              color="#E90808"
              ff="heading"
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>
      </Tabs>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="50%"
        padding={0}
      >
        <Paper
          clasName="saerch-modal-header"
          p="xs"
          shadow="0px 2px 5px 0px #00000014"
        >
          <Center>
            <Button color="#E90808" size="xs" mr="md">
              Make
            </Button>
            <Button
              variant="subtle"
              bg="#F3F3F3"
              color="#878787"
              size="xs"
              mr="md"
              autoContrast
            >
              Model
            </Button>
            <Button
              variant="subtle"
              bg="#F3F3F3"
              color="#878787"
              size="xs"
              mr="md"
              autoContrast
            >
              Variants
            </Button>
          </Center>
        </Paper>
        <Grid gutter={0}>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Make"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              Popular
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/honda-sm.svg" />}
                >
                  Honda <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/kia-sm.svg" />}
                >
                  Kia <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/bmw-sm.svg" />}
                >
                  BMW <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/hyundai-sm.svg" />}
                >
                  Hyundai <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/acura-sm.svg" />}
                >
                  Acura <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/nissan-sm.svg" />}
                >
                  Toyota <BsArrowRight />
                </List.Item>
              </List>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Model"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              All Models
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                <List.Item className="search-dropdown-lists__item">
                  Honda Civic <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda City <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda BR-V <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda HR-V <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda Accord <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda Accord <BsArrowRight />
                </List.Item>
              </List>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Variant"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              2022-2023
            </Title>
            <ScrollArea
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                <List.Item className="search-dropdown-lists__item">
                  Standard <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  RS <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Oriel <BsArrowRight />
                </List.Item>
              </List>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
};

export default HeroTabs;
