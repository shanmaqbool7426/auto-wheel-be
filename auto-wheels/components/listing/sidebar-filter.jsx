import React, { Fragment } from "react";
import { CarParts, ResetFiltersIcon, SearchWithCar } from "@/components/Icons";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const ListingFilter = () => {
  return (
    <Fragment>
      <div className="card filter-card mb-4">
        <div className="card-header">
          <div className="card-title">
            <SearchWithCar />
            <h5 className="mb-0">Search Options</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="input-with-icon mb-4">
            <span className="icon">
              <FaLocationDot />
            </span>
            <input
              type="text"
              placeholder="Enter your city"
              className="location-input form-control"
            />
          </div>
          <div className="form-group mb-3">
            <select class="form-select" aria-label="Default select example">
              <option selected>Condition</option>
              <option value="1">Certified Used</option>
              <option value="2">New</option>
              <option value="3">Used</option>
            </select>
          </div>
          <div className="form-group">
            <select class="form-select" aria-label="Default select example">
              <option selected>Make</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          {/* Checkbox Filters */}
          <div className="checkbox-group-filters">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Suzuki" />
              <label class="form-check-label" for="Suzuki">
                Suzuki
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Honda" />
              <label class="form-check-label" for="Honda">
                Honda
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="KIA" />
              <label class="form-check-label" for="KIA">
                KIA
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Mercedes" />
              <label class="form-check-label" for="Mercedes">
                Mercedes
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="BMW" />
              <label class="form-check-label" for="BMW">
                BMW
              </label>
              <div className="count">17,556</div>
            </div>
          </div>

          <div className="form-group my-4">
            <select class="form-select" aria-label="Default select example">
              <option selected>Model</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          {/* Checkbox Filters */}
          <div className="checkbox-group-filters">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Wagon R" />
              <label class="form-check-label" for="Wagon R">
                Wagon R
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Alto" />
              <label class="form-check-label" for="Alto">
                Alto
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Mehran" />
              <label class="form-check-label" for="Mehran">
                Mehran
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Bolan" />
              <label class="form-check-label" for="Bolan">
                Bolan
              </label>
              <div className="count">17,556</div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="Swift" />
              <label class="form-check-label" for="Swift">
                Swift
              </label>
              <div className="count">17,556</div>
            </div>
          </div>

          {/* Custom Range Slider */}
          <div className="range-slider">
            <div className="slider">
              <label for="milage_rabge_slider" class="form-label">
                Mileage
              </label>
              <input type="range" class="form-range" id="milage_rabge_slider" />
            </div>
            <div className="range-inputs">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      name="range_slider_input_min"
                      placeholder="100"
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      placeholder="20000"
                      name="range_slider_input_max"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="range-slider">
            <div className="slider">
              <label for="price_rabge_slider" class="form-label">
                Price
              </label>
              <input type="range" class="form-range" id="price_rabge_slider" />
            </div>
            <div className="range-inputs">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      name="range_slider_input_min"
                      placeholder="100"
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      placeholder="20000"
                      name="range_slider_input_max"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="range-slider">
            <div className="slider">
              <label for="yearly_rabge_slider" class="form-label">
                Year
              </label>
              <input type="range" class="form-range" id="yearly_rabge_slider" />
            </div>
            <div className="range-inputs">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      name="range_slider_input_min"
                      placeholder="100"
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      placeholder="20000"
                      name="range_slider_input_max"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="extended-filters">
            <div className="form-group mb-3">
              <select class="form-select" aria-label="Default select example">
                <option selected>Transmission</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select class="form-select" aria-label="Default select example">
                <option selected>Drive</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select class="form-select" aria-label="Default select example">
                <option selected>Exterior Color</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select class="form-select" aria-label="Default select example">
                <option selected>Fuel Type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary reset-all-filters d-flex justify-content-center align-items-center gap-2 py-2">
              <ResetFiltersIcon /> Reset All
            </button>
          </div>
        </div>
      </div>

      <div className="card filter-card">
        <div className="card-header">
          <div className="card-title">
            <CarParts />
            <h5 className="mb-0">Body</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="single-brand-item text-center">
                <Link href={"#"} className="text-decoration-none">
                  <Image
                    width={100}
                    height={80}
                    src="/car-body/Hatchback.svg"
                    className="mx-auto text-center"
                  />
                  <h6 className="mb-0 text-dark">Compact</h6>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="single-brand-item text-center">
                <Link href={"#"} className="text-decoration-none">
                  <Image
                    width={100}
                    height={80}
                    src="/car-body/coupe.svg"
                    className="mx-auto text-center"
                  />
                  <h6 className="mb-0 text-dark">Coupe</h6>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="single-brand-item text-center">
                <Link href={"#"} className="text-decoration-none">
                  <Image
                    width={100}
                    height={80}
                    src="/car-body/Sport-Cars.svg"
                    className="mx-auto text-center"
                  />
                  <h6 className="mb-0 text-dark">Crossovers</h6>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="single-brand-item text-center">
                <Link href={"#"} className="text-decoration-none">
                  <Image
                    width={100}
                    height={80}
                    src="/car-body/SUV.svg"
                    className="mx-auto text-center"
                  />
                  <h6 className="mb-0 text-dark">Off-Road</h6>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="single-brand-item text-center">
                <Link href={"#"} className="text-decoration-none">
                  <Image
                    width={100}
                    height={80}
                    src="/car-body/Pickups.svg"
                    className="mx-auto text-center"
                  />
                  <h6 className="mb-0 text-dark">Pickups</h6>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="single-brand-item text-center">
                <Link href={"#"} className="text-decoration-none">
                  <Image
                    width={100}
                    height={80}
                    src="/car-body/Sedan.svg"
                    className="mx-auto text-center"
                  />
                  <h6 className="mb-0 text-dark">Sedan</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListingFilter;
