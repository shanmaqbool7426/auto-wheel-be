import React from "react";
import { CarFrontView, MotorBike, Truck } from "@/components/Icons";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const HeroTabs = () => {
  return (
    <div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item flex-fill">
          <span
            data-bs-toggle="tab"
            className="nav-link d-flex flex-column justify-content-center align-items-center"
            data-bs-target="#home-tab-pane"
          >
            <CarFrontView />
            Car
          </span>
        </li>
        <li className="nav-item flex-fill">
          <span
            className="nav-link d-flex flex-column justify-content-center align-items-center"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
          >
            <MotorBike />
            Bikes
          </span>
        </li>
        <li className="nav-item flex-fill">
          <span
            className="nav-link d-flex flex-column justify-content-center align-items-center"
            data-bs-toggle="tab"
            data-bs-target="#contact-tab-pane"
          >
            <Truck />
            Contact
          </span>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <form>
            <div className="form-group mb-4 mt-4">
              <input
                type="text"
                placeholder="Car Make or Model"
                className="form-control"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="Enter Your Location"
                className="form-control"
              />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg mb-3 rounded-2">
                Search
              </button>
            </div>
            <Link
              href={"#"}
              className="btn btn-link text-right float-end text-decoration-none fw-medium"
            >
              Advanced Search
              <span className="ms-1">
                <BsArrowRight />
              </span>
            </Link>
          </form>
        </div>
        {/* <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="contact-tab-pane"
          role="tabpanel"
          aria-labelledby="contact-tab"
          tabindex="0"
        >
          ...
        </div> */}
      </div>
    </div>
  );
};

export default HeroTabs;
