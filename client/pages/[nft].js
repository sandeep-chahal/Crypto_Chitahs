import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useStore } from "../store";
import Attribute from "../components/attribute";
const getImageSize = () => {
  if (typeof window === "undefined" || window.innerWidth < 2000) return 1500;
  return 2000;
};

const NFT = () => {
  const [attrs, setAttrs] = useState(null);
  const router = useRouter();
  const { attributes } = useStore();
  const nftNumber = parseInt(router.query.nft);

  useEffect(() => {
    (async () => {
      if (attributes && nftNumber) {
        console.log(nftNumber);
        const attrs = await attributes.get(nftNumber);
        console.log(attrs);
        setAttrs(attrs);
      }
    })();
  }, [nftNumber, attributes]);
  if (!nftNumber) return null;
  return (
    <section className="min-h-[80vh] px-40 mt-10">
      <div className="flex items-start">
        <img
          className="rounded-md w-[500px] h-[500px]"
          src={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=${getImageSize()}&h=${getImageSize()}&output=webp`}
          width={getImageSize}
          height={getImageSize}
          loading="eager"
          onError={(e) => {
            if (e.currentTarget.src.includes("images.weserv.nl"))
              e.currentTarget.src = `https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png`;
          }}
        />
        <div className="ml-10">
          <h1 className="font-black text-6xl">Crypto Chitahs #{nftNumber}</h1>
          <p className="mt-5 font-medium">
            Coalition Crew 2.0 collection. What makes this project unique is the
            collective intelligence of our community. The utility of the Game
            Changers Academy, and the ability to contribute in saving wild
            cheetahs from extinction. Our mission is to give people the
            resources, network, and guidance they need to truly build a life and
            business on THEIR TERMS. Find out more about what we offer our
            holders and our different collections at ccrewnft.com.
          </p>
          <div className="flex items-center">
            <button className="font-semibold text-2xl bg-slate-100 text-slate-800 py-1 px-6 rounded-lg mt-5 transition-all hover:-translate-y-2">
              Mint 1.25 ETH
            </button>
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Attributes</h3>
            <ul className="flex flex-wrap">
              {attrs
                ? Object.keys(attrs)
                    .filter((a) => a !== "key")
                    .map((key, i) => (
                      <Attribute name={key} value={attrs[key]} />
                    ))
                : null}
            </ul>
          </div>
        </div>
      </div>
      {/* next prev buttons */}
      <div className="flex items-center justify-between mt-10">
        <Link href={`${nftNumber === 1 ? 1 : nftNumber - 1}`}>
          <a>
            <img
              width={25}
              height={25}
              src="arrow.svg"
              className="-rotate-90"
            />
          </a>
        </Link>
        <Link href={`${nftNumber === 3974 ? 3974 : nftNumber + 1}`}>
          <a>
            <img width={25} height={25} src="arrow.svg" className="rotate-90" />
          </a>
        </Link>
      </div>
    </section>
  );
};

export default NFT;
