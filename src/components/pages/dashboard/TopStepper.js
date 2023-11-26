import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams, } from "next/navigation";
import React from "react";

// const links = [
//   { text: "Summary", id: "summary" },
//   { text: "Images & Gallery", id: "images-gallery" },
//   { text: "Pricing & Inventory", id: "pricing-inventory" },
//   { text: "Product Identifiers & Custom Fields", id: "custom-fields" },
//   { text: "Inventory", id: "inventory" },
//   { text: "SEO", id: "seo" },
//   { text: "Variant Options", id: "variant-options" },
//   { text: "Tags", id: "product-tags" },
// ];

const TopStepper = ({ links }) => {



  // const pathname = usePathname()
  // const router = useRouter();
  // const params = useSearchParams().getAll("#")

  // Access the full pathname from the router object
  // const fullPathname = router;

  // console.log("Full Pathname:", fullPathname,params,pathname);
  // console.log(pathname);




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
                  <div className="inline-grid max-w-[-webkit-fill-available] overflow-x-auto justify-between grid-flow-col gap-5 text-sm md:gap-7 lg:gap-10">
                    {links.map((link) => (
                      <Link
                        href={`#${link.id}`}
                        key={link.id}
                        className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000 active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000"
                      >
                        {link.text}
                      </Link>
                    ))}
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
