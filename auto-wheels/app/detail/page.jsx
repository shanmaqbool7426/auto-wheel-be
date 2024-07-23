"use client";

import {
  ClockIcon,
  DocumentSquareIcon,
  DollarIcon,
  FeaturedCrownIcon,
  FuelTank,
  LocationPinIcon,
  MessageIcon,
  MeterSquareIcon,
  PhoneIcon,
  RanchIcon,
  RatingIcon,
  ReportFlag,
  SearchIcon,
  ShareSquareIcon,
  SteeringIcon,
  TrustCar,
  VerifiedUser,
  WhatsappIcon,
} from "@/components/Icons";
import { BsStarFill, BsStar } from "react-icons/bs";
import { Card, Image, Text, Title } from "@mantine/core";
import Link from "next/link";
// import Image from "next/image";

export default function ProductDetail() {
  return (
    <>
      <section className="product-detail py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body">
                  <span className="icon">
                    <SearchIcon />
                  </span>
                  <div>
                    <h5 className="card-title fw-semibold mb-1">
                      Wide range of Brands
                    </h5>
                    <p className="mb-0 text-muted content">
                      Our services department maintains your vehicle
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body">
                  <span className="icon">
                    <RanchIcon />
                  </span>
                  <div>
                    <h5 className="card-title fw-semibold mb-1">
                      Wide range of Brands
                    </h5>
                    <p className="mb-0 text-muted content">
                      Our services department maintains your vehicle
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body justify-content-start gap-3 size-5">
                  <span className="icon">
                    <TrustCar />
                  </span>
                  <div>
                    <h5 className="card-title fw-semibold mb-1">
                      Trusted by thousands
                    </h5>
                    <p className="mb-0 text-muted content">
                      Department maintains your car to stay safe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-8">
              {/* Car Pricing Section */}
              <section className="car-price-section">
                <div className="product-info text-primary d-flex justify-content-between align-items-center">
                  <div className="title-section">
                    <div className="title-sm fs-5 fw-semibold lh-sm">
                      Used 1.6 L
                    </div>
                    <div className="main-title fs-1 fw-bold">2016 Kia Rio</div>
                  </div>
                  <div className="price-field">Rs 7,400,000</div>
                </div>

                <div className="features-section">
                  <div className="text-dark d-flex gap-2 my-2">
                    <ClockIcon /> (Updated 1 month ago)
                  </div>
                  <div className="featured my-3">
                    <ul className="list-unstyled list-inline m-0">
                      <li className="list-inline-item">
                        <DocumentSquareIcon />
                      </li>
                      <li className="list-inline-item">
                        <RatingIcon />
                      </li>
                      <li className="list-inline-item">
                        <SteeringIcon />
                      </li>
                      <li className="list-inline-item">
                        <ShareSquareIcon />
                      </li>
                      <li className="list-inline-item">
                        <MeterSquareIcon />
                      </li>
                    </ul>
                    <div className="featrured-tag text-primary ms-auto text-uppercase fw-semibold">
                      <FeaturedCrownIcon />
                      <span className="ms-2">featured listing</span>
                    </div>
                  </div>
                </div>
              </section>
              {/* Product Image Section */}
              <section className="product-image-section my-5">
                <h1>Image to be placed Here</h1>
              </section>
              {/* Product Image Section */}

              {/* Summary Section */}
              <section className="summary-section">
                <h4 className="section-title fw-semibold mb-4">Car Summary</h4>
                <div className="row">
                  <div className="col-md-4">
                    <ul className="list-unstyled">
                      <li>
                        <span className="fs-6 text-primary fw-bold icon">
                          #
                        </span>
                        <span className="text-muted summary-info">
                          Stock id
                        </span>
                        <span className="text-dark">143</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <FuelTank />
                        </span>
                        <span className="text-muted summary-info">Engine</span>
                        <span className="text-dark">1.6 L</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">2</div>
                  <div className="col-md-4">3</div>
                </div>
              </section>
            </div>
            <div className="col-md-4">
              <div className="seller-info">
                <h4 className="fw-semibold mb-1">
                  Native Americans <VerifiedUser />
                </h4>
                <span className="text-muted">Private dealer</span>
                <div className="row mt-3 mb-4">
                  <div className="col">
                    <Card padding="xs" radius="sm" withBorder>
                      <Image
                        src="/detail/seller-company.png"
                        height={160}
                        alt="Norway"
                      />
                    </Card>
                  </div>
                  <div className="col">
                    <div className="rating">
                      <div className="fs-5 text-warning d-flex align-items-center">
                        <span>
                          <BsStarFill />
                        </span>
                        <span>
                          <BsStarFill />
                        </span>
                        <span>
                          <BsStarFill />
                        </span>
                        <span>
                          <BsStar />
                        </span>
                        <span>
                          <BsStar />
                        </span>
                        <span className="text-dark ms-2 fs-6">(3/5)</span>
                      </div>
                      <span className="d-block text-muted mt-2">
                        (Review 15)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card seller-phone-card mb-3">
                      <div className="card-body gap-2">
                        <PhoneIcon />
                        <h5 className="fw-bold mb-0">(71*******)</h5>
                        <span className="text-decoration-underline text-muted">
                          Show Number
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card whatsapp-icon mb-3">
                      <div className="card-body gap-2 align-items-center">
                        <WhatsappIcon />
                        <h5 className="fw-bold mb-0">CHAT VIA WHATSAPP</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card whatsapp-icon mb-3">
                      <div className="card-body gap-2 align-items-center">
                        <MessageIcon />
                        <h5 className="fw-bold mb-0 text-uppercase">
                          Message To Dealer
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card whatsapp-icon mb-3">
                      <div className="card-body gap-2 align-items-center">
                        <DollarIcon />
                        <h5 className="fw-bold mb-0 text-uppercase">
                          Make an offer price
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card address-card mb-3">
                    <div className="card-body gap-2 align-items-center text-primary">
                      <LocationPinIcon />
                      <div className="text-muted address-info">
                        Gare Du Nord, Rue de Maubeuge, Paris, France
                        <ul className="list-unstyled mb-0 text-muted mt-2">
                          <li>
                            Mon to Fri
                            <span className="ms-5">Timings: 9AM to 9PM</span>
                          </li>
                          <li>
                            Sat & Sun
                            <span className="ms-5">Timings: 11AM to 6PM </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body d-block gap-2 align-items-center">
                      <h6 className="text-primary mb-3">
                        Safety tips for transaction
                      </h6>
                      <ol>
                        <li>Use a safe location to meet seller</li>
                        <li>Avoid cash transactions</li>
                        <li>Beware of unrealistic offers</li>
                      </ol>
                      <Link
                        href={"#"}
                        className="text-decoration-none d-block float-end"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body gap-2 align-items-center justify-content-center text-uppercase">
                      <ReportFlag />
                      <h5 className="mb-0 fw-semibold text-primary">
                        Report this ad
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
