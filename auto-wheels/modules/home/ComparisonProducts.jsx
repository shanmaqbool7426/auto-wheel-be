import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegStar } from "react-icons/fa";

const ComparisonProducts = () => {
  return (
    <section className="comparison-products py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="category-title d-flex justify-content-between align-items-center">
              <h3 className="fw-bold mb-0">
                Top
                <span className="text-primary ms-1">Comparison</span>
              </h3>
              <Link href={"#"} className="float-end text-decoration-none">
                Show all Comparison
              </Link>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-4">
              {[1, 2, 3, 4, 5, 6].map((_, index) => {
                return (
                  <>
                    <div className="col-lg-4" key={index}>
                      <div className="card comparison-card">
                        <div className="two-col-comparison position-relative">
                          <div className="product-compare product-first justify-content-start">
                            <Image
                              src="/compare/compare-product.png"
                              width={143}
                              height={88}
                              className="img-fluid"
                            />
                          </div>
                          <span className="compare-txt">VS</span>
                          <div className="product-compare product-second justify-content-end">
                            <Image
                              src="/compare/compare-2.png"
                              width={143}
                              height={88}
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="product-content row">
                            <div className="product-info col">
                              2016 Ford Escape Cape
                              <span className="d-block mt-2">
                                <span className="text-warning">
                                  <FaRegStar />
                                  <FaRegStar />
                                  <FaRegStar />
                                  <FaRegStar />
                                  <FaRegStar />
                                </span>
                                (4/5)
                              </span>
                            </div>
                            <div className="product-info col">
                              2016 Ford Escape Cape
                              <span className="d-block mt-2">
                                <span className="text-warning">
                                  <FaRegStar />
                                  <FaRegStar />
                                  <FaRegStar />
                                  <FaRegStar />
                                  <FaRegStar />
                                </span>
                                (4/5)
                              </span>
                            </div>
                            <div className="d-grid mt-4">
                              <button className="btn btn-outline-primary btn-compare">
                                Compare
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
      </div>
    </section>
  );
};

export default ComparisonProducts;
