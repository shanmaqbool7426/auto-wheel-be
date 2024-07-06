import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchByLocations = () => {
  return (
    <section className="search-by-location py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="category-title d-flex justify-content-between align-items-center">
              <h3 className="fw-bold mb-0">
                Get trusted used Cars
                <span className="text-primary ms-1">Nearby</span>
              </h3>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-4">
              <div className="col-lg-9">
                <div className="row gap-0">
                  <div className="col-lg-2">
                    <div className="card locations-card">
                      <div className="card-body text-center">
                        <Link href={"#"} className="text-decoration-none">
                          <Image
                            src={"/locations/karachi.svg"}
                            width={90}
                            height={90}
                            alt="Karachi"
                          />
                          <h5 className="mb-0 my-3">
                            <span className="text-muted fs-6 d-block">
                              Used cars in
                            </span>
                            <span className="fw-semibold mt-1 d-inline-block fs-6 text-dark">
                              Karachi
                            </span>
                          </h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card locations-card">
                      <div className="card-body text-center">
                        <Link href={"#"} className="text-decoration-none">
                          <Image
                            src={"/locations/islamabad.svg"}
                            width={90}
                            height={90}
                            alt="Karachi"
                          />
                          <h5 className="mb-0 my-3">
                            <span className="text-muted fs-6 d-block">
                              Used cars in
                            </span>
                            <span className="fw-semibold mt-1 d-inline-block fs-6 text-dark">
                              Islamabad
                            </span>
                          </h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card locations-card">
                      <div className="card-body text-center">
                        <Link href={"#"} className="text-decoration-none">
                          <Image
                            src={"/locations/lahore.svg"}
                            width={90}
                            height={90}
                            alt="Karachi"
                          />
                          <h5 className="mb-0 my-3">
                            <span className="text-muted fs-6 d-block">
                              Used cars in
                            </span>
                            <span className="fw-semibold mt-1 d-inline-block fs-6 text-dark">
                              Lahore
                            </span>
                          </h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card locations-card">
                      <div className="card-body text-center">
                        <Link href={"#"} className="text-decoration-none">
                          <Image
                            src={"/locations/faisalabad.svg"}
                            width={90}
                            height={90}
                            alt="Karachi"
                          />
                          <h5 className="mb-0 my-3">
                            <span className="text-muted fs-6 d-block">
                              Used cars in
                            </span>
                            <span className="fw-semibold mt-1 d-inline-block fs-6 text-dark">
                            Faisalabad
                            </span>
                          </h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card locations-card">
                      <div className="card-body text-center">
                        <Link href={"#"} className="text-decoration-none">
                          <Image
                            src={"/locations/peshawar.svg"}
                            width={90}
                            height={90}
                            alt="Karachi"
                          />
                          <h5 className="mb-0 my-3">
                            <span className="text-muted fs-6 d-block">
                              Used cars in
                            </span>
                            <span className="fw-semibold mt-1 d-inline-block fs-6 text-dark">
                            Peshawar
                            </span>
                          </h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card locations-card">
                      <div className="card-body text-center">
                        <Link href={"#"} className="text-decoration-none">
                          <Image
                            src={"/locations/peshawar.svg"}
                            width={90}
                            height={90}
                            alt="Karachi"
                          />
                          <h5 className="mb-0 my-3">
                            <span className="text-muted fs-6 d-block">
                              Used cars in
                            </span>
                            <span className="fw-semibold mt-1 d-inline-block fs-6 text-dark">
                            Peshawar
                            </span>
                          </h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="locations-background">
                  <Image
                    src={"/locations/locations-bg.svg"}
                    width={500}
                    height={500}
                    className="img-fluid"
                    alt="Location Vector Background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchByLocations;
