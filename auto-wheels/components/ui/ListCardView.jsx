import React from 'react'
import {
    CameraIcon,
    CompareIcon,
    FuelIcon,
    FuelTank,
    GridView,
    ListView,
    LocationPinIcon,
    RoadIcon,
    ShareIcon,
  } from "@/components/Icons";import Image from "next/image";
  import { FaLocationPin } from "react-icons/fa6";
import Link from "next/link";

const ListCardView = ({vehicle,index}) => {
  const conditionMap={
    new:'New',
    used:'Used',
    certified:'Certified Used',
  }
  return (
<div className="product-card product-list p-3 box-border-box" key={index}>
<div className="row align-items-center">
  <div className="col-md-5"> 
    <div className="product-placeholder position-relative overflow-hidden">
      {/* <div className="featured-badge">Special</div> */}
      {/* <div className="image-counter">
        <CameraIcon />
        <span className="fw-bold">6</span>
      </div> */}
      {/* <Image
        src={vehicle?.defaultImage}
        className="product-image object-fit-cover img-fluid"
        alt="..."
        width={280}
        height={200}
      /> */}
         <img
        src={vehicle?.defaultImage ? vehicle?.defaultImage : "/products/product-placeholder.png"}
        alt="..."
        className="product-image object-fit-cover img-fluid"
        style={{maxHeight:'200px',minHeight:'200px',}}
      />
      <div className="progress-bars">
        <span className="single-bar active"></span>
        <span className="single-bar"></span>
        <span className="single-bar"></span>
      </div>
    </div>
  </div>
  <div className="col-md-7">
    <div className="product-content list-content-listing">
      <div className="row align-items-center">
        <div className="col">
          <div className="text-primary user-info fw-semibold">
            {conditionMap[vehicle?.condition]}
          </div>

          <Link href={"#"} className="product-title">
            <h4 className=" mb-0 fw-bold">
            {`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}
            </h4>
          </Link>

          <small className="text-muted">
            (Updated 1 month ago)
          </small>
        </div>
        <div className="col">
          <div className="product-price">
            Rs {vehicle?.price}
          </div>
        </div>
      </div>
      <div className="row my-3 py-2">
        <div className="col-md-6 col-lg-4">
          <div className="vehicle-info border-end">
            <RoadIcon />
            <span className="fw-bold ms-2">{vehicle?.specifications?.mileage} Km</span>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="vehicle-info border-end">
            <FuelIcon />
            <span className="fw-bold ms-2">{vehicle?.specifications?.fuelType}</span>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="vehicle-info border-end">
            <FuelTank />
            <span className="fw-bold ms-2">{vehicle?.specifications?.engine}</span>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="vehicle-info">
            <LocationPinIcon />
            <span className="fw-bold ms-2">{vehicle?.city}</span>
          </div>
        </div>
      </div>
      <div className="product-actions">
        <button className="btn btn-stock btn-lg">
          STOCK# <span className="text-dark">{vehicle?.specifications?.stockId}</span>
        </button>
        <button className="btn btn-lg btn-compare">
          <CompareIcon />
          Add to compare
        </button>
        <button className="btn btn-lg btn-share">
          <ShareIcon />
          Share this
        </button>
      </div>
    </div>
  </div>
</div>
</div>  )
}

export default ListCardView