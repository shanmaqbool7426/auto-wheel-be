import { Anchor, Box, Button, Card, Image, Text, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <Box className="background-search-verlay" mb={{base: 400,md:200}}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <nav className="mt-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Anchor href="#">Bikes</Anchor>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Anchor href="#">New Bikes</Anchor>
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-md-12">
          <Box className="search-wrapper-card" mt="xl">
            <Card
              shadow="0px 4px 20px 0px #00000014"
              padding="lg"
              radius="md"
            >
              <Title order={3} mb="md">
                Toyota 2023 Car Models, Prices & Pictures in Pakistan
              </Title>
              <div className="row mb-2">
                <div className="col-md-3">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Image
                      p="lg"
                      pt="xl"
                      src="/find-cars/img-square.png"
                      height={130}
                      alt="Mehran"
                      className="img-fluid"
                    />
                    <Link href="#">Toyota PriceList</Link>
                  </Card>
                </div>
                <div className="col-md-9">
                  <Text inherit>
                    The prices of a Toyota Car in Pakistan start from PKR 4,399,000.0 for a new Toyota Yaris to PKR 156,829,000.0 for a new Toyota Land Cruiser. There are currently 12 new car models available at Toyota dealerships across Pakistan.
                    Toyota Cars are also widely available in used conditions starting from PKR 180,000 for a used Toyota Corolla to PKR 145,000,000 for a used Toyota Land Cruiser. There are a total of 26648 Toyota Cars available for sale in Pakistan on PakWheels.
                  </Text>
                  <Button
                    size="md"
                    radius="md"
                    bg="#E90808"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          </Box>
        </div>
      </div>
    </div>
  </Box>
  )
}

export default Header
