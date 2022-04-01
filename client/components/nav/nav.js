import React from "react";
import Link from "next/link";

import Search from "../search";

const Nav = () => {
  return (
    // wrapper
    <header className="pt-10">
      {/* nav */}
      <div className="relative w-4/5 p-3 px-4 bg-slate-100 text-slate-700 m-auto rounded-3xl flex items-center justify-between">
        {/* left */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            className="w-8 rounded-full mr-2 shadow-md shadow-[#0FB979]"
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
            <button className="text-[#0FB979] underline font-black">
              Connect
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
