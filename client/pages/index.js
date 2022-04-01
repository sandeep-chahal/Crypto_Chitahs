import Hero from "../components/hero";
import Nav from "../components/nav";

const Home = () => {
  return (
    <div className="bg-slate-900 text-zinc-200  min-h-screen">
      <Nav />
      <Hero />
    </div>
  );
};

export default Home;
