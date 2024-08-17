
import ListingFilter from "@/components/listing/sidebar-filter";
import {ListingPagination} from "@/components/listing/pagination";
import { FaList } from "react-icons/fa";
import ListCardView from "@/components/ui/ListCardView";
import { BsGridFill } from "react-icons/bs";
import Link from "next/link";
// import { useState } from "react";
import VehicleFilters from "@/components/testFilters"
import  {fetchVehiclsData} from "@/services/vehicles"
import CarCard from "@/components/ui/CarCard";
import useListingFilter from "@/custom-hooks/useListingFilter";
import { Pagination } from "@mantine/core";
import Select from "@/components/Select"
export default async function Listing({ params }) {
    const typeMapping = {
        cars: 'car',
        bikes: 'bike',
        trucks: 'truck',
    };
 const reorderSlug = (slug) => {
    const basePath = slug[0];
    const searchPath = slug[1];
    const makes = new Set(slug.filter((item) => item.startsWith('mk_')));
    const cities = new Set(slug.filter((item) => item.startsWith('ct_')));
    const models = new Set(slug.filter((item) => item.startsWith('md_')));
    return [typeMapping[basePath], ...makes,...cities,...models, searchPath,];
  };

  const reorderedSlug = reorderSlug(params.slug);
   console.log('>>>>>>url', reorderedSlug)
   const dataofVehcles=await  fetchVehiclsData(reorderedSlug)
   console.log('>>>>>>data', dataofVehcles)
    let categoryTitle = '';
    const sortOptions = [
        { value: 'od_latest', label: 'Date: Newest First' },
        { value: 'od_price_asc', label: 'Price: Low to High' },
        { value: 'od_price_desc', label: 'Price: High to Low' },
      ];
    switch (params.slug) {
        case 'cars':
            categoryTitle = 'Cars';
            break;
        case 'bikes':
            categoryTitle = 'Bikes';
            break;
        case 'trucks':
            categoryTitle = 'Trucks';
            break;
        default:
            categoryTitle = 'Cars';
    }

    return (
        <>
            <section className="product-listing py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ListingFilter type={params.slug[0]} />
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
                                            // onChange={handleSortChange}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="grid-sort-btns">
                                        <button className="sort-grid active" onClick={() => setView("grid")}>
                                            <BsGridFill />
                                        </button>
                                        <button className="sort-grid" onClick={() => setView("list")}>
                                            <FaList />
                                        </button>
                                    </div> */}
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
                                {dataofVehcles?.results?.map((vehicle, index) => (
                                    <div key={index} className={view === 'grid' ? "col-lg-4" : "col-12"}>
                                        <CarCard vehicle={vehicle} index={index} />
                                        {/* {view === 'grid' ? (
                                        ) : (
                                            <ListCardView index={index} images={vehicle} />
                                        )} */}
                                    </div>
                                ))}
                            </div>
                            <ListingPagination data={dataofVehcles} type={params.slug}/>
                            {/* <Pagination
                                total={Math.ceil(dataofVehcles?.count / 10)}
                                page={pagination.page}
                                onChange={handlePaginationChange}
                                siblings={1}
                                size="md"
                                color="#E90808"
                            /> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
