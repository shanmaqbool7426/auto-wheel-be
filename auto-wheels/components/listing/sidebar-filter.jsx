'use client';

import React, { Fragment,useState } from "react";

import { FaLocationDot,FaSearchengin } from "react-icons/fa6";
import {  ResetFiltersIcon, SearchWithCar } from "@/components/Icons";
// const { fetchedData, filters, pagination, handlePaginationChange, handleFilterChange, resetFilters,handleSortChange } = useListingFilter({ type: 'params.slug' });

import { Accordion, RangeSlider } from '@mantine/core';
import Image from "next/image";
import { getBodyTypesByVehicleType, getMakeTypesByVehicleType, getVehicleModelsByMakeAndType, getVehiclePartsIconByVehicleType, vehicleConditionOptions, vehicleDriveOptions, vehicleExteriorColorOptions, vehicleFuelTypeOptions, vehicleTransmissionOptions } from "@/constants/vehicle-constants"
import useListingFilter from "@/custom-hooks/useListingFilter";
const ListingFilter = ({ type, handleFilterChange, resetFilters }) => {
  const [filters, setFilters] = useState({
    city: [],
    search:"",
    condition: [],
    make: [],
    model: [],
    mileage: [100, 2000000],
    price: [1200000, 2000000],
    year: [2000, 2024],
    transmission: [],
    drive: [],
    exteriorColor: [],
    fuelType: [],
    bodyType: [],
  });

  const handleCheckboxChange = (filterType, value, isChecked) => {
    const newFilters = { ...filters };
    
    if (isChecked) {
      newFilters[filterType].push(value);
    } else {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }

    setFilters(newFilters);
    updateCustomUrl(newFilters);
  };

  const updateCustomUrl = (params) => {
    let customUrl = '/listing/cars/search/-/';
    
    // Add cities
    if (params.cities.length) {
      params.cities.forEach(city => {
        customUrl += `ct_${city.toLowerCase()}/`;
      });
    }

    // Add areas
    if (params.areas.length) {
      params.areas.forEach(area => {
        customUrl += `ca_${area.toLowerCase().replace(/ /g, '-')}/`;
      });
    }
    router.push(customUrl, { scroll: false });
  };

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
              <FaSearchengin />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="location-input form-control"
              value={filters.search}
              // onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div className="input-with-icon mb-4">
            <span className="icon">
              <FaLocationDot />
            </span>
            <input
              type="text"
              placeholder="Enter your city"
              className="location-input form-control"
              value={filters.city}
              onChange={(e) => handleCheckboxChange("cities", e.target.value, e.target.checked)}
            />
            {/* handleCheckboxChange('cities', 'Islamabad', e.target.checked) */}
          </div>
          <div className="form-group mb-3">
            <select
              className="form-select"
              value={filters.condition}
              // onChange={(e) => handleFilterChange("condition", e.target.value)}
            >
              <option value="Condition" disabled>
                Condition
              </option>
              {vehicleConditionOptions.map((condition)=>(
              <option value={condition.value}>{condition.label}</option>
              ))}
            </select>
          </div>

          {/* Checkbox Filters */}
          <Accordion variant="separated" radius="md" defaultValue="Make">
            <Accordion.Item size='sm' value='Make' style={{ background: 'white', borderColor:'#E3E3E3' }}>
              <Accordion.Control>Make</Accordion.Control>
              <Accordion.Panel>          <div className="checkbox-group-filters">
                {getMakeTypesByVehicleType(type)?.map(make => (
                  <div className="form-check" key={make.value}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={make.label}
                      checked={filters.make.includes(make.value)}
                      // onChange={() => handleFilterChange("make", make.value)}
                    />
                    <label className="form-check-label" htmlFor={make.label}>
                      {make.label}
                    </label>
                    <div className="count">17,556</div>
                  </div>
                ))}
              </div></Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          {/* Remaining Filters */}
          <Accordion variant="separated" radius="md" defaultValue="Model" className="mt-3">
            <Accordion.Item size='sm' value='Model' style={{ background: 'white', borderColor:'#E3E3E3' }}>
              <Accordion.Control>Model</Accordion.Control>
              <Accordion.Panel>          <div className="checkbox-group-filters">
                {getVehicleModelsByMakeAndType(filters.make,type)?.map(model => (
                  <div className="form-check" key={model.value}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={model.label}
                      checked={filters.model.includes(model.value)}
                      // onChange={() => handleFilterChange("model", model.value)}
                    />
                    <label className="form-check-label" htmlFor={model.label}>
                      {model.label}
                    </label>
                    <div className="count">17,556</div>
                  </div>
                ))}
              </div></Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          {/* <div className="form-group my-4">
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
          </div> */}

          {/* Custom Range Slider for Mileage */}
          <div className="range-slider">
            <label htmlFor="mileage_range_slider" className="form-label">Mileage</label>
            <RangeSlider
              className="form-range mb-3"
              id="mileage_range_slider"
              color="red"
              thumbSize={18}
              min={100}
              max={2000000}
              value={filters.mileage}
              size={3}
              // onChange={(value) => handleFilterChange("mileage", value)}
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
                      // onChange={(e) => handleFilterChange("mileage", [Number(e.target.value), filters.mileage[1]])}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.mileage[1]}
                      // onChange={(e) => handleFilterChange("mileage", [filters.mileage[0], Number(e.target.value)])}
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
              // onChange={(value) => handleFilterChange("price", value)}
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
                      // onChange={(e) => handleFilterChange("price", [Number(e.target.value), filters.price[1]])}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.price[1]}
                      min={filters.price[0]}
                      max={2000000}
                      // onChange={(e) => handleFilterChange("price", [filters.price[0], Number(e.target.value)])}
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
              // onChange={(value) => handleFilterChange("year", value)}
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
                      // onChange={(e) => handleFilterChange("year", [Number(e.target.value), filters.year[1]])}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.year[1]}
                      min={filters.year[0]}
                      max={2024}
                      // onChange={(e) => handleFilterChange("year", [filters.year[0], Number(e.target.value)])}
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
                // onChange={(e) => handleFilterChange("transmission", e.target.value)}
              >
                <option value="Transmission" disabled>
                  Transmission
                </option>
                {vehicleTransmissionOptions.map((transmission,index)=>(
                <option value={transmission.value} key={index}>{transmission.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.drive}
                // onChange={(e) => handleFilterChange("drive", e.target.value)}
              >
                <option value="Drive" disabled>
                  Drive
                </option>
                {vehicleDriveOptions.map((drive,index)=>(
                <option value={drive.value} key={index}>{drive.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.exteriorColor}
                // onChange={(e) => handleFilterChange("exteriorColor", e.target.value)}
              >
                <option value="Exterior Color" disabled>
                  Exterior Color
                </option>
                {vehicleExteriorColorOptions.map((color,index)=>(
                <option value={color.value} key={index}>{color.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.fuelType}
                // onChange={(e) => handleFilterChange("fuelType", e.target.value)}
              >
                <option value="Fuel Type" disabled>
                  Fuel Type
                </option>
                {vehicleFuelTypeOptions.map((fuel,index)=>(
                <option value={fuel.value} key={index}>{fuel.label}</option>
                ))}
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
            {getVehiclePartsIconByVehicleType(type)}
            <h5 className="mb-0">Body</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {getBodyTypesByVehicleType(type).map((bodyType) => (
              <div className="col-md-6" key={bodyType.label}>
                <div className="single-brand-item selected-brand-item text-center">
                  <label className={`text-decoration-none ${filters.bodyType === bodyType.value ? 'checked' : ''}`}>
                    <input
                      type="radio"
                      name="bodyType"
                      value={bodyType.label}
                      checked={filters.bodyType === bodyType.value}
                      // onChange={() => handleFilterChange("bodyType", bodyType.value)}
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

