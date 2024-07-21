import Hero from "./Hero";
import BrowseByCategory from "./BrowseByCategory";
import BrowseByType from "./BrowseByType";
import ComparisonProducts from "./ComparisonProducts";
import SearchByLocations from "./SearchByLocations";
import BrowseVideos from "./BrowseVideos";
import BrowseBlogs from "./BrowseBlogs";


export default function HomeModule() {

  return (
    <>
      <Hero />
      <BrowseByCategory />
      <BrowseByType />
      <ComparisonProducts />
      <SearchByLocations />
      <BrowseVideos />
      <BrowseBlogs />

     
    </>
  );
}
