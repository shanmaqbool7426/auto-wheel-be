
import Listing from "@/components/listing/listing";
export default function ProductListing({ params ,searchParams}) {
  
  return (
    <>
    <Listing params={params} searchParams={searchParams}/>
    </>
  );
}
