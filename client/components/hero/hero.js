import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = ({ basePrice, totalMinted }) => {
  const [gifLoaded, setGifLoaded] = useState(false);

  const setOnLoadTimer = (ref) => {
    if (ref.complete || gifLoaded) {
      setGifLoaded(true);
    } else setTimeout(() => setOnLoadTimer(ref), 100);
  };

  return (
    <section className="flex px-5 md:px-20 lg:px-40 md:h-[80vh] my-10 md:my-0">
      {/* Left Side */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="flex flex-col justify-center items-start lg:text-[17char] md:w-1/2 mr-3"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 font-sans">
          Discover And Collect Rare Chitahs From The Wild
        </h1>
        <p className="md:text-sm lg:text-base font-medium">
          What makes this project unique is the collective intelligence of our
          community. The utility of the Game Changers Academy, and the ability
          to contribute in saving wild cheetahs from extinction.
        </p>
        {/* info */}
        <div className="flex justify-center mt-5 text-lg">
          {/* number of nfts */}
          <div className="mr-5">
            <div className="font-black underline underline-offset-2">4k</div>
            <div className="text-xs font-thin">NFTs</div>
          </div>
          {/* base price */}
          <div className="mr-5">
            <div className="font-black underline underline-offset-2">
              {basePrice}
            </div>
            <div className="text-xs font-thin">Base Price</div>
          </div>
          {/* minted */}
          <div>
            <div className="font-black underline underline-offset-2">
              {totalMinted}
            </div>
            <div className="text-xs font-thin">Minted</div>
          </div>
        </div>
        <Link href="/browse">
          <a className="mt-5 md:mt-10 font-semibold border-2 rounded-md px-5 py-2 hover:bg-white hover:-translate-y-2 hover:text-slate-900 transition-all">
            Browse
          </a>
        </Link>
      </motion.div>
      {/* Right Side */}
      <div className="hidden md:flex justify-center items-center md:w-2/5 lg:w-1/2">
        <motion.img
          transition={{ type: "spring", stiffness: 200 }}
          initial={{
            scaleX: -0.5,
            scaleY: 0.5,
          }}
          animate={{
            scaleX: -1,
            scaleY: 1,
          }}
          whileHover={{
            rotateZ: 25,
            transition: { duration: 0.3, stiffness: 100 },
          }}
          width={400}
          height={400}
          className={`rounded-2xl -scale-x-100  ${gifLoaded && "hidden"}`}
          src="https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/6.png&w=600&h=600&output=webp"
        />
        <motion.img
          transition={{ type: "spring", stiffness: 200 }}
          initial={{
            scaleX: -0.5,
            scaleY: 0.5,
          }}
          animate={{
            scaleX: -1,
            scaleY: 1,
          }}
          whileHover={{
            rotateZ: 25,
            transition: { duration: 0.3, stiffness: 100 },
          }}
          ref={(ref) => {
            if (ref) setOnLoadTimer(ref);
          }}
          width={400}
          height={400}
          className={`rounded-2xl -scale-x-100 ${!gifLoaded && "hidden"}`}
          src="https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/QmcZ5QkP38GRJjYYBPtJQoJ7MZXM7aENjQocn7k26qC13M&w=600&h=600&output=gif&n=-1"
          onLoad={() => setGifLoaded(true)}
        />
      </div>
    </section>
  );
};

export default Hero;
