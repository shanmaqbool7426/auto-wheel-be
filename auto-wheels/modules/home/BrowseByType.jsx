"use client";
import React, { useState } from "react";
import { Box, Pagination, Text, Title } from "@mantine/core";
import CarCard from "@/components/ui/CarCard";
import { fetchAPI } from "@/services/fetchAPI";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

const BrowseByType = ({ bg, pagination, vehicles: initialVehicles }) => {
  const [selectedType, setSelectedType] = useState("All");
  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const handleTypeChange = async (type) => {
    setSelectedType(type);
    const res = await fetchAPI(
      API_ENDPOINTS.VEHICLES_TYPE(type === "All" ? "" : type)
    );
    setVehicles(res || []);
  };
  return (
    <section className={`browse-type-section py-5 ${bg || ""}`}>
      <Box className="container">
        <Box className="row">
          <Box className="col">
            <Box className="d-flex align-items-center justify-content-between">
              <Title order={2}>
                Browse by{" "}
                <Text span inherit className="text-primary ms-1">
                  Type
                </Text>
              </Title>
              <ul className="nav nav-pills gap-2" id="pills-tab" role="tablist">
                {[
                  { label: "All", value: "All" },
                  { label: "Cars", value: "car" },
                  { label: "Bike", value: "bike" },
                  { label: "Truck", value: "truck" },
                ].map((type, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        selectedType === type.value ? "active" : ""
                      }`}
                      onClick={() => handleTypeChange(type.value)}
                    >
                      {type.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Box className="col-lg-12">
            <Box className="tab-content mt-4" id="pills-tabContent">
              <Box className="tab-pane fade show active" id="pills-home">
                <Box className="row">
                  {vehicles?.data?.results?.map((vehicle, index) => (
                    <Box className="col-lg-4" key={index}>
                      <CarCard index={index} vehicle={vehicle} />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="col-lg-12">
                <Box className="tab-content mt-4" id="pills-tabContent">
                  <Box className="tab-pane fade show active" id="pills-home">
                    <Box className="row">
                      {vehicles?.data?.map((vehicle, index) => (
                        <Box className="col-lg-4" key={index}>
                          <CarCard index={index} vehicle={vehicle} />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {pagination && (
                <Box className="col-lg-12">
                  <Pagination total={10} color="#EB2321" />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default BrowseByType;
