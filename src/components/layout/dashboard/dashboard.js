"use client"
import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
// import { getServerSession } from "next-auth/next";
// import { authOptions, handler } from "@/app/api/auth/[...nextauth]/route";
// import Link from "next/link";
import NextUiProvider from "@/context/nextUiProvider";
import StoreProvider from "@/store/storeProvider";


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
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} activeItem={activeItem} onItemClick={handleItemClick} />
          <div className={`flex w-full flex-col   ${isSidebarCollapsed ? 'w-[calc(100%-80px)]' : 'w-[calc(100%-256px)]'}`}>
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
