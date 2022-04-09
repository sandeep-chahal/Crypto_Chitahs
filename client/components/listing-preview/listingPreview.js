import React from "react";
import Card from "../card";

const ListingPreview = ({ nfts }) => {
  return (
    <section className="px-5 md:px-20 lg:px-40">
      <h2 className="font-black text-2xl md:mb-6 flex items-center justify-between">
        <span>Listings</span>
        <button className="flex items-center group text-base">
          View All{" "}
          <img
            className="ml-2 w-4 transition-transform group-hover:translate-x-2 invert"
            src="/right-arrow.svg"
          />
        </button>
      </h2>
      <ul className="flex flex-wrap justify-between">
        {nfts.map((nft, i) => (
          <Card price={nft} nftNumber={i + 1} key={i} />
        ))}
      </ul>
    </section>
  );
};

export default ListingPreview;
