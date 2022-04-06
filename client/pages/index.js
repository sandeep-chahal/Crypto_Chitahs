import React, { useState, useEffect } from "react";
import Hero from "../components/hero";
import ListingPreview from "../components/listing-preview";
import RecentlyMinted from "../components/recently-minted";
import RecentlySold from "../components/recently-sold";
import Community from "../components/community";
import { useStore } from "../store";
import { ethers } from "ethers";

const Home = () => {
  const { web3 } = useStore();

  const [recentlyMinted, setRecentlyMinted] = useState(null);
  const [recentlySold, setRecentlySold] = useState(null);
  const [totalMinted, setTotalMinted] = useState(null);

  useEffect(() => {
    if (!web3.nftContract) return;

    (async () => {
      let _totalMinted;
      // filters
      const mintedFilter = web3.nftContract.filters.Transfer(
        ethers.constants.AddressZero
      );
      const soldFilter = web3.nftContract.filters.Transfer(null);

      // getting events
      let [mintedEvents, soldEvents] = await Promise.all([
        web3.nftContract.queryFilter(mintedFilter),
        web3.nftContract.queryFilter(soldFilter),
      ]);
      _totalMinted = mintedEvents.length;
      soldEvents = soldEvents.filter(
        // (event) => event.args.from !== ethers.constants.AddressZero
        (event, i) => i < 10
      );
      mintedEvents = soldEvents.filter((event, i) => i < 10);

      // get prices
      const minted = await Promise.all(
        mintedEvents.map(async (event, index) => {
          const tx = await event.getTransaction();
          await tx.wait();
          return {
            from: mintedEvents[index].args.from,
            to: mintedEvents[index].args.to,
            tokenId: mintedEvents[index].args.tokenId,
            tx: tx,
          };
        })
      );
      const sold = await Promise.all(
        soldEvents.map(async (event, index) => {
          const tx = await event.getTransaction();
          await tx.wait();
          return {
            from: soldEvents[index].args.from,
            to: soldEvents[index].args.to,
            tokenId: soldEvents[index].args.tokenId,
            tx: tx,
          };
        })
      );

      setRecentlyMinted(minted);
      setRecentlySold(sold);
      setTotalMinted(_totalMinted);
    })();
  }, [web3]);

  useEffect;
  return (
    <>
      <Hero basePrice={web3.basePrice || 0} totalMinted={totalMinted || 0} />
      <ListingPreview />
      <RecentlyMinted nfts={recentlyMinted} />
      <Community />
      <RecentlySold nfts={recentlySold} />
    </>
  );
};

export default Home;
