"use client";
import { formatPrice } from "@/utils";
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  List,
  Modal,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const ViewLoanBreakup = ({
  opened,
  close,
  emiAmount,
  interestRate,
  tenureYears,
  loanAmount,
  downPayment,
  loanPayment,
  interestPayment,
  payablePayment,
  yearWiseEMI
}) => {
  return (
    <>

      <Modal
        opened={opened}
        padding="xl"
        onClose={close}
        title={
          <Title order={3} fw={600}>
            Loan Breakup
          </Title>
        }
        size="lg"
      >
        <Tabs variant="pills" defaultValue="Breakup" color="#E90808">
          <Tabs.List>
            <Tabs.Tab value="Breakup">Breakup</Tabs.Tab>
            <Tabs.Tab value="Year-wise">Year-wise</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Breakup">
            <Card withBorder padding="lg" mt="md">
              <Flex align="center" justify="space-between">
                <Box component="left-section">
                  <Text size="sm">Your monthly EMI</Text>
                  <Text fw="bolder" size="xl">
                    Rs {emiAmount}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Rate of interest @ {interestRate}% for {tenureYears} years
                  </Text>
                </Box>
                <Box component="right-section">
                  <Image src="/loan-graph.svg" alt="Graph SVG" />
                </Box>
              </Flex>
              <List spacing="lg" mt="md" listStyleType="none">
                <Flex justify="space-between" mb="md">
                  <List.Item
                    icon={
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="4" r="4" fill="#1BC744" />
                      </svg>
                    }
                    c="dimmed"
                  >
                    <Text c="dimmed">Down Payment</Text>
                  </List.Item>
                  <Text c="dimmed">Rs {formatPrice(downPayment) }</Text>
                </Flex>
                <Flex justify="space-between" mb="md">
                  <List.Item
                    c="dimmed"
                    icon={
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="4" r="4" fill="#FFC513" />
                      </svg>
                    }
                  >
                    <Text c="dimmed">Loan Payment</Text>
                  </List.Item>
                  <Text c="dimmed">Rs {formatPrice(loanPayment)}</Text>
                </Flex>
                <Flex justify="space-between" mb="md">
                  <List.Item
                    c="dimmed"
                    icon={
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="4" r="4" fill="#FFC513" />
                      </svg>
                    }
                  >
                    <Text c="dimmed">Interest Payment</Text>
                  </List.Item>
                  <Text c="dimmed">Rs {formatPrice(interestPayment)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fw={600}>Payable Payment</Text>
                  <Text fw={600}>Rs {formatPrice(loanPayment+interestPayment+downPayment)}</Text>
                </Flex>
              </List>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel value="Year-wise">
            <Card withBorder padding={0} mt="md">
              <Box component="card-header" p="lg">
                <Title fw={600} order={5} mb="5">
                  Year-wise EMI calculator
                </Title>
                <Text c="dimmed">
                  For loan amount
                  <Text c="dark" span inherit ml="sm">
                    Rs {formatPrice(loanAmount)}
                  </Text>
                </Text>
              </Box>
              <Table verticalSpacing="sm" horizontalSpacing="sm">
                <Table.Thead bg="#F3F3F3">
                  <Table.Tr>
                    <Table.Th>Tenure</Table.Th>
                    <Table.Th>Interest Amt.</Table.Th>
                    <Table.Th>EMI</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {yearWiseEMI.map((item, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{formatPrice(item.tenure)} Years</Table.Td>
                      <Table.Td>Rs {formatPrice(item.interestAmount)}</Table.Td>
                      <Table.Td>Rs {formatPrice(item.emi)}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};

export default ViewLoanBreakup;
