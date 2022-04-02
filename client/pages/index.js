import Hero from "../components/hero";
import Nav from "../components/nav";
import ListingPreview from "../components/listing-preview";

const Home = () => {
  return (
    <div className="bg-slate-900 text-zinc-200">
      <Nav />
      <Hero />
      <ListingPreview />
      <div className="h-[30vh]" />
    </div>
  );
};

export default Home;
