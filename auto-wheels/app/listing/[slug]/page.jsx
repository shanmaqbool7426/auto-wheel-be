
import Listing from "@/components/listing/listing";
export default function ProductListing({ params }) {
  console.log('ProductListing>>>', params.slug);
  return (
    <>
    <Listing params={params}/>
    </>
  );
}
