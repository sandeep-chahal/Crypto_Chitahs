import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "../../store";
import { ethers } from "ethers";

const Card = ({ nftNumber, price }) => {
  const { likedItems, updateLiked } = useStore();
  return (
    <motion.div
      transition={{
        type: "tween",
        duration: 0.15,
      }}
      whileHover={{
        rotateZ: -5,
      }}
      className="bg-slate-100 text-slate-800 rounded-lg p-3 shadow-sm shadow-slate-100 mx-4 my-6 group w-full sm:w-auto"
    >
      <motion.fig layoutId={`${nftNumber}-image`}>
        <img
          src={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=400&h=400&output=webp`}
          width={200}
          height={200}
          loading="lazy"
          onError={(e) => {
            if (!e.currentTarget.src.includes("w=450&h=450"))
              e.currentTarget.src = `https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=450&h=450&output=webp`;
          }}
          className="rounded-lg group-hover:scale-125 group-hover:-translate-y-5 transition-all w-full sm:w-[200px]"
        />
      </motion.fig>

      <div className="py-1">
        <div className="flex flex-center justify-between">
          <motion.h3
            layoutId={`${nftNumber}-title`}
            className="font-bold text-lg"
          >
            Crypto Chitahs #{nftNumber}
          </motion.h3>
          <img
            className="cursor-pointer transition-all active:scale-125"
            width={15}
            height={15}
            src={likedItems[nftNumber] ? "heart-filled.svg" : "heart.svg"}
            onClick={() => updateLiked(nftNumber, !likedItems[nftNumber])}
          />
        </div>
        {price &&
          (parseFloat(price) ? (
            <p className="font-semibold text-green-600">
              {ethers.utils.formatEther(price)} ETH
            </p>
          ) : (
            <p className="font-semibold text-red-400">Minted</p>
          ))}
        <Link href={`/${nftNumber}`}>
          <a className="flex items-center group cursor-pointer">
            View{" "}
            <img
              className="ml-2 w-4 transition-transform group-hover:translate-x-2"
              src="/right-arrow.svg"
            />
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
