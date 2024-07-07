import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const SearchByLocations = () => {
  return (
    <section className="search-by-location py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="category-title d-flex justify-content-between align-items-center">
              <h3 className="fw-bold mb-0">
                Get trusted used Cars
                <span className="text-primary ms-1">Nearby</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8">
            <div className="row">
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/karachi.svg"}
                        width={80}
                        height={95}
                        alt="Karachi"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Karachi
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/islamabad.svg"}
                        width={80}
                        height={95}
                        alt="Islamabad"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Islamabad
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/lahore.svg"}
                        width={80}
                        height={95}
                        alt="Lahore"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Lahore
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/faisalabad.svg"}
                        width={80}
                        height={95}
                        alt="Faisalabad"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Faisalabad
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/peshawar.svg"}
                        width={80}
                        height={95}
                        alt="Peshawar"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Peshawar
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/karachi.svg"}
                        width={80}
                        height={95}
                        alt="Karachi"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Karachi
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/islamabad.svg"}
                        width={80}
                        height={95}
                        alt="Islamabad"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Islamabad
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/lahore.svg"}
                        width={80}
                        height={95}
                        alt="Lahore"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Lahore
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/faisalabad.svg"}
                        width={80}
                        height={95}
                        alt="Faisalabad"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Faisalabad
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card locations-card">
                  <div className="card-body text-center">
                    <Link href={"#"} className="text-decoration-none">
                      <Image
                        src={"/locations/peshawar.svg"}
                        width={80}
                        height={95}
                        alt="Peshawar"
                      />
                      <h5 className="mb-0 my-3 location-info">
                        <span className="text-muted d-block">Used cars in</span>
                        <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                          Peshawar
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="position-relative h-100 ms-5">
              <h5 className="lh-base text-center input-label py-4">
                I am looking to buy a second <br /> hand car in
              </h5>
              <div className="input-with-icon">
                <span className="icon">
                  <FaLocationDot />
                </span>
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="location-input form-control"
                />
              </div>
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
    </section>
  );
};

export default SearchByLocations;
