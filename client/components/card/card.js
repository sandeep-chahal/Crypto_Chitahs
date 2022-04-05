import React from "react";
import Link from "next/link";
import { useStore } from "../../store";

const Card = ({ nftNumber }) => {
  const { likedItems, updateLiked } = useStore();
  return (
    <div className="bg-slate-100 text-slate-800 rounded-lg p-3 shadow-sm shadow-slate-100 mx-4 my-6 hover:scale-105 hover:-rotate-6 transition-all group">
      <img
        src={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=400&h=400&output=webp`}
        width={200}
        height={200}
        loading="lazy"
        onError={(e) => {
          if (!e.currentTarget.src.includes("w=450&h=450"))
            e.currentTarget.src = `https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=450&h=450&output=webp`;
        }}
        className="rounded-lg group-hover:scale-125 group-hover:-translate-y-5 transition-all"
      />

      <div className="py-1">
        <div className="flex flex-center justify-between">
          <h3 className="font-bold text-lg">Crypto Chitahs #{nftNumber}</h3>
          <img
            className="cursor-pointer transition-all active:scale-125"
            width={15}
            height={15}
            src={likedItems[nftNumber] ? "heart-filled.svg" : "heart.svg"}
            onClick={() => updateLiked(nftNumber, !likedItems[nftNumber])}
          />
        </div>
        <Link href={`/${nftNumber}`}>
          <a className="flex items-center group">
            View{" "}
            <img
              className="ml-2 w-4 transition-transform group-hover:translate-x-2"
              src="/right-arrow.svg"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
