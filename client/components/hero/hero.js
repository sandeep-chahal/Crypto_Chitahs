import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="grid grid-cols-2 gap-4 px-40 h-[80vh]">
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
        <img
          width={400}
          height={400}
          className="rounded-2xl hover:rotate-12 transition-transform"
          src="https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/6.png&w=600&h=600&output=webp"
        />
      </div>
    </section>
  );
};

export default Hero;
