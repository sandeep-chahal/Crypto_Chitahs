import React, { useState } from "react";
import Link from "next/link";

import Search from "../search";
import Connect from "../connect-button";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    // wrapper
    <header className="relative">
      {/* nav */}
      <div className="relative w-full p-3 px-4 bg-slate-200 text-slate-700 flex items-center justify-between">
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
        {/* right - menu  */}
        <div className="">
          {/* hamburger menu */}
          <div onClick={() => setIsMenuOpen(true)} className="cursor-pointer">
            <div className="w-6 h-1 bg-slate-900" />
            <div className="w-4 h-1 bg-slate-900 mt-1 ml-auto" />
          </div>
          {/* background opacity */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className={`fixed h-full w-full top-0 right-0 z-40 bg-slate-600 bg-opacity-50 ${
              isMenuOpen ? "fixed" : "hidden"
            }`}
          />
          {/* actual menu */}
          <div
            className={`fixed top-0 right-0 px-8 bg-slate-200 h-full z-[100] transition-transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* close button */}
            <div className="flex items-center mt-2 mb-2">
              <h3 className="font-semibold">Menu</h3>
              <img
                src="/close.svg"
                width={30}
                height={30}
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer ml-auto"
              />
            </div>
            {/* links */}
            <ul className="flex flex-col py-2">
              <li className="mb-5 font-bold">
                <Search onOpen={() => setIsMenuOpen(false)} />
              </li>
              <li className="mb-5 font-bold">
                <Link href="/">
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      router.route === "/" && "underline underline-offset-1"
                    }`}
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className="mb-5 font-bold">
                <Link href="/browse">
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      router.route === "/browse" &&
                      "underline underline-offset-1"
                    }`}
                  >
                    Browse
                  </a>
                </Link>
              </li>
              <li className="mb-5 font-bold">
                <Link href="/liked">
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      router.route === "/liked" &&
                      "underline underline-offset-1"
                    }`}
                  >
                    Liked
                  </a>
                </Link>
              </li>
              <li className="mb-5 font-bold">
                <Link href="/purchased">
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      router.route === "/purchased" &&
                      "underline underline-offset-1"
                    }`}
                  >
                    Purchased
                  </a>
                </Link>
              </li>
              <li className="mb-5 font-bold">
                <Connect />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
