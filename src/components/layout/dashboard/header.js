"use client";
import Image from "next/image";
import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  MdNotificationsNone,
  MdSettings,
  MdMessage,
  MdSearch,
} from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/authContext";

const navigation = [
  {
    name: "My Profile",
    href: "/dashboard/profile",
    current: true,
    iscurrent: true,
  },
  {
    name: "Account Settings",
    href: "/dashboard/settings",
    current: false,
    iscurrent: true,
  },
  {
    name: "Activity Logs",
    href: "/dashboard/logs",
    current: false,
    iscurrent: true,
  },
];

const Header = () => {
  const { user, userId, Logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl  md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full  items-center text-gray-700">
        <button
          className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 rounded-md hover:enabled:text-gray-1000 focus-visible:ring-gray-900/30 me-3 h-auto w-auto p-0 sm:me-4 xl:hidden"
          type="button"
        >
          <FaSearch />
        </button>
        <a className="me-4 w-9 shrink-0 lg:me-5 xl:hidden" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 26"
          >
            <rect
              width="10.16"
              height="19.93"
              fill="currentColor"
              rx="5.08"
              transform="rotate(29.49 -5.18 20.77) skewX(.85)"
            ></rect>
            <rect
              width="10.16"
              height="25.62"
              fill="currentColor"
              rx="5.08"
              transform="matrix(.87 .492 -.48 .878 27.17 0)"
            ></rect>
            <rect
              width="10.16"
              height="10.25"
              fill="currentColor"
              opacity=".5"
              rx="5.08"
              transform="rotate(29.49 -8.24 75.34) skewX(.85)"
            ></rect>
          </svg>
        </a>
        <button className="group inline-flex items-center focus:outline-none active:translate-y-px xl:h-10 xl:w-full xl:max-w-sm xl:rounded-xl xl:border xl:border-gray-200 xl:py-2 xl:pe-2 xl:ps-3.5 xl:shadow-sm xl:backdrop-blur-md xl:transition-colors xl:duration-200 xl:hover:border-gray-900 xl:hover:outline-double xl:hover:outline-[0.5px] xl:hover:outline-gray-900 xl:focus-visible:border-gray-900 xl:focus-visible:outline-double xl:focus-visible:outline-[0.5px] xl:focus-visible:outline-gray-900">
          <MdSearch className="magnifying-glass me-2 h-[18px] w-[18px]" />

          <span className="placeholder-text hidden text-sm text-gray-600 group-hover:text-gray-900 xl:inline-flex">
            Type what you are looking for...
          </span>
          <span className="search-command ms-auto hidden items-center text-sm text-gray-600 lg:flex lg:rounded-md lg:bg-gray-200/70 lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold xl:justify-normal">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="1.3"
              viewBox="0 0 256 256"
              className="h-[15px] w-[15px]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M180,144H160V112h20a36,36,0,1,0-36-36V96H112V76a36,36,0,1,0-36,36H96v32H76a36,36,0,1,0,36,36V160h32v20a36,36,0,1,0,36-36ZM160,76a20,20,0,1,1,20,20H160ZM56,76a20,20,0,0,1,40,0V96H76A20,20,0,0,1,56,76ZM96,180a20,20,0,1,1-20-20H96Zm16-68h32v32H112Zm68,88a20,20,0,0,1-20-20V160h20a20,20,0,0,1,0,40Z"></path>
            </svg>
            K
          </span>
        </button>
      </div>
      <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
        <button
          className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-1 rounded-md hover:enabled:text-gray-1000 focus-visible:ring-gray-900/30 relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
          type="button"
          aria-label="Messages"
        >
          <MdMessage />
          <span className="rizzui-badge inline-flex items-center justify-center font-semibold leading-none color w-2 h-2 bg-green text-white rounded-full ring-2 ring-gray-0 absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2">
            0
          </span>
        </button>
        <button
          className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-1 rounded-md hover:enabled:text-gray-1000 focus-visible:ring-gray-900/30 relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
          type="button"
          aria-label="Notification"
        >
          <MdNotificationsNone />
          <span className="rizzui-badge inline-flex items-center justify-center font-semibold leading-none color w-2 h-2 bg-orange text-white rounded-full ring-2 ring-gray-0 absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"></span>
        </button>
        <button
          className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-1 rounded-md hover:enabled:text-gray-1000 focus-visible:ring-gray-900/30 relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
          type="button"
          aria-label="Settings"
        >
          <MdSettings />
        </button>

        <Popover className="relative bg-white rounded-full">
          <Popover.Button className="hover:border-none active:border-none focus-visible:border-none focus-visible:outline-none">
            <img
              src={user?.profilePicture}
              alt={user?.username}
              title={user?.username}
              draggable="false"
              loading="lazy"
              width="40"
              height="40"
              className="rizzui-avatar-img w-10 h-10 inline-flex items-center justify-center flex-shrink-0 rounded-full bg-gray-900 text-gray-0 object-cover"
            />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 bg-white">
            <div className="w-64 text-left rtl:text-right rizzui-tooltip-root absolute -right-10 top-2  min-w-max text-sm rounded-xl bg-gray-0 !text-gray-900 border border-gray-300 drop-shadow-md z-50 p-0 dark:bg-gray-50 [&amp;>svg]:dark:fill-gray-50">
              <div className="flex items-center border-b border-gray-300 px-4 py-3 ">
                <img
                  src={user?.profilePicture}
                  alt={user?.username}
                  title="Albert Flores"
                  draggable="false"
                  loading="lazy"
                  width="40"
                  height="40"
                  className="rizzui-avatar-img  w-10 h-10 inline-flex items-center justify-center flex-shrink-0 rounded-full bg-gray-900 text-gray-0 object-cover"
                />
                <div className="ms-3">
                  <h6 className="rizzui-title-h6 font-semibold">
               {user && user.firstName +" "+user.lastName}
                  </h6>
                  <p className="text-gray-600">{user?.username}</p>
                </div>
              </div>
              <div className="grid p-2 font-medium text-gray-700">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-300 p-4">
                <button
                  className="rizzui-button inline-flex items-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-opacity-50 transition-colors duration-200 text-sm rounded-md hover:enabled:text-gray-1000 focus-visible:ring-gray-900/30 h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
                  type="button"
                  onClick={Logout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
