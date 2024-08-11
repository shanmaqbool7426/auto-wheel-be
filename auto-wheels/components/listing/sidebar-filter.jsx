'use client';

import React, { Fragment } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CarParts, ResetFiltersIcon, SearchWithCar } from "@/components/Icons";
import useListingFilter from "@/custom-hooks/useListingFilter";
import { RangeSlider } from '@mantine/core';
import Image from "next/image";
const ListingFilter = ({filters, handleFilterChange, resetFilters}) => {

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
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <select
              className="form-select"
              value={filters.condition}
              onChange={(e) => handleFilterChange("condition", e.target.value)}
            >
              <option value="Condition" disabled>
                Condition
              </option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-select"
              value={filters.make}
              onChange={(e) => handleFilterChange("make", e.target.value)}
            >
              <option value="Make" disabled>
                Make
              </option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </select>
          </div>

          {/* Checkbox Filters */}
          <div className="checkbox-group-filters">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="Suzuki"
                checked={filters.make === "Suzuki"}
                onChange={() => handleFilterChange("make", "Suzuki")}
              />
              <label className="form-check-label" htmlFor="Suzuki">
                Suzuki
              </label>
              <div className="count">17,556</div>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="Honda"
                checked={filters.make === "Honda"}
                onChange={() => handleFilterChange("make", "Honda")}
              />
              <label className="form-check-label" htmlFor="Honda">
                Honda
              </label>
              <div className="count">17,556</div>
            </div>
          </div>

          {/* Remaining Filters */}
          <div className="form-group my-4">
            <select
              className="form-select"
              value={filters.model}
              onChange={(e) => handleFilterChange("model", e.target.value)}
            >
              <option value="Model" disabled>
                Model
              </option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </select>
          </div>

          {/* Custom Range Slider for Mileage */}
          <div className="range-slider">
            <label htmlFor="mileage_range_slider" className="form-label">Mileage</label>
            <RangeSlider
              className="form-range mb-3"
              id="mileage_range_slider"
              color="red"
              thumbSize={18}
              min={100}
              max={20000}
              value={filters.mileage}
              size={3}
              onChange={(value) => handleFilterChange("mileage", value)}
              styles={{ thumb: { borderWidth: 2, padding: 3, borderColor: 'white' } }}
            />
            <div className="range-inputs">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.mileage[0]}
                      onChange={(e) => handleFilterChange("mileage", [Number(e.target.value), filters.mileage[1]])}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.mileage[1]}
                      onChange={(e) => handleFilterChange("mileage", [filters.mileage[0], Number(e.target.value)])}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Custom Range Slider for Price */}
          <div className="range-slider">
            <label htmlFor="price_range_slider" className="form-label">Price</label>
            <RangeSlider
              className="form-range mb-3"
              id="price_range_slider"
              color="red"
              thumbSize={18}
              min={1200000}
              max={2000000}
              value={filters.price}
              size={3}
              onChange={(value) => handleFilterChange("price", value)}
              styles={{ thumb: { borderWidth: 2, padding: 3, borderColor: 'white' } }}
            />
            <div className="range-inputs">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.price[0]}
                      min={1200000}
                      max={filters.price[1]}
                      onChange={(e) => handleFilterChange("price", [Number(e.target.value), filters.price[1]])}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.price[1]}
                      min={filters.price[0]}
                      max={2000000}
                      onChange={(e) => handleFilterChange("price", [filters.price[0], Number(e.target.value)])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Custom Range Slider for Year */}
          <div className="range-slider">
            <label htmlFor="year_range_slider" className="form-label">Year</label>
            <RangeSlider
              className="form-range mb-3"
              id="year_range_slider"
              color="red"
              thumbSize={18}
              min={2000}
              max={2024}
              value={filters.year}
              size={3}
              onChange={(value) => handleFilterChange("year", value)}
              styles={{ thumb: { borderWidth: 2, padding: 3, borderColor: 'white' } }}
            />
            <div className="range-inputs">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.year[0]}
                      min={2000}
                      max={filters.year[1]}
                      onChange={(e) => handleFilterChange("year", [Number(e.target.value), filters.year[1]])}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.year[1]}
                      min={filters.year[0]}
                      max={2024}
                      onChange={(e) => handleFilterChange("year", [filters.year[0], Number(e.target.value)])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="extended-filters">
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.transmission}
                onChange={(e) => handleFilterChange("transmission", e.target.value)}
              >
                <option value="Transmission" disabled>
                  Transmission
                </option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.drive}
                onChange={(e) => handleFilterChange("drive", e.target.value)}
              >
                <option value="Drive" disabled>
                  Drive
                </option>
                <option value="awd">AWD</option>
                <option value="fwd">FWD</option>
                <option value="rwd">RWD</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.exteriorColor}
                onChange={(e) => handleFilterChange("exteriorColor", e.target.value)}
              >
                <option value="Exterior Color" disabled>
                  Exterior Color
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.fuelType}
                onChange={(e) => handleFilterChange("fuelType", e.target.value)}
              >
                <option value="Fuel Type" disabled>
                  Fuel Type
                </option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>
          {/* Reset Filters Button */}
          <div className="text-center mt-4">
            <button className="btn btn-danger" onClick={resetFilters}>
              <ResetFiltersIcon /> Reset Filters
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
            {[
              { src: "/car-body/Hatchback.svg", label: "Compact",value:'compact' },
              { src: "/car-body/coupe.svg", label: "Coupe",value:'coupe' },
              { src: "/car-body/Sport-Cars.svg", label: "Crossovers", value:'crossovers' },
              { src: "/car-body/SUV.svg", label: "Off-Road",value:'offroad' },
              { src: "/car-body/Pickups.svg", label: "Pickups",value:'pickups' },
              { src: "/car-body/Sedan.svg", label: "Sedan",value:'sedan' },
            ].map((bodyType) => (
              <div className="col-md-6" key={bodyType.label}>
                <div className="single-brand-item selected-brand-item text-center">
                  <label className={`text-decoration-none ${filters.bodyType === bodyType.value ? 'checked' : ''}`}>
                    <input
                      type="radio"
                      name="bodyType"
                      value={bodyType.label}
                      checked={filters.bodyType === bodyType.value}
                      onChange={() => handleFilterChange("bodyType", bodyType.value)}
                    />
                    <Image
                      width={100}
                      height={80}
                      src={bodyType.src}
                      className="mx-auto text-center"
                    />
                    <h6 className="mb-0 text-dark">{bodyType.label}</h6>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListingFilter;

