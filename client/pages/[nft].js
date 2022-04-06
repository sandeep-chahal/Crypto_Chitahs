import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ethers } from "ethers";
import { useStore } from "../store";
import Attribute from "../components/attribute";

const getImageSize = () => {
  if (typeof window === "undefined" || window.innerWidth < 2000) return 1500;
  return 2000;
};

const NFT = () => {
  const [isMinted, setIsMinted] = useState(null);
  const [price, setPrice] = useState(null);
  const [attrs, setAttrs] = useState(null);
  const router = useRouter();
  const { db, likedItems, updateLiked, web3 } = useStore();
  const nftNumber = parseInt(router.query.nft);

  useEffect(() => {
    (async () => {
      if (db && nftNumber && web3.marketPlaceContract) {
        const attrs = await db.items.get(nftNumber);
        setAttrs(attrs);
        let filterToMe = web3.nftContract.filters.Transfer(
          ethers.constants.AddressZero,
          null,
          nftNumber
        );
        const [price, events] = await Promise.all([
          web3.marketPlaceContract.getBoostedPrice([nftNumber]),
          web3.nftContract.queryFilter(filterToMe),
        ]);
        console.log("events", events);
        if (events.length > 0) {
          console.log("Already Minted");
          const tx = await events[0].getTransaction();
          await tx.wait();
          const price = tx.value;
          setPrice(price);
          setIsMinted(true);
          console.log("minted price", price);
        } else {
          setPrice(web3.basePrice.add(price[0]));
          setIsMinted(false);
        }
      }
    })();
  }, [nftNumber, db, web3]);

  const mintNFT = async () => {
    if (web3.status === "READY" && price) {
      const signer = web3.provider.getSigner();
      const tx = await web3.marketPlaceContract
        .connect(signer)
        .mint(nftNumber, {
          value: price,
        });
      const receipt = await tx.wait();
      console.log(receipt);
    }
  };

  if (!nftNumber) return null;
  return (
    <section className="min-h-[80vh] px-40 mt-10">
      <div className="relative flex items-start">
        <img
          className="rounded-md w-[500px] h-[500px]"
          src={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=${getImageSize()}&h=${getImageSize()}&output=webp`}
          width={getImageSize()}
          height={getImageSize()}
          loading="eager"
          onError={(e) => {
            if (e.currentTarget.src.includes("images.weserv.nl"))
              e.currentTarget.src = `https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png`;
          }}
        />

        <div className="ml-10">
          <h1 className="font-black text-6xl">Crypto Chitahs #{nftNumber}</h1>
          <div className="mt-5 flex items-center">
            <img
              title={likedItems[nftNumber] ? "Unlike" : "Like"}
              className="cursor-pointer invert ml-3 transition-all active:scale-125"
              width={25}
              height={25}
              src={likedItems[nftNumber] ? "heart-filled.svg" : "heart.svg"}
              onClick={() => updateLiked(nftNumber, !likedItems[nftNumber])}
            />
            <img
              title="Share"
              className="cursor-pointer invert ml-3 transition-all active:scale-125"
              width={25}
              height={25}
              src="share.svg"
              onClick={() =>
                navigator.share({
                  title: `Crypto Chitahs #${nftNumber}`,
                  text: `Check out this Crypto Chitahs #${nftNumber}`,
                  url: `./${nftNumber}`,
                })
              }
            />
          </div>
          <p className="mt-3 font-medium">
            Coalition Crew 2.0 collection. What makes this project unique is the
            collective intelligence of our community. The utility of the Game
            Changers Academy, and the ability to contribute in saving wild
            cheetahs from extinction. Our mission is to give people the
            resources, network, and guidance they need to truly build a life and
            business on THEIR TERMS. Find out more about what we offer our
            holders and our different collections at ccrewnft.com.
          </p>
          <div className="flex items-center">
            <button
              onClick={mintNFT}
              disabled={!price}
              className={`font-semibold text-2xl bg-slate-100 text-slate-800 py-1 px-6 rounded-sm mt-5 transition-all hover:-translate-y-2 ${
                isMinted && "opacity-50 hover:translate-y-0 cursor-not-allowed"
              } ${web3.status === "LOADING" && "opacity-50"}`}
            >
              {isMinted
                ? `Minted ${ethers.utils.formatEther(price)} ETH`
                : price
                ? `Mint ${ethers.utils.formatEther(price)} ETH`
                : "Loading.."}
            </button>
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Attributes</h3>
            <ul className="flex flex-wrap">
              {attrs
                ? Object.keys(attrs)
                    .filter((a) => a !== "key")
                    .map((key, i) => (
                      <Attribute
                        key={key}
                        name={key}
                        value={attrs[key]}
                        onClick={() => {
                          router.push({
                            pathname: "/browse",
                            query: {
                              [key]: attrs[key],
                            },
                          });
                        }}
                      />
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
