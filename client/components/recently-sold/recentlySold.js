import React from "react";
import { getSampleNfts } from "../../utils";
import SmallCard from "../small-card/";

const RecentlySold = () => {
  return (
    <section className="px-40 py-5 mt-10 bg-slate-100 text-slate-800">
      <h2 className="font-black text-2xl mb-6">Recently Sold</h2>
      {/* container */}
      <div className="flex flex-wrap justify-between">
        {getSampleNfts(535, 9).map((nft, i) => (
          <SmallCard key={i} nft={nft} />
        ))}
      </div>
    </section>
  );
};

export default RecentlySold;
