"use client";
import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginatedList = ({
  length=5,
  options = [5, 10, 20, 50],
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const [items, setItems] = useState(
    Array.from(Array(length).keys()).map((key) => key + 1)
  );
  const totalItems = length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const visibleItems = items.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const options = [5, 10, 20, 50];

  return (
    <nav
      className="flex flex-col md:flex-row text-black justify-between items-start md:items-center space-y-3 md:space-y-0 py-2"
      aria-label="Table navigation"
    >
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring focus:border-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:focus:border-indigo-600"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-sm flex gap-2 font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 ">
            {startIndex}-{endIndex}
          </span>
          of
          <span className="font-semibold text-gray-900 ">{totalItems}</span>
        </p>

        <div className="inline-flex items-stretch -space-x-px">
          <button
            className={`flex items-center justify-center cursor-pointer w-max h-10 py-2 px-3 ml-0 border rounded-2xl bg-gray-700 text-white hover:bg-gray-900 disabled:bg-gray-400 ${
              currentPage === 1 ? "pointer-events-none" : ""
            }`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <MdKeyboardArrowLeft /> Previous
          </button>

          <button
            className={`flex items-center justify-center w-max h-10  cursor-pointer py-2 px-3 border rounded-2xl bg-gray-700 text-white hover:bg-gray-900 disabled:bg-gray-400 ${
              currentPage === totalPages ? "pointer-events-none" : ""
            }`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            Next <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PaginatedList;
