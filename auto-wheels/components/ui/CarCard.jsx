import { GearsHandle } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import styles from "../../app/styles/components/product.module.scss";

import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
import { Box } from "@mantine/core";

const CarCard = ({ images, index }) => {
  return (
    // <div className={`card ${styles.productCard}`}>
    //   <Image
    //     src={images}
    //     className="card-img-top object-fit-cover img-fluid"
    //     alt="..."
    //     width={270}
    //     height={160}
    //   />
    //   <div className={styles.progressBars}>
    //     <span className={`${styles.singleBar} ${styles.active}`}></span>
    //     <span className={styles.singleBar}></span>
    //     <span className={styles.singleBar}></span>
    //   </div>
    //   <div className="card-body">
    //     <div className={styles.productContent}>
    //       <Link
    //         href={"#"}
    //         className={`d-inline-block w-50 lc-2 ${styles.productTitle}`}
    //       >
    //         Kia Sportage Brand New Model
    //       </Link>
    //       <div className={styles.productPrice}>Rs 7,400,000</div>
    //     </div>
    //     <div className={styles.productMeta}>
    //       <div className="meta-info d-flex justify-content-between align-items-center">
    //         <span className="text-muted d-flex align-items-center gap-1">
    //           <FaCalendarDays /> 2021
    //         </span>
    //         <span className="text-muted d-flex align-items-center gap-1">
    //           <GearsHandle /> Automatic
    //         </span>
    //         <span className="text-muted d-flex align-items-center gap-1">
    //           <FaLocationDot /> Automatic
    //         </span>
    //       </div>
    //       <div className="stock-info d-flex justify-content-between align-items-center mt-2">
    //         <span>
    //           <span className="text-muted">stock#</span> 324
    //         </span>
    //         <span className="text-muted">
    //           <FaClock /> (Updated 1 month ago)
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Box className="card product-card">
      <Image
        src="/products/product-placeholder.png"
        className="card-img-top object-fit-cover img-fluid"
        alt="..."
        width={270}
        height={160}
      />
      <div className="progress-bars">
        <span className="single-bar active"></span>
        <span className="single-bar"></span>
        <span className="single-bar"></span>
      </div>
      <div class="card-body">
        <div className="product-content">
          <Link href={"#"} className="d-inline-block w-50 lc-2 product-title">
            Kia Sportage Brand New Model
          </Link>
          <div className="product-price">Rs 7,400,000</div>
        </div>
        <div className="product-meta">
          <div className="meta-info d-flex justify-content-between align-items-center">
            <span className="text-muted d-flex align-items-center gap-1">
              <FaCalendarDays /> 2021
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <GearsHandle /> Automatic
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <FaLocationDot /> Automatic
            </span>
          </div>
          <div className="stock-info d-flex justify-content-between align-items-center mt-2">
            <span>
              <span className="text-muted">stock#</span> 324
            </span>
            <span className="text-muted">
              <FaClock /> (Updated 1 month ago)
            </span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CarCard;
