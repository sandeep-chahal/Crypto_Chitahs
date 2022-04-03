import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";

const CARDS_PER_PAGE = 100;

const Browse = () => {
  const [cursor, setCursor] = useState(1);
  const input = useRef();

  const handlePageChange = (newPage, e) => {
    if (newPage < 1) {
      setCursor(1);
      input.current.value = 1;
    } else if (newPage > 40) {
      setCursor(40);
      input.current.value = 40;
    } else {
      setCursor(newPage);
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
            onClick={() => handlePageChange(cursor - 1)}
          />
          <input
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
            onClick={() => handlePageChange(cursor + 1)}
          />
        </div>
      </div>
      <ul className="flex flex-wrap justify-between">
        {Array(CARDS_PER_PAGE)
          .fill(null)
          .map((_, i) => i + 1 + (cursor - 1) * CARDS_PER_PAGE)
          .filter((n) => n <= 3974)
          .map((n) => (
            <Card key={n} nftNumber={n} />
          ))}
      </ul>
    </section>
  );
};
export default Browse;
