import React from 'react'

import {
    Badge,
    Button,
    Group,
    Image,
    Slider,
    Text,
    Title,
} from "@mantine/core";

const Calculator = () => {
  return (
    <div className="calc-container mt-4">
    <div className="card border-0">
      <div className="row">
        <div className="col-md-7">
          <div className="card-body">
            <h4 className="heading fw-bold">
              EMI calculator
              <p className="mt-2 text-muted fw-normal fs-6">
                Avail upto 100% of the car value in finance at
                attractive interest rates
              </p>
            </h4>
            <div className="slider-wrapper">
              <Group
                justify="space-between"
                align="center"
                mb="lg"
              >
                <Title order={3}>Loan Amount</Title>
                <Badge color="#EB2321" size="xl" radius="sm">
                  Rs 230,000
                </Badge>
              </Group>

              <Slider
                thumbSize={25}
                size="xs"
                color="#EB2321"
                value={89}
                // onChange={setValue}
                // onChangeEnd={setEndValue}
              />
              <Group justify="space-between" align="center">
                <Text mt="xs" size="lg" fw={600}>
                  Rs {34545}
                </Text>
                <Text mt="xs" size="lg" fw={600}>
                  Rs {2222222}
                </Text>
              </Group>
            </div>
            <div className="slider-wrapper">
              <Group
                justify="space-between"
                align="center"
                my="lg"
              >
                <Title order={3}>Rate of Interest</Title>
                <Badge color="#EB2321" size="xl" radius="sm">
                  18%
                </Badge>
              </Group>

              <Slider
                thumbSize={25}
                size="xs"
                color="#EB2321"
                value={44444444}
                // onChange={setValue}
                // onChangeEnd={eee}
              />
              <Group justify="space-between" align="center">
                <Text mt="xs" size="lg" fw={600}>
                  {444444}%
                </Text>
                <Text mt="xs" size="lg" fw={600}>
                  {33333}%
                </Text>
              </Group>
            </div>
            <div className="duration-wrapper mt-3">
              <Title order={3}>
                Duration
                <Text span fw="normal" ml={5}>
                  in years
                </Text>
              </Title>
              <Group mt="md" align="center">
                <button className="duration-btn">1</button>
                <button className="duration-btn">2</button>
                <button className="duration-btn active">3</button>
                <button className="duration-btn">4</button>
                <button className="duration-btn">5</button>
                <button className="duration-btn">6</button>
                <button className="duration-btn">7</button>
              </Group>
              <div className="card emi-card">
                <div className="card-body align-items-center flex-row justify-content-between">
                  <div className="left-area">
                    <Text size="md">Your Monthly EMI</Text>
                    <Title fw={600} order={2}>
                      Rs 10,475
                    </Title>
                  </div>
                  <div className="right">
                    <Button
                      variant="transparent"
                      color="#E90808"
                      size="md"
                    >
                      View Breakup
                    </Button>
                  </div>
                </div>
              </div>
              <Text c="#878787" mt="sm">
                *Interest rate and loan amount offered may vary
                subject to customer risk profile
              </Text>
              <Button
                variant="filled"
                fullWidth
                color="#E90808"
                size="lg"
                my="md"
              >
                Interested in Loan
              </Button>
              <Text>550+ customers availed the facility</Text>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <Image
            alt="My image"
            src="/calc-placeholder.svg"
            className="image-placeholder"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Calculator