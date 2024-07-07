import { PlayButton } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrowseVideos = () => {
  return (
    <section className="browse-videos py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="category-title d-flex justify-content-between align-items-center">
              <h3 className="fw-bold mb-0">
                Browse Our
                <span className="text-primary ms-1">Videos</span>
              </h3>
              <Link href={"#"} className="float-end text-decoration-none">
                View all Videos
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6">
            <Link href={"#"} className="video-thumbnail">
              <span className="play-button">
                <PlayButton />
              </span>
              <div className="video-placeholder larger-thumb">
                <Image
                  src={"/videos/thumbnail.png"}
                  width={620}
                  className="img-fluid mb-3 w-100"
                  height={370}
                  alt="Video Thumbnail"
                />
                <h5 className="fw-semibold lh-base title text-truncate">
                  Honda BR-V S 2020 Facelift Detail Review | Price and
                  Specifications
                </h5>
              </div>
            </Link>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <Link href={"#"} className="video-thumbnail small-thumb">
                  <span className="play-button">
                    <PlayButton />
                  </span>
                  <div className="video-placeholder">
                    <Image
                      src={"/videos/thumbnail.png"}
                      width={620}
                      className="img-fluid mb-2 w-100"
                      height={370}
                      alt="Video Thumbnail"
                    />
                    <h6 className="fw-semibold lh-base title text-truncate">
                      Honda BR-V S 2020 Facelift Detail Review | Price and
                      Specifications
                    </h6>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6">
                <Link href={"#"} className="video-thumbnail small-thumb">
                  <span className="play-button">
                    <PlayButton />
                  </span>
                  <div className="video-placeholder">
                    <Image
                      src={"/videos/thumbnail.png"}
                      width={620}
                      className="img-fluid mb-2 w-100"
                      height={370}
                      alt="Video Thumbnail"
                    />
                    <h6 className="fw-semibold lh-base title text-truncate">
                      Honda BR-V S 2020 Facelift Detail Review | Price and
                      Specifications
                    </h6>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6">
                <Link href={"#"} className="video-thumbnail small-thumb">
                  <span className="play-button">
                    <PlayButton />
                  </span>
                  <div className="video-placeholder">
                    <Image
                      src={"/videos/thumbnail.png"}
                      width={620}
                      className="img-fluid mb-2 w-100"
                      height={370}
                      alt="Video Thumbnail"
                    />
                    <h6 className="fw-semibold lh-base title text-truncate">
                      Honda BR-V S 2020 Facelift Detail Review | Price and
                      Specifications
                    </h6>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6">
                <Link href={"#"} className="video-thumbnail small-thumb">
                  <span className="play-button">
                    <PlayButton />
                  </span>
                  <div className="video-placeholder">
                    <Image
                      src={"/videos/thumbnail.png"}
                      width={620}
                      className="img-fluid mb-2 w-100"
                      height={370}
                      alt="Video Thumbnail"
                    />
                    <h6 className="fw-semibold lh-base title text-truncate">
                      Honda BR-V S 2020 Facelift Detail Review | Price and
                      Specifications
                    </h6>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseVideos;
