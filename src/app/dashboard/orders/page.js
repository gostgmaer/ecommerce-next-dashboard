import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import Datatable from "@/components/pages/dashboard/order/Table";
import { serverMethod } from "@/helper/serverCall/datafetch";

import React from "react";

const Page = async (props) => {


  const orders = await getAllRecord(props.searchParams)



  return (
    <Dashboardlayout>
      <Datatable />
    </Dashboardlayout>
  );
};

export default Page;



export const getAllRecord = async (query) => {

  const params = {
    method: "get",
    header: {},
    query: { ...query },
  };
  const result = await serverMethod(
    `/orders`,
    params
  );


  return result

}