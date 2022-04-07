import React from "react";

const Footer = () => {
  return (
    <footer className="px-40 bg-slate-100 text-slate-800 py-5">
      <div>
        <p className="m-auto text-center w-1/3">
          This is not the real Crypto Chitahs NFT Collection. The original NFT
          collection can be found{" "}
          <a
            href="https://opensea.io/collection/coalition-crew-2-0"
            target="_blank"
            className="underline underline-offset-1"
          >
            here
          </a>
          .
        </p>
      </div>
      {/* fake copyright */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/2894.png&w=64&h=64&output=webp"
            alt="logo"
            className="rounded-full"
            width={20}
            height={20}
          />
          <span className="ml-4">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-5">Privacy Policy</span>
          <span>Terms of Use</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
