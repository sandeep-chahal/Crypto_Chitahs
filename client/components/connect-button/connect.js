import React from "react";
import { ethers } from "ethers";
import { useStore } from "../../store";

const Connect = () => {
  const { web3 } = useStore();

  const getButtonText = () => {
    if (web3.status === "LOADING") return "Loading";
    if (web3.status === "NO_PROVIDER") return "Install Metamask";
    if (web3.status === "WRONG_NETWORK") return "Wrong Network";
    if (web3.status === "NO_ACCOUNT") return "Connect";
    if (web3.status === "READY")
      return web3.account.slice(0, 3) + "..." + web3.account.slice(39);
  };

  const requestAccount = async () => {
    await web3.provider.provider.request({ method: "eth_requestAccounts" });
  };
  const switchNetwork = async () => {
    try {
      await web3.provider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: ethers.utils.hexlify(
              parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
            ),
          },
        ],
      });
    } catch (err) {
      if (err.code === 4902) {
        try {
          console.log("Switching network");
          await web3.provider.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: ethers.utils.hexlify(
                  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
                ),
                rpcUrls: ["https://mumbai.polygonscan.com"],
                chainName: "Mumbai",
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.log(err);
    }
  };

  const handleClick = () => {
    if (web3.status === "NO_PROVIDER") {
      window.open("https://metamask.io/");
    }
    if (web3.status === "WRONG_NETWORK") {
      switchNetwork();
    }
    if (web3.status === "NO_ACCOUNT") {
      requestAccount();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#FFB447] text-slate-700 py-1 px-3 rounded-md font-black"
    >
      {getButtonText()}
    </button>
  );
};

export default Connect;
