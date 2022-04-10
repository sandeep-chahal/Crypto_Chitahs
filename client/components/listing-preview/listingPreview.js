import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "../card";

const ListingPreview = ({ nfts }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <section className="px-5 md:px-20 lg:px-40">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-black text-2xl md:mb-6 flex items-center justify-between"
      >
        <span>Listings</span>
        <Link href="/browse">
          <a className="flex items-center group text-base">
            View All{" "}
            <img
              className="ml-2 w-4 transition-transform group-hover:translate-x-2 invert"
              src="/right-arrow.svg"
            />
          </a>
        </Link>
      </motion.h2>
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-between"
      >
        {nfts.map((nft, i) => (
          <Card price={nft} nftNumber={i + 1} key={i} />
        ))}
      </motion.ul>
    </section>
  );
};

export default ListingPreview;
