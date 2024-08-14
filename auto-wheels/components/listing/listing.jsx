'use client'
import ListingFilter from "@/components/listing/sidebar-filter";
import { FaList } from "react-icons/fa";
import ListCardView from "@/components/ui/ListCardView";
import { BsGridFill } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import CarCard from "@/components/ui/CarCard";
import useListingFilter from "@/custom-hooks/useListingFilter";
import { Pagination } from "@mantine/core";
import Select from "@/components/Select"
export default function Listing({ params }) {
    const { fetchedData, filters, pagination, handlePaginationChange, handleFilterChange, resetFilters,handleSortChange } = useListingFilter({ type: params.slug });

    const [view, setView] = useState('grid');

    let categoryTitle = '';
    const sortOptions = [
        { value: 'latest', label: 'Date: Newest First' },
        { value: 'priceAsc', label: 'Price: Low to High' },
        { value: 'priceDesc', label: 'Price: High to Low' },
      ];
    switch (params.slug) {
        case 'cars':
            //   images = carImages;
            categoryTitle = 'Cars';
            break;
        case 'bikes':
            //   images = bikeImages;
            categoryTitle = 'Bikes';
            break;
        case 'trucks':
            //   images = truckImages;
            categoryTitle = 'Trucks';
            break;
        default:
            //   images = carImages;
            categoryTitle = 'Cars';
    }

    return (
        <>
            <section className="product-listing py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ListingFilter type={params.slug} filters={filters} handleFilterChange={handleFilterChange} resetFilters={resetFilters} />
                        </div>
                        <div className="col-lg-9">
                            {/* Toolbox */}
                            <div className="toolbox">
                                <div className="toolbox-left">
                                    <h3 className="fw-bold">
                                        {categoryTitle} for <span className="text-primary">Sale</span>
                                    </h3>
                                </div>
                                <div className="toolbox-right">
                                    <div className="select-filter-listing">
                                        <label htmlFor="sort_by">SORT BY:</label>
                                        <div className="select-custom">
                                            <Select 
                                            className="form-select form-select-sm"
                                            aria-label="Sort By"
                                            id="sort_by"
                                            options={sortOptions}
                                            onChange={handleSortChange}
                                            />
                                            {/* <select
                                                className="form-select form-select-sm"
                                                aria-label="Sort By"
                                                id="sort_by"
                                            >
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="grid-sort-btns">
                                        <button className="sort-grid active" onClick={() => setView("grid")}>
                                            <BsGridFill />
                                        </button>
                                        <button className="sort-grid" onClick={() => setView("list")}>
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
                            <div className="row">
                                {fetchedData?.map((vehicle, index) => (
                                    <div key={index} className={view === 'grid' ? "col-lg-4" : "col-12"}>
                                        {view === 'grid' ? (
                                            <CarCard vehicle={vehicle} index={index} />
                                        ) : (
                                            <ListCardView index={index} images={vehicle} />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                total={Math.ceil(pagination.count / pagination.limit)}
                                page={pagination.page}
                                onChange={handlePaginationChange}
                                siblings={1}
                                size="md"
                                color="#E90808"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
