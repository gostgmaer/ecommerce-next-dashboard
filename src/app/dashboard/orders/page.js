import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import Datatable from "@/components/pages/dashboard/order/Table";
import { serverMethod } from "@/helper/serverCall/datafetch";
import { cookies } from 'next/headers'
import React from "react";

const Page = async (props) => {


  const orders = await getAllRecord(props.searchParams)
  console.log(orders);
  



  return (
    <Dashboardlayout>
      <Datatable orders={orders} />
    </Dashboardlayout>
  );
};

export default Page;



// export const getAllRecord = async (query) => {
//   console.log(query);
  

//   const params = {
//     method: "get",
//     header: {},
//     query: { ...query },
//   };
//   const result = await serverMethod(
//     `/orders`,
//     params
//   );


//   return result

// }

export const getAllRecord = async (query) => {

  const cookieStore  = await cookies()
  const tokendata = "Bearer " + cookieStore.get("headerPayload").value + "." + cookieStore.get("signature").value;


  const params = {
    method: "get",
    header: {
      Authorization: tokendata,
    },
    query: { ...query },
  };
  const result = await serverMethod(
    `/orders`,
    params
  );
  return result
}