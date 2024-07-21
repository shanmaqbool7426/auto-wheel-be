import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrowseByCategory = () => {
  return (
    <div className="browse-cats-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="category-title fw-bold mb-0">
                Browse by
                <span className="text-primary text-decoration-underline ms-1">
                  Make
                </span>
              </h3>
              <Link
                href={"#"}
                className="text-primary float-end text-decoration-none"
              >
                Show all Makes
              </Link>
            </div>
            <div className="cat-by-brand">
              <div className="row mt-5">
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/acura.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Acura</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/bentley.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Bentley</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/bmw.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>BMW</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/chevrolet.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Chevrolet</Link>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/ford.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Ford</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={70}
                      height={100}
                      src="/brands/hyundai.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Honda</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={80}
                      height={100}
                      src="/brands/nissan.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Hyundai</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/kia.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>KIA</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 ps-5">
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="category-title fw-bold mb-0">
                Browse by
                <span className="text-primary text-decoration-underline ms-1">
                  Body
                </span>
              </h3>
              <Link
                href={"#"}
                className="text-primary float-end text-decoration-none"
              >
                Show all Makes
              </Link>
            </div>
            <div className="cat-by-brand cat-by-body">
              <div className="row mt-5">
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Convertible.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Convertible</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/coupe.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Coupe</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Hatchback.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Hatchback</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Minivan.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Minivan</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Pickups.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Pickups</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Sedan.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Sedan</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Sport-Cars.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Sport Cars</Link>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex flex-column single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/SUV.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>SUV</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
