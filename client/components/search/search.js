import React from "react";

const Search = ({ onSearch }) => {
  return (
    <div className="flex justify-end items-center">
      <input
        className="rounded-md px-2 outline-slate-200 pr-7 hover:shadow-lg shadow-slate-900"
        placeholder="Search"
      />
      <img src="/search.svg" className="w-4 absolute mr-2" onClick={onSearch} />
    </div>
  );
};

export default Search;
