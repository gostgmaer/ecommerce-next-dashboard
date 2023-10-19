import React from "react";

const TopStepper = () => {
  return (
    <div className="sticky top-[68px] z-20 border-b border-gray-300 bg-white py-0 font-medium text-gray-500 ">
      <div data-simplebar="init" className="">
        <div className="simplebar-wrapper">
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset">
              <div
                className="simplebar-content-wrapper"
                role="region"
                aria-label="scrollable content"
              >
                <div className="simplebar-content">
                  <div className="inline-grid justify-between grid-flow-col gap-5 text-sm md:gap-7 lg:gap-10">
                    <a className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000 active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000">
                      Summary
                    </a>
                    <a className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000">
                      Images &amp; Gallery
                    </a>
                    <a className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000">
                      Pricing &amp; Inventory
                    </a>
                    <a className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000">
                      Product Identifiers &amp; Custom Fields
                    </a>
                    
                    <a className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000">
                      SEO
                    </a>
                    <a className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000">
                      Variant Options
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="simplebar-placeholder"></div>
        </div>
        <div className="simplebar-track simplebar-horizontal">
          <div className="simplebar-scrollbar"></div>
        </div>
        <div className="simplebar-track simplebar-vertical">
          <div className="simplebar-scrollbar"></div>
        </div>
      </div>
    </div>
  );
};

export default TopStepper;
