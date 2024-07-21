import ListingFilter from "@/components/listing/sidebar-filter";

export default function ProductListing() {
  return (
    <>
      <section className="product-listing py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingFilter />
            </div>
            <div className="col-lg-9">Main Listing</div>
          </div>
        </div>
      </section>
    </>
  );
}
