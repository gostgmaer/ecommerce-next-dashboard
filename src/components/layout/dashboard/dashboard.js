import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const Dashboardlayout = ({ children }) => {

  return (
    <div className="flex min-h-screen flex-grow bg-white">
      <aside className="bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white 2xl:w-72 fixed dark:bg-gray-50 xl:block">
        <Sidebar />
      </aside>

      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <Header />

        <div className=" md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10 text-black">
          {children}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboardlayout;
