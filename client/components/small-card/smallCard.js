import React from "react";

const SmallCard = ({ nft }) => {
  return (
    <div className="flex my-4 items-start">
      {/* left */}
      <img
        width={150}
        height={150}
        src={`https://images.weserv.nl/?url=${nft.image}&w=300&h=300&output=webp`}
      />
      {/* right */}
      <div className="ml-3">
        <h3 className="font-semibold">{nft.name}</h3>
        <p>
          From{" "}
          <span className="text-blue-800 hover:underline underline-offset-4">
            {nft.from.slice(0, 3)}...{nft.from.slice(39)}
          </span>
        </p>
        <p>
          To:{" "}
          <span className="text-blue-800 hover:underline underline-offset-4">
            {nft.from.slice(0, 3)}...{nft.from.slice(39)}
          </span>
        </p>
        <div className="font-black text-base">{nft.price} ETH</div>
        <button className="flex items-center group">
          View on explorer{" "}
          <img
            className="ml-2 w-4 transition-transform group-hover:translate-x-2"
            src="/right-arrow.svg"
          />
        </button>
      </div>
    </div>
  );
};

export default SmallCard;
