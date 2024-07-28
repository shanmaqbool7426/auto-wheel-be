'use client'

import ListingFilter from "@/components/listing/sidebar-filter";
import { FaList } from "react-icons/fa";
import ListCardView from "../../../components/ui/ListCardView";
import { BsGridFill } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

import CarCard from "../../../components/ui/CarCard";
import car_sp_1 from "../../../public/cars/special-car-1.png";
import car_sp_2 from "../../../public/cars/special-car-2.png";
import car_sp_3 from "../../../public/cars/special-car-3.png";
import car_sp_4 from "../../../public/cars/special-car-4.png";
import car_sp_5 from "../../../public/cars/special-car-5.png";
import car_sp_6 from "../../../public/cars/special-car-5.png";
import car_1 from "../../../public/cars/car-1.png";
import car_2 from "../../../public/cars/car-2.png";
import car_3 from "../../../public/cars/car-3.png";
import car_4 from "../../../public/cars/car-4.png";
import car_5 from "../../../public/cars/car-1.png";

import bike_sp_1 from "../../../public/bikes/bike-spcial-1.png";
import bike_sp_2 from "../../../public/bikes/bike-spcial-2.png";
import bike_sp_3 from "../../../public/bikes/bike-spcial-3.png";
import bike_sp_4 from "../../../public/bikes/bike-spcial-4.png";
import bike_sp_5 from "../../../public/bikes/bike-spcial-5.png";
import bike_1 from "../../../public/bikes/bike-1.png";
import bike_2 from "../../../public/bikes/bike-2.png";
import bike_3 from "../../../public/bikes/bike-3.png";
import bike_4 from "../../../public/bikes/bike-4.png";

import truck_sp_1 from "../../../public/trucks/truck-special-1.png";
import truck_sp_2 from "../../../public/trucks/truck-special-2.png";
import truck_sp_3 from "../../../public/trucks/truck-special-3.png";
import truck_sp_4 from "../../../public/trucks/truck-special-4.png";
import truck_1 from "../../../public/trucks/truck-1.png";
import truck_2 from "../../../public/trucks/truck-2.png";
import truck_3 from "../../../public/trucks/truck-3.png";

export default function ProductListing({ params }) {
  console.log('ProductListing>>>', params.slug);
  const [view, setView] = useState('grid');

  const carImages = [car_sp_1, car_sp_2, car_sp_3, car_sp_4, car_sp_5, car_sp_6, car_1, car_2, car_3, car_4, car_5];
  const bikeImages = [bike_sp_1, bike_sp_2, bike_sp_3, bike_sp_4, bike_sp_5, bike_1, bike_2, bike_3, bike_4];
  const truckImages = [truck_sp_1, truck_sp_2, truck_sp_3, truck_sp_4, truck_1, truck_2, truck_3];

  let images = [];
  let categoryTitle = '';

  switch (params.slug) {
    case 'cars':
      images = carImages;
      categoryTitle = 'Cars';
      break;
    case 'bikes':
      images = bikeImages;
      categoryTitle = 'Bikes';
      break;
    case 'trucks':
      images = truckImages;
      categoryTitle = 'Trucks';
      break;
    default:
      images = carImages;
      categoryTitle = 'Cars';
  }

  return (
    <>
      <section className="product-listing py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingFilter />
            </div>
            <div className="col-lg-9">
              {/* Toolbox */}
              <div className="toolbox">
                <div className="toolbox-left">
                  <h3 className="fw-bold">
                    {categoryTitle} for <span className="text-primary">Sale</span>
                  </h3>
                </div>
                <div className="toolbox-right">
                  <div className="select-filter-listing">
                    <label htmlFor="sort_by">SORT BY:</label>
                    <div className="select-custom">
                      <select
                        className="form-select form-select-sm"
                        aria-label="Sort By"
                        id="sort_by"
                      >
                        <option selected>Date: Newest First</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid-sort-btns">
                    <button className="sort-grid active" onClick={() => setView("grid")}>
                      <BsGridFill />
                    </button>
                    <button className="sort-grid" onClick={() => setView("list")}>
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Listing Section */}
              <div className="title-section">
                <h6 className="cat-title mb-0">Featured Classified</h6>
                <Link href={"#"} className="text-primary text-decoration-none">
                  Show all
                </Link>
              </div>

              {/* Product View List */}
              <div className="row">
                {images.map((item, index) => (
                  <div key={index} className={view === 'grid' ? "col-lg-4" : "col-12"}>
                    {view === 'grid' ? (
                      <CarCard images={item} index={index} />
                    ) : (
                      <ListCardView index={index} images={item} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
