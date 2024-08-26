"use client";
import React from 'react'
import {
  Anchor,
  Box,
  Group,
  Badge,
  Button,
  Card,
  Title,
  Input,
  Select,
  Text,
  Image,
  Flex,
  Rating,
  rem,
  Grid,
  Tabs,
} from "@mantine/core";
import {
  CarComparisonSmall,
  CarSmall,
  GearsHandle,
  SmallReviewIcon,
} from "@/components/Icons";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = () => {
  return (
    <Box className="search-wrapper-card" mt="xl">
    <Card
      shadow="0px 4px 20px 0px #00000014"
      padding="lg"
      radius="md"
    >
      <Title order={3} mb="md">
        Find New Cars in Pakistan
      </Title>
      <div className="row mb-2">
        <div className="col-md-3">
          <Input
            size="md"
            radius="md"
            placeholder="Search by Car Make or Model"
            leftSection={<IconSearch size={16} />}
          />
        </div>
        <div className="col-md-3">
          <Select
            size="md"
            radius="md"
            leftSection={<GearsHandle />}
            placeholder="Choose Make"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </div>
        <div className="col-md-3">
          <Select
            size="md"
            radius="md"
            placeholder="Choose Make"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </div>
        <div className="col-md-3">
          <Button
            fullWidth
            size="md"
            radius="md"
            bg="#E90808"
            leftSection={<IconSearch size={16} />}
          >
            Search
          </Button>
        </div>
      </div>
    </Card>
  </Box>  )
}

export default SearchBar