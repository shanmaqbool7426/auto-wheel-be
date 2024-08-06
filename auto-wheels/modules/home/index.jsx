import Hero from "./Hero";
import BrowseByCategory from "./BrowseByCategory";
import BrowseByType from "./BrowseByType";
import ComparisonProducts from "./ComparisonProducts";
import SearchByLocations from "./SearchByLocations";
import BrowseVideos from "./BrowseVideos";
import BrowseBlogs from "./BrowseBlogs";
import {fetchDashboardData} from "../../services/dashboard"

export default async  function HomeModule() {
 const res= await fetchDashboardData()

 console.log('res>>>>', res?.vehiclesTypes)
  return (
    <>
      <Hero />
      <BrowseByCategory makes={res?.makes} bodies={res?.bodies}/>
      <BrowseByType vehicles={res?.vehiclesTypes}/>
      <ComparisonProducts />
      <SearchByLocations />
      {/* <BrowseVideos /> */}
      {/* <BrowseBlogs /> */}

     
    </>
  );
}
