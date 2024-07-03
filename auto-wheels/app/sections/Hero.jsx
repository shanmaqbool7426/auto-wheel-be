import React from "react";
import HeroTabs from "@/components/hero-tabs";
import { BsArrowRight } from "react-icons/bs";

const Hero = () => {
  return (
    <div className="hero-banner py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card hero-form p-2">
              <div className="card-body">
                <div className="card-title fw-bold">
                  Find your Right <span className="text-primary">car</span>
                </div>
                <HeroTabs />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="hero-content">
              <div>
                <div className="hero-title fw-semibold mb-4">
                  Hyundai Car Price in <br /> Pakistan 2023
                </div>
                <button className="btn btn-primary btn-lg px-4 rounded-2 hero-btn">
                  Read More <BsArrowRight />
                </button>
              </div>
              <ul className="car-lists-slider list-unstyled">
                <li className="active">Hyundai Car Review</li>
                <li>2023 Safari Review</li>
                <li>2023 Safari Review</li>
                <li>2023 Safari Review</li>
                <li>2023 Safari Review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
