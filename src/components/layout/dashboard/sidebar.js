import Link from "next/link";
import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { MdKeyboardArrowRight, MdShoppingCart } from "react-icons/md";
import OpenHover from "./openData";
const invoiceData = [
  {
    text: "List",
    href: "/invoice",
  },
  {
    text: "Details",
    href: "/invoice/FC6723757651DB74",
  },
  {
    text: "Create",
    href: "/invoice/create",
  },
  {
    text: "Edit",
    href: "/invoice/FC6723757651DB74/edit",
  },
];

const linkData = [
  {
    text: "Products",
    href: "/dashboard/products",
    child: [

      {
        text: "Create Product",
        href: "/dashboard/products/create",
      },

    ],
  },
  {
    text: "Brands",
    href: "/dashboard/brands",
    child: [

      {
        text: "Create Product",
        href: "/dashboard/brands/create",
      },

    ],
  },

  {
    text: "Categories",
    href: "/dashboard/categories",
    child: [
      {
        text: "Create Category",
        href: "/dashboard/categories/create",
      },

    ],
  },
  {
    text: "Users",
    href: "/dashboard/users",
    child: [

      {
        text: "Create Users",
        href: "/dashboard/users/create",
      },

    ],
  },
  {
    text: "Orders",
    href: "/dashboard/orders",
  },
  {
    text: "Logs",
    href: "/dashboard/logs",
  },
  {
    text: "Reviews",
    href: "/dashboard/reviews",
  },


];

const Sidebar = () => {
  return (
    <div className="transition-all duration-200">
      <div className=" top-0 z-40 bg-gray-0/10 px-6 pb-5 bg-white  text-black pt-5 2xl:px-8 2xl:pt-6 text-center">
        <Link href="/dashboard" className="text-2xl font-semibold">
          Kishor Sarkar
        </Link>
      </div>

      <div className="h-[calc(100vh-72px)] overflow-auto">
        <div className="simplebar-wrapper">
          <div className="mt-4 pb-3 3xl:mt-6">
            <h6 className="rizzui-title-h6 mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8 mt-6 3xl:mt-7">
              Apps Kit
            </h6>
            <OpenHover
              icon={<MdShoppingCart />}
              heading={"E-commerce"}
              data={linkData}
              url={"/dashboard"}
              state={true}
            ></OpenHover>
            <OpenHover
              icon={<FaDollarSign />}
              heading={"Invoice"}
              data={invoiceData}
              url={"/invoice"}
              state={false}
            ></OpenHover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
