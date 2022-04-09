import React from "react";
import { getSampleNfts } from "../../utils";
import SmallCard from "../small-card/";

const RecentlySold = ({ nfts }) => {
  return (
    <section className="px-2 md:px-20 lg:px-40 py-5 mt-10 bg-slate-100 text-slate-800">
      <h2 className="font-black text-2xl md:mb-6">Recently Sold</h2>
      {/* container */}
      <div className="flex flex-wrap">
        {nfts && nfts.length ? (
          nfts.map((nft, i) => <SmallCard key={i} nft={nft} className="mr-4" />)
        ) : (
          <p>Couldn't find any recently sold NFTs</p>
        )}
      </div>
    </section>
  );
};

export default RecentlySold;
