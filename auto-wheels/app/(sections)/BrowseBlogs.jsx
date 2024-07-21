import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const BrowseBlogs = () => {
  return (
    <section className="blogs py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="category-title d-flex justify-content-between align-items-center">
              <h3 className="fw-bold mb-0">
                Our Latest
                <span className="text-primary ms-2">Blogs</span>
              </h3>
              <Link href={"#"} className="float-end text-decoration-none">
                Read all Blogs
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6">
            <article className="article-vertical">
              <Link href={"#"} className="image-text-placeholder d-block">
                <Image
                  src={"/blogs/blogs-1.png"}
                  width={550}
                  height={550}
                  alt="Blog Image Placeholder"
                  className="img-fluid w-100 object-fit-cover"
                />
                <h3 className="text-placeholder fw-bold text-white">
                  2017 Mercedes-Benz E-Class Coupe review
                </h3>
              </Link>
            </article>
          </div>
          <div className="col-lg-6">
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <>
                  <article className="article-inline mb-2">
                    <div className="article-info pe-3">
                      <div className="published-date mb-1">
                        November 25, 2023
                      </div>
                      <Link
                        href={"#"}
                        className="article-title text-truncate text-decoration-none d-inline-block"
                      >
                        Audi RS 3 Sedan Review with pricing specs performance
                        and safety..
                      </Link>
                      <div className="content">
                        Lorem ipsum dolor sit amet consectetur. Gravida
                        pellentesque ornare bibend Nemo enim ipsam voluptatem
                        quia
                        <Link
                          href={"#"}
                          className="text-text-decoration-none d-block mt-2"
                        >
                          Read More <BsArrowRight />
                        </Link>
                      </div>
                    </div>
                    <Image
                      src={"/blogs/blogs-1.png"}
                      width={130}
                      height={140}
                      className="img-fluid"
                    />
                  </article>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseBlogs;
