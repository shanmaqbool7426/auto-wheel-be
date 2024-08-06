import React from "react";
import { Box, Pagination } from "@mantine/core";
import CarCard from "@/components/ui/CarCard";

const BrowseByType = ({ bg, pagination, vehicles }) => (
  <section className={`browse-type-section py-5 ${bg || ""}`}>
    <Box className="container">
      <Box className="row">
        <Box className="col">
          <Box className="d-flex align-items-center justify-content-between">
            <h3 className="category-title fw-bold mb-0">
              Browse by <span className="text-primary ms-1">Type</span>
            </h3>
            <ul className="nav nav-pills gap-2" id="pills-tab" role="tablist">
              {['All', 'Cars', 'Bike', 'Truck'].map((type, index) => (
                <li key={index} className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${index === 0 ? 'active' : ''}`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-${type.toLowerCase()}`}
                  >
                    {type}
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
  </section>
);

export default BrowseByType;
