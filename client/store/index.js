import { createContext, useContext, useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

import { DB } from "../utils/db";
import MarketPlaceArtifact from "../artifacts/contracts/MarketPlace.sol/MarketPlace.json";
import NFTArtifact from "../artifacts/contracts/CryptoChitahs.sol/CryptoChitahs.json";

const context = createContext();

const ContextProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [web3, setWeb3] = useState({
    provider: null,
    nftContract: null,
    marketPlaceContract: null,
    account: null,
    status: "LOADING", //LOADING, NO_PROVIDER, WRONG_NETWORK, NO_ACCOUNT, READY,
    basePrice: null,
  });

  useEffect(() => {
    loadAttributes();
    loadContractsAndData();
  }, []);

  const loadContractsAndData = async () => {
    if (web3.status !== "LOADING") {
      setWeb3({
        status: "LOADING",
        provider: null,
        nftContract: null,
        marketPlaceContract: null,
        account: null,
      });
    }
    const _provider = await detectEthereumProvider();
    if (!_provider) {
      console.log("Metamask not found");
      setWeb3({
        provider: null,
        nftContract: null,
        marketPlaceContract: null,
        status: "NO_PROVIDER",
      });
      return;
    }
    const provider = new ethers.providers.Web3Provider(_provider, "any");
    // add listeners
    _provider.on("accountsChanged", function (accounts) {
      window.location.reload();
    });

    _provider.on("networkChanged", function (networkId) {
      window.location.reload();
    });

    // --------
    const nftContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFTArtifact.abi,
      provider
    );
    const marketPlaceContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
      MarketPlaceArtifact.abi,
      provider
    );
    const { chainId } = await provider.getNetwork();
    const accounts = await provider.listAccounts();

    const isWrongNetwork = process.env.NEXT_PUBLIC_CHAIN_ID != chainId;
    let basePrice = null;
    if (!isWrongNetwork) {
      try {
        basePrice = await marketPlaceContract.basePrice();
      } catch (err) {
        console.log(err);
      }
      console.log(basePrice);
    }

    console.log(
      !isWrongNetwork
        ? accounts.length
          ? "READY"
          : "NO_ACCOUNT"
        : "WRONG_NETWORK"
    );
    setWeb3({
      provider,
      nftContract: !isWrongNetwork ? nftContract : null,
      marketPlaceContract: !isWrongNetwork ? marketPlaceContract : null,
      account: accounts.length ? accounts[0] : null,
      basePrice,
      status: !isWrongNetwork
        ? accounts.length
          ? "READY"
          : "NO_ACCOUNT"
        : "WRONG_NETWORK",
    });
  };

  const loadAttributes = async () => {
    try {
      const db = new DB("CryptoChitahs");
      await db.collections(["items", "liked"], [{}, { autoIncrement: true }]);
      setDb(db);
      let _likedItems = await db.liked.getAll();
      _likedItems = _likedItems.reduce((acc, item) => {
        acc[item.key] = true;
        return acc;
      }, {});
      setLikedItems(_likedItems);
    } catch (err) {
      console.error(err);
    }
  };

  const updateLiked = (key, value) => {
    if (!db) {
      console.log("DB not initialized");
      return;
    }
    setLikedItems((lk) => ({ ...lk, [key]: value }));
    if (value)
      db.liked
        .insert({ key })
        .then(() => {
          console.log("Inserted!");
        })
        .catch((err) => {
          console.log(err);
        });
    else
      db.liked
        .remove(key)
        .then(() => {
          console.log("Removed!");
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <context.Provider
      value={{
        db,
        likedItems,
        updateLiked,
        web3,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { context, ContextProvider };

export const useStore = () => useContext(context);
