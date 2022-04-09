import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ethers } from "ethers";
import { useStore } from "../store";
import Attribute from "../components/attribute";
import MintButton from "../components/mint-button/mintButton";
import Popup from "reactjs-popup";

const getImageSize = () => {
  if (typeof window === "undefined" || window.innerWidth < 2000) return 1500;
  return 2000;
};

const NFT = () => {
  const [isMinted, setIsMinted] = useState(null);
  const [price, setPrice] = useState(null);
  const [attrs, setAttrs] = useState(null);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { db, likedItems, updateLiked, web3 } = useStore();

  let nftNumber;
  if (typeof window !== "undefined")
    nftNumber = parseInt(window.location.pathname.replace("/", ""));
  else nftNumber = parseInt(router.query.nft);

  useEffect(() => {
    (async () => {
      if (db && nftNumber && !attrs && nftNumber > 0 && nftNumber <= 3974) {
        console.log("NFT: Querying Attributes From IndexedDB");
        const attrs = await db.items.get(nftNumber).then((attrs) => {
          setAttrs(attrs);
        });
      }
      if (
        nftNumber &&
        web3.marketPlaceContract &&
        nftNumber > 0 &&
        nftNumber <= 3974
      ) {
        let filterToMe = web3.nftContract.filters.Transfer(
          ethers.constants.AddressZero,
          null,
          nftNumber
        );

        const [price, events] = await Promise.all([
          web3.marketPlaceContract.getPrices([nftNumber]),
          web3.nftContract.queryFilter(filterToMe),
        ]);

        if (events.length > 0) {
          console.log("NFT: Already Minted");
          const tx = await events[0].getTransaction();
          await tx.wait();
          const price = tx.value;
          setPrice(price);
          setIsMinted(true);
        } else {
          setPrice(price[0]);
          setIsMinted(false);
        }
      }
    })();
  }, [nftNumber, db, web3]);

  const mintNFT = async () => {
    if (web3.status === "READY" && price) {
      try {
        setMinting(true);
        const signer = web3.provider.getSigner();
        const tx = await web3.marketPlaceContract
          .connect(signer)
          .mint(nftNumber, {
            value: price,
          });
        const receipt = await tx.wait();
        console.log("NFT: receipt", receipt, price);
        setIsMinted(true);
        setMinting(false);
      } catch (err) {
        console.log("NFT: ", err);
        if (err.data && err.data.message) {
          console.log("NFT: ", err.data.message.split("'")[1]);
          setError(
            "Contract threw this error: " + err.data.message.split("'")[1]
          );
        } else {
          setError("Something Went Wrong!");
        }
        setMinting(false);
      }
    }
  };

  console.log("NFT: nftNumber", nftNumber);
  if (isNaN(nftNumber)) return null;
  if (nftNumber < 1 || nftNumber > 3974) {
    return (
      <section className="min-h-[80vh] px-5 md:px-20 lg:px-40 mt-10">
        <h1 className="text-center">This NFT does not exist.</h1>
      </section>
    );
  }
  return (
    <section className="min-h-[80vh] px-5 md:px-20 xl:px-40 mt-10">
      <div className="relative flex flex-col md:flex-row items-start">
        <img
          className="w-full h-auto max-w-[400px] rounded-md md:max-w-none md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px]"
          src={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=${getImageSize()}&h=${getImageSize()}&output=webp`}
          width={getImageSize()}
          height={getImageSize()}
          loading="eager"
          onError={(e) => {
            if (e.currentTarget.src.includes("images.weserv.nl"))
              e.currentTarget.src = `https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png`;
          }}
        />

        <div className="mt-5 md:mt-0 md:ml-10">
          <h1 className="font-black text-xl md:text-4xl xl:text-6xl">
            Crypto Chitahs #{nftNumber}
          </h1>
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
          <p className="mt-3 font-medium text-sm lg:text-base">
            Coalition Crew 2.0 collection. What makes this project unique is the
            collective intelligence of our community. The utility of the Game
            Changers Academy, and the ability to contribute in saving wild
            cheetahs from extinction. Our mission is to give people the
            resources, network, and guidance they need to truly build a life and
            business on THEIR TERMS. Find out more about what we offer our
            holders and our different collections at ccrewnft.com.
          </p>
          <div className="flex items-center">
            <MintButton
              price={price}
              disabled={!price || minting || isMinted}
              isMinted={isMinted}
              isMinting={minting}
              onClick={mintNFT}
              status={web3.status}
            />
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
      <div className="flex items-center justify-between mb-10 md:mb-0 mt-10">
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
      <Popup
        open={!!error}
        closeOnDocumentClick
        onClose={() => setError(null)}
        className="bg-slate-100"
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="text-center text-slate-800 bg-slate-200 py-3 px-5 rounded-md">
          <h2 className="font-semibold text-xl">Transaction Failed</h2>
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-3 py-1 px-3 rounded-md font-semibold border-2 bg-slate-800 text-slate-200"
          >
            Okay!
          </button>
        </div>
      </Popup>
    </section>
  );
};

export default NFT;
