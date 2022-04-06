import { ethers } from "ethers";
import React from "react";
import { shortenAddress } from "../../utils";

const SmallCard = ({ nft, className, account }) => {
  return (
    <div
      className={`flex my-4 p-2 px-4 items-start hover:bg-slate-200 rounded-lg transition-all cursor-pointer group ${className}`}
    >
      {/* left */}
      <img
        width={150}
        height={150}
        src={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nft.tokenId.toNumber()}.png&w=300&h=300&output=webp`}
        className="rounded-lg group-hover:scale-95 transition-all"
      />
      {/* right */}
      <div className="ml-3">
        <h3 className="font-semibold">
          Crypto Chitahs #{nft.tokenId.toNumber()}
        </h3>
        <p>
          From{" "}
          <span className="text-blue-800 hover:underline underline-offset-4">
            {ethers.constants.AddressZero === nft.from
              ? "Minter"
              : shortenAddress(nft.from)}
          </span>
        </p>
        <p>
          To:{" "}
          <span className="text-blue-800 hover:underline underline-offset-4">
            {account === nft.to ? "You" : shortenAddress(nft.to)}
          </span>
        </p>
        <div className="font-black text-base">
          {ethers.utils.formatEther(nft.tx.value)} ETH
        </div>
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
