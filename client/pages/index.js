import Hero from "../components/hero";
import Nav from "../components/nav";
import ListingPreview from "../components/listing-preview";
import RecentlyMinted from "../components/recently-minted";
import RecentlySold from "../components/recently-sold";
import Community from "../components/community";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="bg-slate-900 text-zinc-200">
      <Nav />
      <Hero />
      <ListingPreview />
      <RecentlyMinted />
      <Community />
      <RecentlySold />
      <Footer />
    </div>
  );
};

export default Home;
