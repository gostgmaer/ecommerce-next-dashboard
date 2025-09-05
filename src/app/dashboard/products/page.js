// import Table from "@/components/global/element/Table";
// import MyComponent from "@/components/global/element/tableFilter";
// import TableFilter from "@/components/global/element/tableFilter";
import Dashboardlayout from "@/components/layout/dashboard/dashboard";
// import Heading from "@/components/pages/dashboard/heading";
import ProductsPageElement from "@/components/pages/dashboard/products/tabel";
// import { parseUrlWithQueryParams } from "@/helper/function";
import { serverMethod } from "@/helper/serverCall/datafetch";
import ProductServices from "@/helper/services/ProductServices";
import { cookies } from "next/headers";
import React from "react";

const Page = async (props) => {

  const result = await getAllRecord(props.searchParams)

  return (
    <Dashboardlayout>
      <ProductsPageElement />
    </Dashboardlayout>
  );
};

export default Page;


export const getAllRecord = async (props) => {

  console.log(props);
  

  // const cookieStore  = await cookies()
  // const tokendata =cookieStore.get("headerPayload").value + "." + cookieStore.get("signature").value;
  // const result = await ProductServices.getAllProducts(query,{}, tokendata);
  // return result
}