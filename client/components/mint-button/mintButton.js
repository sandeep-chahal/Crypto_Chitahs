import React from "react";
import { ethers } from "ethers";

const MintButton = ({
  onClick,
  disabled,
  className,
  isMinted,
  price,
  isMinting,
  status,
}) => {
  const getButtonText = () => {
    let text = "";
    if (isMinted) {
      text = `Minted ${ethers.utils.formatEther(price)} ETH`;
    }
    if (isMinting) text = "Minting";
    if (!isMinted && !isMinting && price) {
      text = `Mint ${ethers.utils.formatEther(price)} ETH`;
    }
    if (!price) {
      return "Wait...";
    }
    return text;
    // isMinted
    //   ? `Minted ${ethers.utils.formatEther(price)} ETH`
    //   : price
    //   ? `Mint ${ethers.utils.formatEther(price)} ETH`
    //   : "Loading..";
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold text-2xl py-1 px-6 rounded-sm mt-5 transition-all hover:bg-slate-800 hover:text-slate-200 ${
        status === "LOADING" &&
        isMinted &&
        "opacity-50 bg-slate-800 text-slate-200 cursor-not-allowed"
      } bg-slate-100 text-slate-800  ${className}`}
    >
      {getButtonText()}
    </button>
  );
};

export default MintButton;
