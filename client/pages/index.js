import Hero from "../components/hero";
import ListingPreview from "../components/listing-preview";
import RecentlyMinted from "../components/recently-minted";
import RecentlySold from "../components/recently-sold";
import Community from "../components/community";

const Home = () => {
  return (
    <>
      <Hero />
      <ListingPreview />
      <RecentlyMinted />
      <Community />
      <RecentlySold />
    </>
  );
};

export default Home;
