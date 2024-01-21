import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import ProductForm from "@/components/pages/dashboard/products/ProductForm";
import { baseurl } from "@/config/setting";
import { serverMethod } from "@/helper/serverCall/datafetch";
import React from "react";




const Page = async () => {

  const results = await getRequiredData()


  return (
    <Dashboardlayout>
      <ProductForm data={{...results}} />
    </Dashboardlayout>
  );
};

export default Page;


export const getRequiredData = async (query)=>{

  const params = {
    method: "get",
    header: {},
    query: {...query },
  };
  const category =await serverMethod(
    `/products`,
    params
  );
  const brands = await serverMethod(
    `/categories`,
    params
  );

return {category,brands}

}