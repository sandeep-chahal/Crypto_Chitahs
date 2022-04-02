import React from "react";

const WideCard = ({ nft, className }) => {
  return (
    <div
      className={`bg-slate-100 text-slate-800 rounded-lg p-2 mx-4 my-6 flex ${className}`}
    >
      {/* left */}
      <img
        src={`https://images.weserv.nl/?url=${nft.image}&w=400&h=400&output=webp`}
        width={150}
        height={150}
        className="rounded-lg"
      />
      {/* right */}
      <div className="px-4 ">
        <div>
          <h3 className="font-bold text-lg">{nft.name}</h3>
          <p>
            Minted By:{" "}
            <span className="text-blue-800 hover:underline underline-offset-4">
              {nft.to.slice(0, 3)}...{nft.to.slice(39)}
            </span>
          </p>
          <div className="font-black text-xl">{nft.price} ETH</div>
        </div>
        <button className="flex items-center group">
          View{" "}
          <img
            className="ml-2 w-4 transition-transform group-hover:translate-x-2"
            src="/right-arrow.svg"
          />
        </button>
      </div>
    </div>
  );
};

export default WideCard;
