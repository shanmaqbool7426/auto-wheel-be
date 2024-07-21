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
            <div className="col-lg-9">
              <div className="toolbox">
                <div className="toolbox-left">
                  <h3 className="fw-bold">
                    Cars for <span className="text-primary">Sale</span>
                  </h3>
                </div>
                <div className="toolbox-right">
                  <div className="select-filter-listing">
                    <div>
                      <label htmlFor="sort_by">SORT BY:</label>
                      <select
                        className="form-select form-select-sm"
                        ariaLabel="Sort By"
                        id="sort_by"
                      >
                        <option selected>Date: Newest First</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
