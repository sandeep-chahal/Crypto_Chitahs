import React from "react";
import Card from "../card";

const nfts = Array(8)
  .fill(0)
  .map((_, i) => ({
    name: `Crypto Chitahs #${i + 1}`,
    image: `https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${
      i + 1
    }.png`,
  }));

const ListingPreview = () => {
  return (
    <section className="px-40">
      <h2 className="font-black text-2xl mb-6 flex items-center justify-between">
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
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card nft={nfts[i]} key={i} />
          ))}
      </ul>
    </section>
  );
};

export default ListingPreview;
