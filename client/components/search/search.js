import React, { useState, useEffect } from "react";
import Link from "next/link";

const Search = ({ onOpen }) => {
  const [search, setSearch] = useState();

  return (
    <div className="flex justify-end items-center relative">
      <input
        className="rounded-md px-2 outline-slate-200 pr-7 hover:shadow-lg shadow-slate-900"
        placeholder="Search"
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if ((value > 0 && value <= 3974) || isNaN(value)) setSearch(value);
        }}
        value={search || ""}
      />
      <img src="/search.svg" className="w-4 absolute mr-2" />
      {!!search && (
        <div className="absolute top-full left-0 bg-white w-full py-1 px-3 z-50 rounded-md font-semibold">
          <ul>
            {Array(5)
              .fill(0)
              .filter((_, i) => i + search <= 3974)
              .map((_, index) => (
                <li className="flex items-center my-3">
                  <Link href={`/${search + index}`}>
                    <a
                      onClick={() => {
                        setSearch();
                        if (onOpen) onOpen();
                      }}
                    >
                      Crypto Chitahs #{search + index}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
