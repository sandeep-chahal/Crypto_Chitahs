import React, { useEffect, useRef } from "react";
import WideCard from "../wide-card";

const RecentlyMinted = ({ nfts }) => {
  const slider = useRef(null);
  const isDown = useRef(false);
  let startX = useRef(0);
  let scrollLeft = useRef(0);

  useEffect(() => {
    if (slider.current) {
      slider.current.addEventListener("mousedown", (e) => {
        isDown.current = true;
        startX.current = e.pageX - slider.current.offsetLeft;
        scrollLeft.current = slider.current.scrollLeft;
      });
      slider.current.addEventListener("mouseleave", () => {
        isDown.current = false;
      });
      slider.current.addEventListener("mouseup", () => {
        isDown.current = false;
      });
      slider.current.addEventListener("mousemove", (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - slider.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        slider.current.scrollLeft = scrollLeft.current - walk;
      });
    }
  }, [slider.current]);

  return (
    <section className="mt-20">
      <h2 className="px-5 md:px-20 lg:px-40 font-black text-2xl flex items-center justify-between">
        <span>Recently Minted</span>
        <button className="flex items-center group text-base">
          View All{" "}
          <img
            className="ml-2 w-4 transition-transform group-hover:translate-x-2 invert"
            src="/right-arrow.svg"
          />
        </button>
      </h2>
      <ul
        ref={slider}
        className="flex overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing md:pl-16 lg:pl-36"
      >
        {nfts && nfts.length ? (
          nfts.map((nft, i) => (
            <WideCard
              nft={nft}
              key={nft.tokenId.toNumber()}
              className="min-w-max"
            />
          ))
        ) : (
          <p>No Minted NFTs Found</p>
        )}
      </ul>
    </section>
  );
};

export default RecentlyMinted;
