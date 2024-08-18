"use client";
import AccountTypeModal from "@/modules/auth/AccountType";
import NextImage from "next/image";
import Link from "next/link";
import {
  useMantineTheme,
  UnstyledButton,
  Group,
  ThemeIcon,
  Loader,
  rem,
  HoverCard,
  Center,
  Box,
  Anchor,
  Text,
  Divider,
  SimpleGrid,
  Button,
  Burger,
  Drawer,
  ScrollArea,
  Collapse,
  List,
  Title,
  Image,
  NavLink,
} from "@mantine/core";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [modalOpened, setModalOpened] = useState(false);
  const { data: session, status } = useSession();
  const firstColMegaMenuLinks = [
    {
      icon: <Image w={16} h={16} mt={3} src="/megamenu/new-car.svg" />,
      title: "New Cars",
      description: "Find new cars in Pakistan",
    },
    {
      icon: <Image w={16} h={16} mt={3} src="megamenu/used-cars.svg" />,
      title: "Used Cars",
      description: "Find new cars in Pakistan",
    },
    {
      icon: <Image w={16} h={16} mt={3} src="megamenu/featured-cars.svg" />,
      title: "Featured Used Cars",
      description: "Find new cars in Pakistan",
    },
    {
      icon: <Image w={16} h={16} mt={3} src="megamenu/sell-cars.svg" />,
      title: "Sell Your Cars",
      description: "Find new cars in Pakistan",
    },
  ];
  const secondColMegaMenuLinks = [
    {
      title: "Suzuki Cars",
    },
    {
      title: "Honda Cars",
    },
    {
      title: "Toyota Cars",
    },
    {
      title: "KIA Cars",
    },
    {
      title: "MG Cars",
    },
    {
      title: "Hyundai Cars",
    },
  ];
  const thirdColMegaMenuLinks = [
    {
      title: "Suzuki Alto",
    },
    {
      title: "Honda Civic",
    },
    {
      title: "Toyota Corolla",
    },
    {
      title: "KIA Sportage",
    },
    {
      title: "Suzuki Wagon R",
    },
    {
      title: "Toyota Yaris",
    },
  ];

  const firstColLinks = firstColMegaMenuLinks?.map((item) => (
    <UnstyledButton component={Link} href="#">
      <Group wrap="nowrap" gap="xs" align="flex-start" className="subLink">
        {item.icon}
        <div>
          <Title order={6} fw={500}>
            {item.title}
          </Title>
          <Text size="sm" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  const secondColLinks = (
    <>
      <Group align="center" mb="xs" gap={10}>
        <Image w={15} h={15} src="megamenu/popular-brands.svg" />
        <Title order={6} fw={500}>
          Popular Brands
        </Title>
      </Group>
      <List listStyleType="none" withPadding>
        {secondColMegaMenuLinks?.map((item) => (
          <List.Item mb="xs">
            <Anchor component={Link} c="dark" href="#" size="sm">
              {item.title}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </>
  );
  const thirdColLinks = (
    <>
      <Group align="center" mb="xs" gap={10}>
        <Image w={15} h={15} src="megamenu/popular-car.svg" />
        <Title order={6} fw={500}>
          Popular New Cars
        </Title>
      </Group>
      <List listStyleType="none" withPadding>
        {thirdColMegaMenuLinks?.map((item) => (
          <List.Item mb="xs">
            <Anchor component={Link} c="dark" href="#" size="sm">
              {item.title}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </>
  );

  // Show a loading spinner while session is being fetched
  if (status === "loading") {
    return (
      <header className="site-header bg-white py-3 theme-header">
        <nav className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <Link href="/" className="p-1">
                <Image
                  width={163}
                  height={27}
                  src="/logo.png"
                  quality={100}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="col-lg-10">
              <div className="text-end">
                <Loader size="sm" />
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <>
      {/* <header className="site-header bg-white py-3 theme-header">
        <nav className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <Link href="/" className="p-1">
                <Image
                  width={163}
                  height={27}
                  src="/logo.png"
                  quality={100}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="header-navigation text-center">
                <ul className="list-unstyled list-inline mb-0 mx-auto">
                  <li className="list-inline-item dropdown">
                    <NavLink>Cars</NavLink>
                    <Link href={"/listing/cars/search/-/"}>Cars</Link>
                  </li>
                  <li className="list-inline-item dropdown">
                    <Link href={"/listing/bikes/search/-/"}>Bike</Link>
                  </li>
                  <li className="list-inline-item dropdown">
                    <Link href={"/listing/trucks/search/-/"}>Truck</Link>
                  </li>
                  <li className="list-inline-item dropdown">
                    <Link href={"/blogs"}>Blogs</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <Stack direction="horizontal" gap={2} className="ms-auto">
                {session ? (
                  <>
                    <Avatar
                      src={session.user.image}
                      alt={session.user.name}
                      radius="xl"
                      size="sm"
                    />
                    <span>{session.user.name}</span>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setModalOpened(true)}
                    >
                      Login
                    </button>
                  </>
                )}
                <button className="btn btn-primary">Post an Ad</button>
              </Stack>
            </div>
          </div>
        </nav>
      </header> */}
      <Box component="header" className="header">
        <Box className="container h-100">
          <Group justify="space-between" h="100%">
            <Image
              width={163}
              height={27}
              src="/logo.png"
              quality={100}
              alt="Logo"
            />
            <Group h="100%" gap={0} visibleFrom="sm">
              <HoverCard
                withArrow
                offset={0}
                radius="sm"
                shadow="0px 4px 20px 0px #00000014"
                withinPortal
              >
                <HoverCard.Target>
                  <Link href="/listing/cars/search/-/" className="link">
                    <Center inline>
                      <Box component="span" mr={3}>
                        Car
                      </Box>
                      <IconChevronDown
                        style={{
                          width: rem(14),
                          height: rem(14),
                          marginTop: rem(2),
                        }}
                      />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown
                  style={{ overflow: "hidden" }}
                  p="lg"
                  className="megamenu-card-dropdown"
                >
                  <SimpleGrid cols={3} spacing="md">
                    <Box className="border-end" pr="md">
                      {firstColLinks}
                    </Box>
                    <Box className="border-end">{secondColLinks}</Box>
                    <Box>{thirdColLinks}</Box>
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <HoverCard
                withArrow
                offset={0}
                radius="sm"
                shadow="0px 4px 20px 0px #00000014"
                withinPortal
              >
                <HoverCard.Target>
                  <Link href="/listing/bikes/search/-/" className="link">
                    <Center inline>
                      <Box component="span" mr={3}>
                        Bike
                      </Box>
                      <IconChevronDown
                        style={{
                          width: rem(14),
                          height: rem(14),
                          marginTop: rem(2),
                        }}
                      />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown
                  style={{ overflow: "hidden" }}
                  p="lg"
                  className="megamenu-card-dropdown"
                >
                  <SimpleGrid cols={3} spacing="md">
                    <Box className="border-end" pr="md">
                      {firstColLinks}
                    </Box>
                    <Box className="border-end">{secondColLinks}</Box>
                    <Box>{thirdColLinks}</Box>
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <HoverCard
                withArrow
                offset={0}
                radius="sm"
                shadow="0px 4px 20px 0px #00000014"
                withinPortal
              >
                <HoverCard.Target>
                  <Link href="/listing/trucks/search/-/" className="link">
                    <Center inline>
                      <Box component="span" mr={3}>
                        Truck
                      </Box>
                      <IconChevronDown
                        style={{
                          width: rem(14),
                          height: rem(14),
                          marginTop: rem(2),
                        }}
                      />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown
                  style={{ overflow: "hidden" }}
                  p="lg"
                  className="megamenu-card-dropdown"
                >
                  <SimpleGrid cols={3} spacing="md">
                    <Box className="border-end" pr="md">
                      {firstColLinks}
                    </Box>
                    <Box className="border-end">{secondColLinks}</Box>
                    <Box>{thirdColLinks}</Box>
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <Anchor component={Link} href="#" className="link">
                <Center inline>Blog</Center>
              </Anchor>
            </Group>
            <Group visibleFrom="sm">
              <Button
                tt="uppercase"
                variant="outline"
                color="#E90808"
                autoContrast
                ff="heading"
              >
                Login
              </Button>
              <Button color="#E90808" autoContrast ff="heading" tt="uppercase">
                Post an Ad
              </Button>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Box>
      </Box>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link className="link" href="#">
            Home
          </Link>
          <UnstyledButton onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{firstColLinks}</Collapse>
          <Link href="#" className="link">
            Learn
          </Link>
          <Link href="#" className="link">
            Academy
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>

      <AccountTypeModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default Header;
