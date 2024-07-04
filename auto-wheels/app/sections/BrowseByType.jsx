import { GearsHandle } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";

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
                  {[1, 2, 3, 4, 5, 6].map((_, index) => {
                    return (
                      <div className="col-lg-4" key={index}>
                        <div className="card product-card">
                          <Image
                            src="/products/product-placeholder.png"
                            className="card-img-top object-fit-cover img-fluid"
                            alt="..."
                            width={270}
                            height={160}
                          />
                          <div className="progress-bars">
                            <span className="single-bar active"></span>
                            <span className="single-bar"></span>
                            <span className="single-bar"></span>
                          </div>
                          <div class="card-body">
                            <div className="product-content">
                              <Link
                                href={"#"}
                                className="d-inline-block w-50 lc-2 product-title"
                              >
                                Kia Sportage Brand New Model
                              </Link>
                              <div className="product-price">Rs 7,400,000</div>
                            </div>
                            <div className="product-meta">
                              <div className="meta-info d-flex justify-content-between align-items-center">
                                <span className="text-muted d-flex align-items-center gap-1">
                                  <FaCalendarDays /> 2021
                                </span>
                                <span className="text-muted d-flex align-items-center gap-1">
                                  <GearsHandle /> Automatic
                                </span>
                                <span className="text-muted d-flex align-items-center gap-1">
                                  <FaLocationDot /> Automatic
                                </span>
                              </div>
                              <div className="stock-info d-flex justify-content-between align-items-center mt-2">
                                <span>
                                  <span className="text-muted">stock#</span> 324
                                </span>
                                <span className="text-muted">
                                  <FaClock /> (Updated 1 month ago)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
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
