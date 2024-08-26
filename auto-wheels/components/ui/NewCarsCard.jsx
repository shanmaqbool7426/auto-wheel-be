import React from 'react'

const NewCarsCard = () => {
  return (
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

    <Flex direction="column" align="center" gap="xs">
      <Title order={5} fw={500} c="#E90808">
        Toyota Corolla
      </Title>
      <Text fw={600} fs="xl">
        Rs 54.79 - 75.49 Lacs
      </Text>
      <Flex align="center" justify="center" gap="xs">
        <Rating defaultValue={2} />
        <Text span inherit>
          (3/5)
        </Text>
      </Flex>
    </Flex>
  </Card>  )
}

export default NewCarsCard