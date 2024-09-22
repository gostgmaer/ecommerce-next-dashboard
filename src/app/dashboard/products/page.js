// import Table from "@/components/global/element/Table";
// import MyComponent from "@/components/global/element/tableFilter";
// import TableFilter from "@/components/global/element/tableFilter";
import Dashboardlayout from "@/components/layout/dashboard/dashboard";
// import Heading from "@/components/pages/dashboard/heading";
import ProductsPageElement from "@/components/pages/dashboard/products/tabel";
// import { parseUrlWithQueryParams } from "@/helper/function";
import { serverMethod } from "@/helper/serverCall/datafetch";
import React from "react";

const Page = async (props) => {

  // const result = await getAllRecord(props.searchParams)

  return (
    <Dashboardlayout>
      <ProductsPageElement  />
    </Dashboardlayout>
  );
};

export default Page;



// export const getAllRecord = async (query)=>{

//   const params = {
//     method: "get",
//     header: {},
//     query: {...query },
//   };
//   const result = await serverMethod(
//     `/movie/latest`,
//     params
//   );


// return result

// }