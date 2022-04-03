import Nav from "../nav";
import Footer from "../footer";

export default ({ children }) => {
  return (
    <div className="bg-slate-900 text-zinc-200">
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
