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
      text = `Minted`;
    }
    if (isMinting) text = "Minting";
    if (!isMinted && !isMinting && price) {
      text = `Mint`;
    }
    if (!price) {
      return "Wait...";
    }
    return text;
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center font-semibold text-2xl py-1 px-3 rounded-md mt-5 transition-al ${
        status === "LOADING" &&
        isMinted &&
        "opacity-50 bg-slate-800 text-slate-200 cursor-not-allowed"
      } bg-slate-100 text-slate-800  ${className}`}
    >
      <img
        src="/leopard.svg"
        width={40}
        height={40}
        className="w-10 h-10 mr-2"
      />
      <span>{getButtonText()}</span>
      {price && !isMinted && (
        <>
          <div className="w-[2px] h-max bg-slate-400 mx-2">&nbsp;</div>
          <span className="font-normal">{ethers.utils.formatEther(price)}</span>
        </>
      )}
    </button>
  );
};

export default MintButton;
