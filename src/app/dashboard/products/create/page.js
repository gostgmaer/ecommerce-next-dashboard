import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import ProductForm from "@/components/pages/dashboard/products/ProductForm";
import { baseurl } from "@/config/setting";
import { serverMethod } from "@/helper/serverCall/datafetch";
import React from "react";




const Page = async () => {


  return (
    <Dashboardlayout>
      <ProductForm  />
    </Dashboardlayout>
  );
};

export default Page;

