import React from "react";
import { ethers } from "ethers";
import { useStore } from "../../store";

const Connect = () => {
  const { web3 } = useStore();

  const getButtonText = () => {
    if (web3.status === "LOADING") return "Loading";
    if (web3.status === "NO_ACCOUNT") return "Connect";
    if (web3.status === "WRONG_NETWORK") return "Wrong Network";
    if (web3.status === "NO_METAMASK") return "Install Metamask";
    if (web3.status === "READY")
      return web3.account.slice(0, 3) + "..." + web3.account.slice(39);
  };

  const requestAccount = async () => {
    await web3.provider.provider.request({ method: "eth_requestAccounts" });
  };

  const handleClick = () => {
    if (web3.status === "NO_METAMASK") {
      window.open("https://metamask.io/");
    }
    if (web3.status === "WRONG_NETWORK") {
      web3.switchNetwork();
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
