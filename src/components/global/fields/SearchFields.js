"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const SearchField = ({searchText, setSearchText,clickEvent}) => {
 
  const resetSearch = (e) => {
    setSearchText("");
  };
  const handleChangeSearch = (e) => { 
      
   }

   const handleSearch = async (params) => {
    const response = await clickEvent()
   }

  return (
    <div className="flex flex-wrap items-center gap-4 w-full">
      <div className="rizzui-input-root flex flex-col">
        <label className="block ">
          <span className="rizzui-input-container pr-0 bg-white flex items-center overflow-hidden peer w-full transition duration-200 px-3.5 py-2 text-sm leading-[40px] rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-900 [&amp;.is-focus]:border-gray-900 [&amp;.is-focus]:ring-gray-900 h-9">
            <span className="rizzui-input-prefix whitespace-nowrap leading-normal">
              <FaSearch />
            </span>
            <input
              placeholder="Search by anything..."
              className="rizzui-input-field w-full  border-0 bg-transparent p-0 focus:outline-none focus:ring-0 [&amp;:placeholder-shown~.input-clear-btn]:opacity-0 [&amp;:placeholder-shown~.input-clear-btn]:invisible [&amp;:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&amp;:not(:placeholder-shown)~.input-clear-btn]:visible pl-2.5 rtl:pr-2.5"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch} className="font-semibold px-2 rounded-md bg-gray-600 text-white transition-all duration-300 ease-in-out dark-btn hover:bg-gray-900">Search</button>
          
          </span>
         
        </label>
      </div>
    </div>
  );
};

export default SearchField;
