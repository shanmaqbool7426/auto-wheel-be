import React from "react";
import { SearchWithCar } from "@/components/Icons";

const ListingFilter = () => {
  return (
    <div className="card filter-card">
      <div className="card-header">
        <div className="card-title">
          <SearchWithCar />
          <h5 className="mb-0">Search Options</h5>
        </div>
      </div>
    </div>
  );
};

export default ListingFilter;
