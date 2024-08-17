'use client'
import { useState, useEffect } from 'react';
import { Group, Title, Badge, Slider, Text, Button, Image } from '@mantine/core';

function EMICalculator({ data }) {
  const [loanAmount, setLoanAmount] = useState(0); // Initial value for loan amount
  const [interestRate, setInterestRate] = useState(14); // Default interest rate set to 14%
  const [duration, setDuration] = useState(4); // Default duration in years
  const [emi, setEmi] = useState(0);

  // Utility function to format price
  const formatPrice = (price) => price.toLocaleString('en-IN');

  // EMI calculation function
  const calculateEMI = () => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = duration * 12;

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(Math.round(emiValue));
  };

  // Recalculate EMI when relevant state changes
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, duration]);

  return (
    <div className="calc-container mt-4">
      <div className="card border-0">
        <div className="row">
          <div className="col-md-7">
            <div className="card-body">
              <h4 className="heading fw-bold">
                EMI calculator
                <p className="mt-2 text-muted fw-normal fs-6">
                  Avail upto 100% of the car value in finance at attractive interest rates
                </p>
              </h4>
              <div className="slider-wrapper">
                <Group justify="space-between" align="center" mb="lg">
                  <Title order={3}>Loan Amount</Title>
                  <Badge color="#EB2321" size="xl" radius="sm">
                    Rs {formatPrice(loanAmount)}
                  </Badge>
                </Group>

                <Slider
                  thumbSize={25}
                  size="xs"
                  color="#EB2321"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={0}
                  max={data?.price || 1000000}
                  step={10000}
                />
                <Group justify="space-between" align="center">
                  <Text mt="xs" size="lg" fw={600}>
                    Rs 0
                  </Text>
                  <Text mt="xs" size="lg" fw={600}>
                    Rs {formatPrice(data?.price || 1000000)}
                  </Text>
                </Group>
              </div>
              <div className="slider-wrapper">
                <Group justify="space-between" align="center" my="lg">
                  <Title order={3}>Rate of Interest</Title>
                  <Badge color="#EB2321" size="xl" radius="sm">
                    {interestRate}%
                  </Badge>
                </Group>

                <Slider
                  thumbSize={25}
                  size="xs"
                  color="#EB2321"
                  value={interestRate}
                  onChange={setInterestRate}
                  min={0} // Minimum interest rate
                  max={18} // Maximum interest rate
                  step={0.1} // Increment by 0.1%
                />
                <Group justify="space-between" align="center">
                  <Text mt="xs" size="lg" fw={600}>
                    0%
                  </Text>
                  <Text mt="xs" size="lg" fw={600}>
                    18%
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
                  {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                    <button
                      key={year}
                      className={`duration-btn ${year === duration ? 'active' : ''}`}
                      onClick={() => setDuration(year)}
                    >
                      {year}
                    </button>
                  ))}
                </Group>
                <div className="card emi-card">
                  <div className="card-body align-items-center flex-row justify-content-between">
                    <div className="left-area">
                      <Text size="md">Your Monthly EMI</Text>
                      <Title fw={600} order={2}>
                        Rs {formatPrice(emi.toFixed(2))}
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
                  *Interest rate and loan amount offered may vary subject to customer risk profile
                </Text>
                {/* <Button
                  variant="filled"
                  fullWidth
                  color="#E90808"
                  size="lg"
                  my="md"
                >
                  Interested in Loan
                </Button> */}
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
  );
}

export default EMICalculator;
