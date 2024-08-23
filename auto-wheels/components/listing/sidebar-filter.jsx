'use client';

import React, { Fragment, useState, useEffect, useRef } from "react";
import { FaLocationDot, FaSearchengin } from "react-icons/fa6";
import { ResetFiltersIcon, SearchWithCar } from "@/components/Icons";
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Accordion, RangeSlider } from '@mantine/core';
import Image from "next/image";
import { cities, getVehiclePartsIconByVehicleType, vehicleConditionOptions, vehicleDriveOptions, vehicleExteriorColorOptions, vehicleFuelTypeOptions, vehicleTransmissionOptions } from "@/constants/vehicle-constants"
const ListingFilter = ({ type, makes ,bodies,vehicles}) => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    query: "",
    city: [],
    search: "",
    condition: "",
    make: [],
    model: [],
    mileage: [0, 2000000],
    price: [0, 2000000000],
    year: [2000, 2024],
    transmission: "",
    drive: "",
    exteriorColor: "",
    fuelType: "",
    bodyType: [],
  });
  const router = useRouter();
  const { slug } = useParams()
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (slug && slug.length > 0) {
      const updatedFilters = { ...filters };

      slug.forEach((item) => {
        if (item.startsWith('mk_')) {
          updatedFilters.make.push(item.replace('mk_', ''));
        }
        if (item.startsWith('md_')) {
          updatedFilters.model.push(item.replace('md_', ''));
        }
        if (item.startsWith('ct_')) {
          updatedFilters.city.push(item.replace('ct_', ''));
        }
        if (item.startsWith('bt_')) {
          updatedFilters.bodyType.push(item.replace('bt_', ''));
        }
        if (item.startsWith('pr_')) {
          const [min, max] = item.replace('pr_', '').split('_');
          updatedFilters.price = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith('yr_')) {
          const [min, max] = item.replace('yr_', '').split('_');
          updatedFilters.year = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith('ml_')) {
          const [min, max] = item.replace('ml_', '').split('_');
          updatedFilters.mileage = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith('cn_')) {
          updatedFilters.condition = item;
        }
        if (item.startsWith('tr_')) {
          updatedFilters.transmission = item;
        }
        if (item.startsWith('dr_')) {
          updatedFilters.drive = item;
        }
        if (item.startsWith('cl_')) {
          updatedFilters.exteriorColor = item;
        }
        if (item.startsWith('ft_')) {
          updatedFilters.fuelType = item;
        }
        if (item.startsWith('q_')) {
          updatedFilters.query = item.replace('q_', '');
        }
        if (item.startsWith('od_')) {
          updatedFilters.order = item.replace('od_', '');
        }
        if (item.startsWith('page_')) {
          updatedFilters.page = parseInt(item.replace('page_', ''), 10);
        }
        if (item.startsWith('limit_')) {
          updatedFilters.limit = parseInt(item.replace('limit_', ''), 10);
        }
        if (item.startsWith('view_')) {
          updatedFilters.view = item.replace('view_', '');
        }
      });

      setFilters(updatedFilters);
    }
  }, []);
  const updateFiltersInUrl = (updatedFilters) => {
    let customUrl = `/listing/${type}/search/-/`;

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        if (key === "make") [...new Set(value)].forEach(make => customUrl += `mk_${make.toLowerCase()}/`);
        if (key === "model") [...new Set(value)].forEach(model => customUrl += `md_${model.toLowerCase()}/`);
        if (key === "city") [...new Set(value)].forEach(city => customUrl += `ct_${city.toLowerCase()}/`);
        if (key === "bodyType") [...new Set(value)].forEach(bodyType => customUrl += `bt_${bodyType.toLowerCase()}/`);
        if (key === "price" && (value[0] !== 0 || value[1] !== 2000000000)) {
          customUrl += `pr_${value[0]}_${value[1]}/`;
        }
        if (key === "year" && (value[0] !== 2000 || value[1] !== 2024)) {
          customUrl += `yr_${value[0]}_${value[1]}/`;
        }
        if (key === "mileage" && (value[0] !== 0 || value[1] !== 2000000)) {
          customUrl += `ml_${value[0]}_${value[1]}/`;
        }
      } else if (typeof value === "string" && value) {
        if (key === "query") customUrl += `q_${value}/`;
        if (["condition", "transmission", "drive", "exteriorColor", "fuelType"].includes(key)) {
          customUrl += `${value}/`;
        }
        if (key === "view") customUrl += `view_${value}/`;
      } else if (typeof value === "number") {
        if (key === "page") customUrl += `page_${value}/`;
      }
    });
    const queryString = searchParams.toString();
    router.push(queryString ? `${customUrl}?${queryString}` : customUrl, { scroll: false });
  };
  const handleFilterChange = (filterName, value, isChecked) => {
    setFilters((prevFilters) => {
      let updatedFilterValue;

      if (["make", "city", "model", "bodyType"].includes(filterName)) {
        const encodedValue = encodeURIComponent(value);
        if (isChecked) {
          updatedFilterValue = Array.from(new Set([...prevFilters[filterName], encodedValue]));
        } else {
          updatedFilterValue = prevFilters[filterName].filter(item => item !== encodedValue);
        }
      } else {
        updatedFilterValue = value;
      }

      const updatedFilters = {
        ...prevFilters,
        [filterName]: updatedFilterValue,
      };

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        updateFiltersInUrl(updatedFilters);
      }, 600);

      return updatedFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      query: "",
      city: [],
      search: "",
      condition: "",
      make: [],
      model: [],
      mileage: [0, 2000000],
      price: [0, 2000000000],
      year: [2000, 2024],
      transmission: "",
      drive: "",
      exteriorColor: "",
      fuelType: "",
      bodyType: [],
    });
    router.push(`/listing/${type}/search/-/`, { scroll: false });
  };
  const getModelsByMakes = () => {
    const selectedModels = [];
    makes?.data?.forEach((make) => {
      if (filters.make.includes(make?.name?.toLowerCase())) {
        make.models.forEach((model) => {
          selectedModels.push(model);
        });
      }
    });

    return selectedModels;
  }
  const getCountByTypeAndKey=( countType, key)=> {
    if (!vehicles?.counts[countType]) {
        return null;
    }
    const normalizedKey = key.toLowerCase();
    const entry = vehicles?.counts[countType].find(item => item._id.toLowerCase() === normalizedKey);
    console.log(entry)
    return entry ? entry.count : null;
}
  const decodedFilterMake = filters.make.map((make) => decodeURIComponent(make).toLowerCase());
  const decodedFilterModel = filters.model.map((model) => decodeURIComponent(model).toLowerCase());
  const decodedFilterBodies = filters.bodyType.map((body) => decodeURIComponent(body).toLowerCase());
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
          {/* <div className="input-with-icon mb-4">
            <span className="icon">
              <FaSearchengin />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="location-input form-control"
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
            />
          </div> */}
          <Accordion variant="separated" radius="md" defaultValue={null} className="mb-3" transitionDuration={800}>
            <Accordion.Item size='sm' value='City' style={{ background: 'white', borderColor: '#E3E3E3' }}>
              <Accordion.Control>City</Accordion.Control>
              <Accordion.Panel>
                <div className="checkbox-group-filters">
                  {cities?.map(city => (
                    <div className="form-check" key={city.value}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={city.label}
                        checked={filters.city.includes(city.value)}
                        onChange={(e) => handleFilterChange("city", city.value, e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor={city.label}>
                        {city.label}
                      </label>
                      {
                        getCountByTypeAndKey('cityCounts',city.label)&&
                      <div className="count">{getCountByTypeAndKey('cityCounts',city.label)}</div>
                      }
                    </div>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          {/* <div className="input-with-icon mb-4">
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
      
          </div> */}
          <div className="form-group mb-3">
            <select
              className="form-select"
              value={filters.condition}
              onChange={(e) => handleFilterChange("condition", e.target.value)}
            >
              <option value="" disabled>
                Condition
              </option>
              {vehicleConditionOptions.map((condition) => (
                <option value={condition.value} key={condition.value}>{condition.label}</option>
              ))}
            </select>
          </div>

          {/* Checkbox Filters */}
          <Accordion variant="separated" radius="md" defaultValue="Make" transitionDuration={500}>
            <Accordion.Item size='sm' value='Make' style={{ background: 'white', borderColor: '#E3E3E3' }}>
              <Accordion.Control>Make</Accordion.Control>
              <Accordion.Panel>
                <div className="checkbox-group-filters">
                  {makes?.data?.map(make => (
                    <div className="form-check" key={make?.name?.toLowerCase()}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={make.name}
                        checked={decodedFilterMake.includes(make?.name?.toLowerCase())}
                        onChange={(e) => handleFilterChange("make", make?.name?.toLowerCase(), e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor={make.name}>
                        {make.name}
                      </label>
                      {
                        getCountByTypeAndKey('makeCounts',make.name)&&
                      <div className="count">{getCountByTypeAndKey('makeCounts',make.name)}</div>
                      }
                    </div>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          {/* Remaining Filters */}
          {filters.make?.length > 0 &&
            <Accordion variant="separated" radius="md" defaultValue="Model" className="mt-3" transitionDuration={500}>
              <Accordion.Item size='sm' value='Model' style={{ background: 'white', borderColor: '#E3E3E3' }}>
                <Accordion.Control>Model</Accordion.Control>
                <Accordion.Panel>          <div className="checkbox-group-filters">
                  {getModelsByMakes()?.map(model => (
                    <div className="form-check" key={model.name?.toLowerCase()}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={model.name}
                        checked={decodedFilterModel.includes(model.name?.toLowerCase())}
                        onChange={(e) => handleFilterChange("model", model.name?.toLowerCase(), e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor={model.name}>
                        {model.name}
                      </label>
                      {
                        getCountByTypeAndKey('modelCounts',model.name)&&
                      <div className="count">{getCountByTypeAndKey('modelCounts',model.name)}</div>
                      }
                    </div>
                  ))}
                </div></Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          }


          {/* Custom Range Slider for Mileage */}
          <div className="range-slider">
            <label htmlFor="mileage_range_slider" className="form-label">
              Mileage
            </label>
            <RangeSlider
              className="form-range mb-3"
              id="mileage_range_slider"
              color="red"
              thumbSize={18}
              min={0}
              max={2000000}
              value={filters.mileage}
              size={3}
              onChange={(value) => handleFilterChange('mileage', value)}
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
                      min={0}
                      max={filters.mileage[1]}
                      onChange={(e) =>
                        handleFilterChange('mileage', [
                          Number(e.target.value),
                          filters.mileage[1],
                        ])
                      }
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={filters.mileage[1]}
                      max={200000000}
                      onChange={(e) =>
                        handleFilterChange('mileage', [
                          filters.mileage[0],
                          Number(e.target.value),
                        ])
                      }
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
              min={0}
              max={2000000000}
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
                      min={0}
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
                      max={2000000000}
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
                <option value="" disabled>
                  Transmission
                </option>
                {vehicleTransmissionOptions.map((transmission, index) => (
                  <option value={transmission.value} key={index}>
                    {transmission.label}
                  </option>
                ))}
              </select>

            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.drive}
                onChange={(e) => handleFilterChange("drive", e.target.value)}
              >
                <option value="" disabled>
                  Drive
                </option>
                {vehicleDriveOptions.map((drive, index) => (
                  <option value={drive.value} key={index}>{drive.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.exteriorColor}
                onChange={(e) => handleFilterChange("exteriorColor", e.target.value)}
              >
                <option value="" disabled>
                  Exterior Color
                </option>
                {vehicleExteriorColorOptions.map((color, index) => (
                  <option value={color.value} key={index}>{color.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <select
                className="form-select"
                value={filters.fuelType}
                onChange={(e) => handleFilterChange("fuelType", e.target.value)}
              >
                <option value="" disabled>
                  Fuel Type
                </option>
                {vehicleFuelTypeOptions.map((fuel, index) => (
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
            {bodies?.data?.map((bodyType) => (
              <div className="col-md-6" key={bodyType.name}>
                <div className="single-brand-item selected-brand-item text-center">
                  <label className={`text-decoration-none ${decodedFilterBodies.includes(bodyType?.name?.toLowerCase()) ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      name="bodyType"
                      value={bodyType.name?.toLowerCase()}
                      checked={decodedFilterBodies.includes(bodyType?.name?.toLowerCase())}
                      onChange={(e) => handleFilterChange("bodyType", bodyType.name?.toLowerCase(), e.target.checked)}
                    />
                    <Image
                      width={100}
                      height={80}
                      src={bodyType.bodyImage}
                      className="mx-auto text-center"
                    />
                    <h6 className="mb-0 text-dark">{bodyType.name}</h6>
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

