import React, { useState, useEffect, useRef } from "react";
import Card from "../components/card";
import { useStore } from "../store";

const Liked = () => {
  const { likedItems } = useStore();

  const _likedItems = Object.keys(likedItems)
    .filter((key) => likedItems[key])
    .map((key) => key);

  return (
    <section className="px-40 my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl">Liked NFTs</h1>
          <p>Oh yeah! Good old NFTs</p>
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
