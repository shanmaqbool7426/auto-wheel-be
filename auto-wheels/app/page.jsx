import Hero from "./sections/Hero";
import BrowseByCategory from "./sections/BrowseByCategory";
import BrowseByType from "./sections/BrowseByType";
import ComparisonProducts from "./sections/ComparisonProducts";
import SearchByLocations from "./sections/SearchByLocations";

export default function Home() {
  return (
    <>
      <Hero />
      <BrowseByCategory />
      <BrowseByType />
      <ComparisonProducts />
      <SearchByLocations />
    </>
  );
}
