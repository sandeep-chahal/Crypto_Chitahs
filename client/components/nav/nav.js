import React from "react";
import Link from "next/link";

import Search from "../search";
import Connect from "../connect-button";

const Nav = () => {
  return (
    // wrapper
    <header className="pt-10">
      {/* nav */}
      <div className="relative w-4/5 p-3 px-4 bg-slate-200 text-slate-700 m-auto rounded-3xl flex items-center justify-between">
        {/* left */}
        <div className="flex items-center">
          <img
            src="https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/2894.png&w=64&h=64&output=webp"
            className="w-8 rounded-full mr-2 shadow-md shadow-[#F6F193]"
          />
          <h1 className="font-black">Crypto Chitahs</h1>
        </div>
        {/* right */}
        <ul className="flex">
          <li className="mr-8 font-bold">
            <Search />
          </li>
          <li className="mr-4 font-bold">
            <Link href="/">Home</Link>
          </li>
          <li className="mr-4 font-bold">
            <Link href="/browse">
              <a>Browse</a>
            </Link>
          </li>
          <li className="mr-4 font-bold">
            <Link href="/liked">Liked</Link>
          </li>
          <li className="mr-4 font-bold">
            <Link href="/purchased">Purchased</Link>
          </li>
          <li className="mr-4 font-bold">
            <Connect />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
