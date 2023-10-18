"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { MdAdd, MdDownload } from "react-icons/md";

const Heading = ({ data }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="mmb-6 flex justify-between xs:-mt-2 lg:mb-7">
      <div>
        <h2 className=" mb-2  font-semibold  text-4xl lg:text-2xl ">
          Products
        </h2>
        <div className="inline-flex items-center gap-2.5 flex-wrap">
          {segments.map((segment, index) => (
            <div key={index} className=" flex gap-2.5 items-center capitalize">
              {index < segments.length - 1 ? (
                <Fragment>
                  <Link
                    href={`/${segments.slice(0, index + 1).join("/")}`}
                    className=""
                  >
                    {segment}
                  </Link>
                  <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                </Fragment>
              ) : (
                segment
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <button
          className="rizzui-button inline-flex font-medium w-max  items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30  @lg:w-auto"
          type="button"
        >
          <MdDownload className="me-1.5 h-[17px] w-[17px]" />
          Export
        </button>
        <a className="w-full @lg:w-auto" href="/dashboard/products/create">
          <span className="rizzui-button inline-flex w-max font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 @lg:w-auto  text-white ">
            <MdAdd className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </span>
        </a>
      </div>
    </div>
  );
};

export default Heading;
