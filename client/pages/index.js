import Hero from "../components/hero";
import Nav from "../components/nav";
import ListingPreview from "../components/listing-preview";
import RecentlyMinted from "../components/recently-minted";
import RecentlySold from "../components/recently-sold";

const Home = () => {
  return (
    <div className="bg-slate-900 text-zinc-200">
      <Nav />
      <Hero />
      <ListingPreview />
      <RecentlyMinted />
      <RecentlySold />
      <div className="h-[30vh]" />
    </div>
  );
};

export default Home;
