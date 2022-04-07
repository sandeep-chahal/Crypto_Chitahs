import React, { useState, useEffect } from "react";
import Hero from "../components/hero";
import ListingPreview from "../components/listing-preview";
import RecentlyMinted from "../components/recently-minted";
import RecentlySold from "../components/recently-sold";
import Community from "../components/community";
import { ethers } from "ethers";
import { getServerSideWeb3, parseServerSideProps } from "../utils";

const Home = ({ basePrice, minted, sold, totalMinted }) => {
  const recentlyMinted = parseServerSideProps(JSON.parse(minted));
  const recentlySold = parseServerSideProps(JSON.parse(sold));

  return (
    <>
      <Hero basePrice={basePrice} totalMinted={totalMinted} />
      <ListingPreview />
      <RecentlyMinted nfts={recentlyMinted} />
      <Community />
      <RecentlySold nfts={recentlySold} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  console.log("getting server side props");

  const web3 = getServerSideWeb3();

  // get base price
  const basePrice = await web3.marketPlaceContract.basePrice();

  let _totalMinted;
  // filters
  const mintedFilter = web3.nftContract.filters.Transfer(
    ethers.constants.AddressZero
  );
  const soldFilter = web3.nftContract.filters.Transfer(null);

  // getting events
  let mintedEvents, soldEvents;
  [mintedEvents, soldEvents] = await Promise.all([
    web3.nftContract.queryFilter(mintedFilter),
    web3.nftContract.queryFilter(soldFilter, -1000),
  ]);

  _totalMinted = mintedEvents.length;
  // restrict to last 10 events
  soldEvents = soldEvents.filter((event, i) => i < 10);
  mintedEvents = soldEvents.filter((event, i) => i < 10);

  // get minted
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

  // get transferred
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
  console.log("got server side props");
  // Pass data to the page via props
  return {
    props: {
      basePrice: ethers.utils.formatEther(basePrice),
      minted: JSON.stringify(minted),
      sold: JSON.stringify(sold),
      totalMinted: _totalMinted,
    },
    revalidate: 10,
  };
}
