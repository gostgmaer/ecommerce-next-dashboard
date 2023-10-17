"use client";
import Link from "next/link";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

const OpenHover = ({ icon, heading, data, url }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      role="collapse"
      aria-expanded="false"
      data-testid="collapse-parent"
      className="rizzui-collapse-root transition-all duration-200"
    >
      <div className="group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700">
        <span className="flex items-center" onClick={() => setOpen(!open)}>
          <span
            className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&amp;>svg]:h-[19px] [&amp;>svg]:w-[19px] text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {icon}
          </span>
          {heading}
        </span>

        <MdKeyboardArrowRight
          onClick={() => setOpen(!open)}
          className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 rotate-0 rtl:rotate-0 ${
            !open && "hidden"
          }`}
        />

        <MdKeyboardArrowDown
          onClick={() => setOpen(!open)}
          className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 rotate-0 rtl:rotate-0 ${
            open && "hidden"
          }`}
        />
      </div>
      <div
        className={`rizzui-collapse-panel transition-all duration-200  ${
          open ? "block }" : "hidden"
        } `}
      >
        {data.map((link, index) => (
          <Link
            key={index}
            className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
            href={link.href}
          >
            <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OpenHover;
