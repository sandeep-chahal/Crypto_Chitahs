import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { getFilters } from "../../utils";

const FilterSelector = ({ closePopup, filters, setFilters }) => {
  const _filtersOptions = getFilters();
  const [newFilters, setNewFilters] = useState(filters);

  return (
    <Popup
      open={true}
      closeOnDocumentClick
      onClose={closePopup}
      className="bg-slate-100"
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal bg-slate-100 p-4 rounded-md">
        <h3 className="text-xl font-bold underline underline-offset-1 mb-3">
          Filters
        </h3>
        <ul>
          {Object.keys(_filtersOptions).map((filterKey) => (
            <li key={filterKey}>
              <label className="flex items-center mb-1">{filterKey}</label>
              <select
                value={newFilters[filterKey]}
                onChange={(e) =>
                  setNewFilters((f) => ({ ...f, [filterKey]: e.target.value }))
                }
              >
                <option>No Filter</option>
                {_filtersOptions[filterKey].map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-between mt-3">
          <button
            className="bg-slate-200 text-slate-800 py-1 px-3 rounded-md"
            onClick={() => {
              setFilters({});
              closePopup();
            }}
          >
            Reset
          </button>
          <button
            className="text-slate-200 bg-slate-800 py-1 px-3 rounded-md"
            onClick={() => {
              setFilters(newFilters);
              closePopup();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default FilterSelector;
