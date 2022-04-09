import { createContext, useContext, useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

import { DB } from "../utils/db";
import { getSwitchNetwork } from "../utils";
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
    status: "LOADING", //LOADING, NO_METAMASK, WRONG_NETWORK, NO_ACCOUNT, READY,
    switchNetwork: () => {},
  });

  useEffect(() => {
    loadAttributes();
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    if (web3.status !== "LOADING") {
      setWeb3((web3) => ({
        ...web3,
        status: "LOADING",
      }));
    }
    let provider, chainId, accounts;
    let isWrongNetwork = true;
    const _provider = await detectEthereumProvider();
    let switchNetwork = () => {};

    if (_provider) {
      provider = new ethers.providers.Web3Provider(_provider, "any");
      chainId = (await provider.getNetwork()).chainId;
      accounts = await provider.listAccounts();
      isWrongNetwork = process.env.NEXT_PUBLIC_CHAIN_ID != chainId;

      switchNetwork = getSwitchNetwork(provider);

      // add listeners
      _provider.on("accountsChanged", function (accounts) {
        window.location.reload();
      });

      _provider.on("networkChanged", function (networkId) {
        window.location.reload();
      });
      console.log("Store: MetaMask Found");
    }
    if (!_provider || isWrongNetwork) {
      provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
      console.log("Store: MetaMask Not Found OR Wrong Network");
    }

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

    let status = "READY";
    if (!accounts || accounts.length === 0) status = "NO_ACCOUNT";
    if (isWrongNetwork) status = "WRONG_NETWORK";
    if (!_provider) status = "NO_METAMASK";

    setWeb3({
      provider,
      nftContract: nftContract,
      marketPlaceContract: marketPlaceContract,
      account: accounts && accounts.length ? accounts[0] : null,
      status,
      switchNetwork,
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
      console.error("Store: ", err);
    }
  };

  const updateLiked = (key, value) => {
    if (!db) {
      console.log("Store: DB not initialized");
      return;
    }
    setLikedItems((lk) => ({ ...lk, [key]: value }));
    if (value)
      db.liked
        .insert({ key })
        .then(() => {
          console.log("Store: Inserted!");
        })
        .catch((err) => {
          console.log("Store: ", err);
        });
    else
      db.liked
        .remove(key)
        .then(() => {
          console.log("Store: Removed!");
        })
        .catch((err) => {
          console.log("Store: ", err);
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
