"use client"
import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
// import { getServerSession } from "next-auth/next";
// import { authOptions, handler } from "@/app/api/auth/[...nextauth]/route";
// import Link from "next/link";
import NextUiProvider from "@/context/nextUiProvider";
import StoreProvider from "@/store/storeProvider";
import FetchRedux from "./fetchRedux";

const Dashboardlayout = async ({ children }) => {
   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };
  return (
    <NextUiProvider>
      <StoreProvider>
        <div className="flex min-h-screen flex-grow bg-white">
          <aside className="bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white 2xl:w-72 fixed dark:bg-gray-50 xl:block">
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} activeItem={activeItem} onItemClick={handleItemClick} />
          </aside>

          <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
            <Header />  

            <div className="p-4 text-black bg-gray-200">
              {children}
            </div>
          </div>
        </div>
      </StoreProvider>
    </NextUiProvider>
  );
};

export default Dashboardlayout;
