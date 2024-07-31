import { Button, Flex, Rating, Text } from "@mantine/core";

export const comparisonData = [
  {
    title: "Overview",
    isSwitchable: true,
    overviewTableData: [
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },

  {
    title: "Key Features & Specs",
    isSwitchable: false,
    overviewTableData: [
      {
        featureName: "Dimensions",
        type: "icon",
        iconURL: "/compare/dimension.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        featureName: "Engine & Performance",
        type: "icon",
        iconURL: "/compare/engine-performace.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        featureName: "Transmission",
        type: "icon",
        iconURL: "/compare/transmission.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        featureName: "Wheels & Tyres",
        type: "icon",
        iconURL: "/compare/suspension.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        type: "icon",
        featureName: "Wheels & Tyres",
        iconURL: "/compare/wheels.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        type: "icon",
        featureName: "Fuel Consumptions",
        iconURL: "/compare/fuel.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        type: "icon",
        featureName: "Safety",
        iconURL: "/compare/safety.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        type: "icon",
        featureName: "Exterior",
        iconURL: "/compare/exterior.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        isRowSelected: true,
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
        isRowSelected: true,
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        type: "icon",
        featureName: "Entertainment & Communications",
        iconURL: "/compare/communication.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
  {
    overviewTableData: [
      {
        type: "icon",
        featureName: "Comfort & Convenience",
        iconURL: "/compare/comfort.svg",
      },
      {
        type: "Size",
        first: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        second: "12` 7″ L x 5` 8″ W x 4` 12″ H",
        third: "12` 7″ L x 5` 8″ W x 4` 12″ H",
      },
      {
        type: "Mileage",
        first: "12 - 15 Km/l",
        second: "9 - 11 Km/l",
        third: "15 - 18 Km/l",
      },
      {
        type: "Engine",
        first: "1197 cc",
        second: "2755 cc",
        third: "1199 cc",
      },
      {
        type: "No. of Airbags",
        first: "6",
        second: "3",
        third: "6",
      },
      {
        type: "User Rating",
        first: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        second: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
        third: (
          <Flex align="center" justify="center" gap="xs">
            <Rating defaultValue={3} count={5} />
            <Text fw={600}>3.5</Text>
          </Flex>
        ),
      },
      {
        type: "Transmission",
        first: "Automatic",
        second: "Automatic",
        third: "Automatic",
      },
      {
        type: "Anti-lock Braking System",
        first: "Yes",
        second: "Yes",
        third: "Yes",
      },
      {
        type: "Trunk Space",
        first: "265 L",
        second: "0 L",
        third: "434 L",
      },
      {
        type: "Brochure",
        first: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        second: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
        third: (
          <Button variant="outline" fw={500} color="#E90808">
            Download Brochure
          </Button>
        ),
      },
    ],
  },
];
