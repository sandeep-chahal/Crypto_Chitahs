import React from "react";
import Button from "../button";

const Hero = () => {
  return (
    <section className="grid grid-cols-2 gap-4 px-40 text-zinc-200 h-[80vh]">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-start text-[17char]">
        <h1 className="text-5xl font-black mb-2 font-sans">
          Discover And Collect Rare Chitahs From The Wild
        </h1>
        <p className="font-medium">
          What makes this project unique is the collective intelligence of our
          community. The utility of the Game Changers Academy, and the ability
          to contribute in saving wild cheetahs from extinction.
        </p>
        {/* <Button>Discover</Button> */}
        <button className="mt-10 font-semibold border-2 rounded-md px-5 py-2 hover:bg-white hover:-translate-y-2 hover:text-slate-900 transition-all">
          Discover
        </button>
      </div>
      {/* Right Side */}
      <div className="flex justify-center items-center">
        <img className="rounded-2xl h-[50vh]" src="/6.png" />
      </div>
    </section>
  );
};

export default Hero;
