import Hero from "./sections/Hero";
import BrowseByCategory from "./sections/BrowseByCategory";
import BrowseByType from "./sections/BrowseByType";

export default function Home() {
  return (
    <>
      <Hero />
      <BrowseByCategory />
      <BrowseByType />
    </>
  );
}
