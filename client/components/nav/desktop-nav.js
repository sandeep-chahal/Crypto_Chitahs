import React from "react";
import Link from "next/link";

import Search from "../search";
import Connect from "../connect-button";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    // wrapper
    <header className="xl:pt-10">
      {/* nav */}
      <div className="relative w-full xl:w-4/5 p-3 px-4 bg-slate-200 text-slate-700 m-auto xl:rounded-3xl flex items-center justify-between">
        {/* left */}
        <div className="flex items-center">
          <img
            src="https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/2894.png&w=64&h=64&output=webp"
            className="w-8 rounded-full mr-2 shadow-md shadow-[#F6F193]"
          />
          <h1 className="font-black">
            <Link href="/">
              <a>Crypto Chitahs</a>
            </Link>
          </h1>
        </div>
        {/* right */}
        <ul className="flex">
          <li className="mr-8 font-bold">
            <Search />
          </li>
          <li className="mr-4 font-bold">
            <Link href="/">
              <a
                className={`${
                  router.route === "/" && "underline underline-offset-1"
                }`}
              >
                Home
              </a>
            </Link>
          </li>
          <li className="mr-4 font-bold">
            <Link href="/browse">
              <a
                className={`${
                  router.route === "/browse" && "underline underline-offset-1"
                }`}
              >
                Browse
              </a>
            </Link>
          </li>
          <li className="mr-4 font-bold">
            <Link href="/liked">
              <a
                className={`${
                  router.route === "/liked" && "underline underline-offset-1"
                }`}
              >
                Liked
              </a>
            </Link>
          </li>
          <li className="mr-4 font-bold">
            <Link href="/purchased">
              <a
                className={`${
                  router.route === "/purchased" &&
                  "underline underline-offset-1"
                }`}
              >
                Purchased
              </a>
            </Link>
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
