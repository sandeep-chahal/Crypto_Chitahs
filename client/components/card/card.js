import React from "react";
import Image from "next/image";

const Card = ({ nft }) => {
  return (
    <div className="bg-slate-100 text-slate-800 rounded-lg p-3 shadow-lg shadow-slate-100 mx-4 my-6 hover:scale-105 hover:-rotate-6 transition-transform">
      <img
        src={`https://images.weserv.nl/?url=${nft.image}&w=400&h=400&output=webp`}
        width={200}
        height={200}
        className="rounded-lg"
      />
      <div className="py-1">
        <h3 className="font-bold text-lg">{nft.name}</h3>
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

export default Card;
