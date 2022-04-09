import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Card from "../components/card";
import FilterSelector from "../components/filter-selector";
import Attribute from "../components/attribute";
import { useStore } from "../store";
import { BigNumber, ethers } from "ethers";
const CARDS_PER_PAGE = 100;

const Browse = () => {
  const router = useRouter();
  const { db, web3, prices, setPrices } = useStore();
  const [page, setPage] = useState(1);
  const [filterPopup, setFilterPopup] = useState(false);
  const [filters, setFilters] = useState(router.query || {});
  const [filteredItems, setFilteredItems] = useState([]);
  const priceFetchTimer = useRef(null);
  const input = useRef();

  const isFilterApplied = Object.keys(filters).length !== 0;

  const fetchPrices = async () => {
    const nftNumbers = Array(CARDS_PER_PAGE)
      .fill(null)
      .map((_, i) => i + 1 + (page - 1) * CARDS_PER_PAGE)
      .filter((n) => n <= 3974);
    const _prices = await web3.marketPlaceContract.getPrices(nftNumbers);
    const newPrices = {};
    nftNumbers.forEach((nftNumber, index) => {
      newPrices[nftNumber] = _prices[index];
    });
    setPrices((p) => ({ ...p, ...newPrices }));
    console.log("BROWSE: Newly fetched Prices", newPrices);
  };

  useEffect(() => {
    if (prices[page * CARDS_PER_PAGE] !== undefined) {
      console.log("BROWSE: Prices already fetched");
    } else if (web3 && web3.status === "READY" && !isFilterApplied) {
      clearTimeout(priceFetchTimer.current);
      priceFetchTimer.current = setTimeout(fetchPrices, 1000);
    }
  }, [page, web3, isFilterApplied]);

  useEffect(() => {
    if (db === null || !isFilterApplied) return null;
    (async () => {
      const _filters = Object.keys(filters).map((key) => ({
        key,
        value: filters[key],
      }));
      const filteredItems = await db.items.query(_filters);
      setFilteredItems(filteredItems);
    })();
  }, [filters, db]);

  const handlePageChange = (newPage, e) => {
    if (isFilterApplied) {
      return;
    }
    if (newPage < 1) {
      setPage(1);
      input.current.value = 1;
    } else if (newPage > 40) {
      setPage(40);
      input.current.value = 40;
    } else {
      setPage(newPage);
      console.log(input.current.value);
      input.current.value = newPage;
    }
  };
  return (
    <section className="px-40 my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl">Browse the collection</h1>
          <p>Take a good look!</p>
        </div>
        <div className="flex items-center">
          <img
            src="arrow.svg"
            width={25}
            className="-rotate-90 cursor-pointer"
            onClick={() => handlePageChange(page - 1)}
          />
          <input
            disabled={isFilterApplied}
            ref={input}
            defaultValue={1}
            className="text-slate-800 placeholder-slate-500 border-2 rounded-md px-2 w-14 text-center mx-2"
            type="number"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handlePageChange(parseInt(e.target.value), e);
              }
            }}
          />
          <img
            src="arrow.svg"
            width={25}
            className="rotate-90 cursor-pointer"
            onClick={() => handlePageChange(page + 1)}
          />
        </div>
      </div>
      {/* filters */}
      <div className="">
        <div className="h-[1px] w-full bg-slate-200 mt-2" />
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold">Filters</h3>
          <img
            onClick={() => setFilterPopup(!filterPopup)}
            src="filter.svg"
            width={20}
            height={20}
            className="ml-4 cursor-pointer transition-transform hover:rotate-90 active:translate-y-1"
          />
          <p className="ml-2">
            {isFilterApplied ? filteredItems.length + " NFTs Found" : ""}
          </p>
        </div>
        {filterPopup && (
          <FilterSelector
            filters={filters}
            setFilters={(filters) => setFilters(filters)}
            closePopup={() => setFilterPopup(false)}
          />
        )}
        <ul className="flex flex-wrap items-start">
          {Object.keys(filters).length ? (
            Object.keys(filters).map((filterKey) => (
              <Attribute
                title="click to remove"
                className=""
                onClick={() =>
                  setFilters((f) => {
                    const newFilters = { ...f };
                    delete newFilters[filterKey];
                    return newFilters;
                  })
                }
                key={filterKey}
                name={filterKey}
                value={filters[filterKey]}
              />
            ))
          ) : (
            <li>
              <p>No Filters Selected</p>
            </li>
          )}
        </ul>
      </div>
      <ul className="flex flex-wrap justify-between">
        {isFilterApplied ? (
          filteredItems.length ? (
            filteredItems.map((item) => (
              <Card key={item.key} nftNumber={item.key} />
            ))
          ) : (
            <p>No NFTs Found</p>
          )
        ) : (
          Array(CARDS_PER_PAGE)
            .fill(null)
            .map((_, i) => i + 1 + (page - 1) * CARDS_PER_PAGE)
            .filter((n) => n <= 3974)
            .map((n) => <Card key={n} nftNumber={n} price={prices[n]} />)
        )}
      </ul>
    </section>
  );
};
export default Browse;
