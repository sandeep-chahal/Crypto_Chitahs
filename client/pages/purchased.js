import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SmallCard from "../components/small-card";
import { useStore } from "../store";

const Liked = () => {
  const { web3 } = useStore();
  const [purchased, setPurchase] = useState(null);

  useEffect(() => {
    if (web3.status != "READY") return;
    (async () => {
      const filter = web3.nftContract.filters.Transfer(null, web3.account);
      const events = await web3.nftContract.queryFilter(filter);
      const _purchased = await Promise.all(
        events.map(async (event, index) => {
          const tx = await event.getTransaction();
          await tx.wait();
          return {
            tx,
            from: events[index].args.from,
            to: events[index].args.to,
            tokenId: events[index].args.tokenId,
          };
        })
      );
      console.log(_purchased);
      setPurchase(_purchased);
    })();
  }, [web3]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-5 md:px-20 lg:px-40 py-5 md:my-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl">Purchased NFTs</h1>
          <p>List of good decisions you made in the past!</p>
        </div>
      </div>
      <ul className="flex flex-wrap items-start justify-center md:justify-start min-h-[60vh]">
        {purchased && purchased.length ? (
          purchased.map((nft, index) => (
            <SmallCard
              nft={nft}
              key={nft.tokenId.toNumber()}
              className="bg-slate-800 hover:text-slate-800 mr-5"
              account={web3.account}
            />
          ))
        ) : (
          <p>No purchased items</p>
        )}
      </ul>
    </motion.section>
  );
};
export default Liked;
