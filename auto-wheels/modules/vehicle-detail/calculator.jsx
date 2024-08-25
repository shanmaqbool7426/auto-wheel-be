"use client";
import { useState, useEffect } from "react";
import { Group, Title, Badge, Slider, Text, Button, Image } from "@mantine/core";
import ViewLoanBreakup from "@/components/ui/ViewLoanBreakup";

function EMICalculator({ data }) {
  const [loanAmount, setLoanAmount] = useState(100000);  // Setting a default loan amount for example
  const [interestRate, setInterestRate] = useState(14.5);
  const [duration, setDuration] = useState(4);
  const [emi, setEmi] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [downPayment, setDownPayment] = useState(0);
  const [loanPayment, setLoanPayment] = useState(0);
  const [interestPayment, setInterestPayment] = useState(0);
  const [payablePayment, setPayablePayment] = useState(0);
  const [yearWiseEMI, setYearWiseEMI] = useState([]);

  // Utility function to format price
  const formatPrice = (price) => price.toLocaleString("en-IN");

  // EMI calculation function
  const calculateEMI = () => {
    const principalAmount = loanAmount; // P
    const monthlyInterestRate = interestRate / 12 / 100; // R
    const totalMonths = duration * 12; // N

    // EMI Calculation formula
    const emiValue = (principalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / 
                     (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    setEmi(Math.round(emiValue));

    // Calculate other payments and year-wise EMI breakdown
    calculateLoanBreakup(principalAmount, monthlyInterestRate, totalMonths, emiValue);
  };

  const calculateLoanBreakup = (principalAmount, monthlyInterestRate, totalMonths, emiValue) => {
    const downPaymentAmount = (data?.price || 470000) - principalAmount;  // Correctly calculating down payment
    setDownPayment(downPaymentAmount);

    const totalPayment = emiValue * totalMonths;
    const loanAmountAfterDownPayment = principalAmount;
    const totalInterest = totalPayment - loanAmountAfterDownPayment;
    setInterestPayment(Math.round(totalInterest));
    setPayablePayment(Math.round(totalPayment));
    setLoanPayment(loanAmountAfterDownPayment);

    // Calculate year-wise EMI breakdown
    calculateYearWiseEMI(loanAmountAfterDownPayment);
  };

  const calculateYearWiseEMI = (principalAmount) => {
    const yearlyEMI = [];
    for (let year = 1; year <= 5; year++) {
      const tenureMonths = year * 12;
      const monthlyInterestRate = interestRate / 12 / 100;
      const emiValue = (principalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) / 
                       (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
      const totalInterest = (emiValue * tenureMonths) - principalAmount;
      yearlyEMI.push({
        tenure: year,
        interestAmount: Math.round(totalInterest),
        emi: Math.round(emiValue),
      });
    }
    setYearWiseEMI(yearlyEMI);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, duration]);

  return (
    <>
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
                    min={0}
                    max={18}
                    step={0.1}
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
                        className={`duration-btn ${year === duration ? "active" : ""}`}
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
                          onClick={() => setShowModal(true)}
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
      {/* Pass computed values to `ViewLoanBreakup` */}
      <ViewLoanBreakup
        opened={showModal}
        close={() => setShowModal(false)}
        loanAmount={loanAmount}
        interestRate={interestRate}
        tenureYears={duration}
        emiAmount={emi}
        downPayment={downPayment}
        loanPayment={loanPayment}
        interestPayment={interestPayment}
        payablePayment={payablePayment}
        yearWiseEMI={yearWiseEMI}
      />
    </>
  );
}

export default EMICalculator;
