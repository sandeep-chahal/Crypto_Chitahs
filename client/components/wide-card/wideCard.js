import { ethers } from "ethers";
import React from "react";
import { shortenAddress } from "../../utils";

const WideCard = ({ nft, className }) => {
  return (
    <div
      className={`bg-slate-100 text-slate-800 rounded-lg p-2 mx-4 my-6 flex group hover:-translate-y-2 transition-all cursor-pointer ${className}`}
    >
      {/* left */}
      <img
        src={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nft.tokenId.toNumber()}.png&w=400&h=400&output=webp`}
        width={150}
        height={150}
        className="rounded-lg group-hover:translate-y-4 transition-all"
      />
      {/* right */}
      <div className="px-4 ">
        <div>
          <h3 className="font-bold text-lg">
            Crypto Chitahs #{nft.tokenId.toNumber()}
          </h3>
          <p>
            Minted By:{" "}
            <span className="text-blue-800 hover:underline underline-offset-4">
              {shortenAddress(nft.to)}
            </span>
          </p>
          <div className="font-black text-xl">
            {ethers.utils.formatEther(nft.tx.value)} ETH
          </div>
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
