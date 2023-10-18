import React from "react";
import Header from "./header";
import Footer from "./footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-gray-50 text-black">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
