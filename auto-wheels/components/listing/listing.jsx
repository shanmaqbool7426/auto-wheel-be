
import ListingFilter from "@/components/listing/sidebar-filter";
import ListingPagination from "@/components/listing/pagination";
import { ListingHeader } from "@/components/listing/header";
import ListCardView from "@/components/ui/ListCardView";
import CarCard from "@/components/ui/CarCard";
import Link from "next/link";
import { LoadingOverlay } from '@mantine/core';
import { fetchMakesByType, fetchVehiclsData } from "@/services/vehicles"
export default async function Listing({ params, searchParams }) {
    const view = searchParams.view;
    const typeMapping = {
        cars: 'car',
        bikes: 'bike',
        trucks: 'truck',
    };
    const reorderSlug = (slug) => {
        const basePath = slug[0];
        const makes = slug.filter((item) => item.startsWith('mk_'));
        const models = slug.filter((item) => item.startsWith('md_'));
        const cities = slug.filter((item) => item.startsWith('ct_'));
        const bodyType = slug.filter((item) => item.startsWith('bt_'));
        const page = slug.find((item) => item.startsWith('page_'));
        const price = slug.find((item) => item.startsWith('pr_'));
        const year = slug.find((item) => item.startsWith('yr_'));
        const mileage = slug.find((item) => item.startsWith('ml_'));
        const transmission = slug.find((item) => item.startsWith('tr_'));
        const drive = slug.find((item) => item.startsWith('dr_'));
        const exteriorColor = slug.find((item) => item.startsWith('cl_'));
        const fuelType = slug.find((item) => item.startsWith('ft_'));
        const condition = slug.find((item) => item.startsWith('cn_'));
        const sortBy = searchParams.sortBy ? `sb_${searchParams.sortBy}` : searchParams.sortBy;

        const dynamicSlug = [
            `t_${typeMapping[basePath]}`,
            ...makes,
            ...models,
            ...cities,
            ...bodyType,
            page,
            price,
            year,
            mileage,
            transmission,
            drive,
            exteriorColor,
            fuelType,
            condition,
            sortBy
        ].filter(Boolean);

        return `/${dynamicSlug.join('/')}`;
    };


    const reorderedSlug = reorderSlug(params.slug);
    console.log('>>>>>>url', reorderedSlug)
    let loading = true;
    const dataofVehcles = await fetchVehiclsData(reorderedSlug);
    const vehicleMakes = await fetchMakesByType(typeMapping[params.slug[0]]);
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
                            <ListingFilter type={params.slug[0]} makes={vehicleMakes} />
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
