"use client";
import React, { useState } from "react";
import SearchField from "../fields/SearchFields";
import { FiFilter } from "react-icons/fi";
import { MdFilter, MdFilterList } from "react-icons/md";

const TableFilter = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["", "publish", "pending", "draft"];

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
   
  };
  return (
    <div className="">
      <div className="mt-4 bg-gray-200 rounded shadow-sm border-gray-200 border  rounded-b-none">
        <div className="w-full  p-4  flex">
          <div className="flex-1">
            <SearchField />
          </div>
          <div className="ms-4 flex flex-shrink-0 items-center">
            <button
              className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 me-2.5 h-9 pe-3 ps-2.5"
              type="button"
            >
              <FiFilter className="me-1.5 h-[15px] w-[15px]" />
              Filters
            </button>
            <div className="">
              <button
                className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-1 w-9 h-9 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30"
                type="button"
                title="Toggle Columns"
              >
                <MdFilterList />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full p-2 px-4 gap-2 border-t border-gray-300  flex">
          <div>Show Only: </div>
          <div className=" flex flex-wrap">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2 mr-4">
                <input
                  type="radio"
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleRadioChange}
                  className="form-radio text-gray-600 border-gray-600 capitalize"
                />
                <span className="text-gray-700 capitalize font-medium ml-2">
                  {option != "" ? option : "all"}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
