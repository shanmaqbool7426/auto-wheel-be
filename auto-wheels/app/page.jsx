import Hero from "./sections/Hero";
import BrowseByCategory from "./sections/BrowseByCategory";
import BrowseByType from "./sections/BrowseByType";
import ComparisonProducts from "./sections/ComparisonProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <BrowseByCategory />
      <BrowseByType />
      <ComparisonProducts />
    </>
  );
}
