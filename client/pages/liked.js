import React, { useState, useEffect, useRef } from "react";
import Card from "../components/card";
import { useStore } from "../store";

const Liked = () => {
  const { likedItems } = useStore();

  const _likedItems = Object.keys(likedItems)
    .filter((key) => likedItems[key])
    .map((key) => key);

  return (
    <section className="px-5 md:px-20 lg:px-40 py-5 md:my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-lg md:text-2xl">Liked NFTs</h1>
          <p className="text-ms md:text-base">Oh yeah! Good old NFTs</p>
        </div>
      </div>
      <ul className="flex flex-wrap justify-between">
        {_likedItems.length ? (
          _likedItems.map((key) => <Card nftNumber={key} key={key} />)
        ) : (
          <p>No liked items</p>
        )}
      </ul>
    </section>
  );
};
export default Liked;
