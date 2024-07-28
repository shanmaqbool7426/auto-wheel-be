import { GearsHandle } from "@/components/Icons";
import CarCard from "@/components/ui/CarCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";

import car_sp_1 from "../../public/cars/special-car-1.png"
import car_sp_2 from "../../public/cars/special-car-2.png"
import car_sp_3 from "../../public/cars/special-car-3.png"
import car_sp_4 from "../../public/cars/special-car-4.png"
import car_sp_5 from "../../public/cars/special-car-5.png"
import car_sp_6 from "../../public/cars/special-car-5.png"
const BrowseByType = () => {
  return (
    <section className="browse-type-section py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
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
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tab-content mt-4" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                tabindex="0"
              >
                <div className="row">
                  {[car_sp_1,car_sp_2,car_sp_3,car_sp_4,car_sp_5,car_sp_6].map((item, index) => {
                    return (
                      <div className="col-lg-4" key={index}>
                     <CarCard index={index} images={item}/>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByType;
