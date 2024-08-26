
import ListingFilter from "@/components/listing/sidebar-filter";
import ListingPagination from "@/components/listing/pagination";
import { ListingHeader } from "@/components/listing/header";
import ListCardView from "@/components/ui/ListCardView";
import CarCard from "@/components/ui/CarCard";
import Link from "next/link";
import { LoadingOverlay } from '@mantine/core';
import { fetchBodiesByType, fetchMakesByType, fetchVehiclsData } from "@/services/vehicles"
import { reorderSlug } from "@/utils";
export default async function Listing({ params, searchParams }) {
    const view = searchParams.view;
    const typeMapping = {
        cars: 'car',
        bikes: 'bike',
        trucks: 'truck',
    };


    const sortBy = searchParams.sortBy ? `sb_${searchParams.sortBy}` : searchParams.sortBy;
    const reorderedSlug = reorderSlug(params.slug, view, sortBy);
    let loading = true;
    console.log('<<<<<',reorderedSlug)
    const dataofVehcles = await fetchVehiclsData(reorderedSlug);
    const vehicleMakes = await fetchMakesByType(typeMapping[params.slug[0]]);
    const vehicleBodies = await fetchBodiesByType(typeMapping[params.slug[0]]);
    console.log('>>>>>>dataofVehcles', dataofVehcles)

    loading = false;
    return (
        <>
            <section className="product-listing py-5 position-relative">
                {!dataofVehcles &&
                    <LoadingOverlay
                        visible={true}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{ color: 'red', type: 'bars' }}
                    />
                }
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ListingFilter type={params.slug[0]} makes={vehicleMakes} bodies={vehicleBodies} vehicles={dataofVehcles?.data} />
                        </div>
                        <div className="col-lg-9">
                            {/* Toolbox */}
                            <ListingHeader type={params.slug[0]} />


                            {/* Product Listing Section */}
                            <div className="title-section">
                                <h6 className="cat-title mb-0">Featured Classified</h6>
                                <Link href={"#"} className="text-primary text-decoration-none">
                                    Show all
                                </Link>
                            </div>

                            {/* Product View List */}
                            <div className="row">
                                {dataofVehcles?.data?.results?.map((vehicle, index) => (
                                    <div key={index} className={view === 'list' ? "col-lg-12" : "col-4"}>
                                        {view === 'list' ? (
                                            <ListCardView index={index} vehicle={vehicle} />
                                        ) : (
                                            <CarCard vehicle={vehicle} index={index} />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <ListingPagination data={dataofVehcles?.data} type={params.slug} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
