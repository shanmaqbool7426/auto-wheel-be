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
} from "@/components/Icons";
import ListingFilter from "@/components/listing/sidebar-filter";
import { FaList } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { FaLocationPin } from "react-icons/fa6";

export default function ProductListing() {
  return (
    <>
      <section className="product-listing py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingFilter />
            </div>
            <div className="col-lg-9">
              {/* Toolbox */}
              <div className="toolbox">
                <div className="toolbox-left">
                  <h3 className="fw-bold">
                    Cars for <span className="text-primary">Sale</span>
                  </h3>
                </div>
                <div className="toolbox-right">
                  <div className="select-filter-listing">
                    <label htmlFor="sort_by">SORT BY:</label>
                    <div className="select-custom">
                      <select
                        className="form-select form-select-sm"
                        ariaLabel="Sort By"
                        id="sort_by"
                      >
                        <option selected>Date: Newest First</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid-sort-btns">
                    <button className="sort-grid active">
                      <BsGridFill />
                    </button>
                    <button className="sort-grid">
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Listing Section */}
              <div className="title-section">
                <h6 className="cat-title mb-0">Featured Classified</h6>
                <Link href={"#"} className="text-primary text-decoration-none">
                  Show all
                </Link>
              </div>

              {/* Product View List */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                return (
                  <>
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
                              src="/products/product-placeholder.png"
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
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
