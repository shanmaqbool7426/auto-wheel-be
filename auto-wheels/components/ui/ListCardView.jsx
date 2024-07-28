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

const ListCardView = ({images,index}) => {
  return (
<div className="product-card product-list" key={index}>
<div className="row">
  <div className="col-md-5">
    <div className="product-placeholder position-relative overflow-hidden">
      <div className="featured-badge">Special</div>
      <div className="image-counter">
        <CameraIcon />
        <span className="fw-bold">6</span>
      </div>
      <Image
        src={images}
        className="product-image object-fit-cover img-fluid"
        alt="..."
        width={280}
        height={200}
      />
      <div className="progress-bars">
        <span className="single-bar active"></span>
        <span className="single-bar"></span>
        <span className="single-bar"></span>
      </div>
    </div>
  </div>
  <div className="col-md-7">
    <div className="product-content">
      <div className="row align-items-center">
        <div className="col">
          <div className="text-primary user-info fw-semibold">
            Certified Used 2.4 L
          </div>

          <Link href={"#"} className="product-title">
            <h4 className=" mb-0 fw-bold">
              2021 Acura ILX
            </h4>
          </Link>

          <small className="text-muted">
            (Updated 1 month ago)
          </small>
        </div>
        <div className="col">
          <div className="product-price">
            Rs 7,400,000
          </div>
        </div>
      </div>
      <div className="row my-3 py-2">
        <div className="col-md-3">
          <div className="vehicle-info border-end">
            <RoadIcon />
            <span className="fw-bold ms-2">36261 Km</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="vehicle-info border-end">
            <FuelIcon />
            <span className="fw-bold ms-2">Electric</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="vehicle-info border-end">
            <FuelTank />
            <span className="fw-bold ms-2">2.4 L</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="vehicle-info">
            <LocationPinIcon />
            <span className="fw-bold ms-2">Lahore</span>
          </div>
        </div>
      </div>
      <div className="product-actions">
        <button className="btn btn-stock btn-lg">
          STOCK# <span className="text-dark">324</span>
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