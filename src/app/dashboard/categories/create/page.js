import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import CategoryForm from "@/components/pages/dashboard/category/CategoryForm";
import { baseurl } from "@/config/setting";
import { serverMethod } from "@/helper/serverCall/datafetch";
import React from "react";

// async function getCategories() {
//   const res = await fetch(baseurl + `/categories`)
//   const data = await res.json();
//   return data
// }


const Page = async (props) => {
  const results = await getRecord()


  return (
    <Dashboardlayout>
      <CategoryForm data={{ ...results }} initialValues={
        {
          title: "",
          slug: "",
          parent: "",
          child: "",
          descriptions: "",
        }
      } />
    </Dashboardlayout>
  );
};

export default Page;

export const getRecord = async () => {

  const params = {
    method: "get",
    header: {},
    query: {}
  };

  const categories = await serverMethod(
    `/categories`,
    params
  );


  return { categories }

}