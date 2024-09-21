"use client";
import React, { useState } from "react";
import SearchField from "../fields/SearchFields";
import { FiFilter } from "react-icons/fi";
import { MdFilter, MdFilterList } from "react-icons/md";
import { orderStatus } from "@/assets/static/data";
import { Select } from "../fields/SelectField";

const TableFilter = ({
  options = ["", "publish", "pending", "draft"],
  searchKey,
  setSearchKey,
  status,
  setStatus,
  searchEvent,
}) => {
  const handleRadioChange = (e) => {
  
    setStatus(e.target.value);
    searchEvent(e.target.value);
  };
  
  return (
    <div className="">
      <div className="mt-4 bg-gray-200 rounded shadow-sm border-gray-200 border  rounded-b-none">
        <div className="w-full  p-4  flex">
          <div className="flex-1">
            <SearchField
              searchText={searchKey}
              clickEvent={searchEvent}
              setSearchText={setSearchKey}
            />
          </div>
          <div>
            <Select className="flex items-center justify-start gap-2" options={orderStatus} id={"order-status"} label={"Status"} additionalAttrs={{onChange:(e)=>handleRadioChange(e)}} placeholder={"Select"} optionkeys = { {key: "key", value: "label" }}>
              
            </Select>
          </div>
          <div className="ms-4 flex flex-shrink-0 items-center">
            <button
              className="rizzui-button inline-flex bg-white font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 me-2.5 h-9 pe-3 ps-2.5"
              type="button"
            >
              <FiFilter className="me-1.5 h-[15px] w-[15px]" />
              Filters
            </button>
            <div className="">
              <button
                className="rizzui-action-icon-root bg-white inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-1 w-9 h-9 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30"
                type="button"
                title="Toggle Columns"
              >
                <MdFilterList />
              </button>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default TableFilter;
