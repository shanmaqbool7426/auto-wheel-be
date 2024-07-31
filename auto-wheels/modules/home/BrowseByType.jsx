import { GearsHandle } from "@/components/Icons";
import CarCard from "@/components/ui/CarCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";

import car_sp_1 from "../../public/cars/special-car-1.png";
import car_sp_2 from "../../public/cars/special-car-2.png";
import car_sp_3 from "../../public/cars/special-car-3.png";
import car_sp_4 from "../../public/cars/special-car-4.png";
import car_sp_5 from "../../public/cars/special-car-5.png";
import car_sp_6 from "../../public/cars/special-car-5.png";
import { Box, Pagination } from "@mantine/core";
const BrowseByType = ({ bg, pagination }) => {
  return (
    <section className={`browse-type-section py-5 ${bg ? bg : ""}`}>
      <Box className="container">
        <Box className="row">
          <Box className="col">
            <Box className="d-flex align-items-center justify-content-between">
              <h3 className="category-title fw-bold mb-0">
                Browse by
                <span className="text-primary ms-1">Type</span>
              </h3>
              <ul className="nav nav-pills gap-2" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="nav-link "
                    id="cars-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-cars"
                  >
                    Cars
                  </button>
                </li>
                <li>
                  <button
                    className="nav-link "
                    id="bike-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-bike"
                  >
                    Bike
                  </button>
                </li>

                <li>
                  <button
                    className="nav-link "
                    id="truck-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-truck"
                  >
                    Truck
                  </button>
                </li>
              </ul>
            </Box>
          </Box>
          <Box className="col-lg-12">
            <Box className="tab-content mt-4" id="pills-tabContent">
              <Box
                className="tab-pane fade show active"
                id="pills-home"
                tabindex="0"
              >
                <Box className="row">
                  {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    return (
                      <Box className="col-lg-4" key={index}>
                        <CarCard index={index} images={item} />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
          {pagination ? (
            <Box className="col-lg-12">
              <Pagination
                total={10}
                color="#EB2321"
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </section>
  );
};

export default BrowseByType;
