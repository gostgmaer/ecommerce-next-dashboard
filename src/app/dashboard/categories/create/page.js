import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import CategoryForm from "@/components/pages/dashboard/category/CategoryForm";
import { baseurl } from "@/config/setting";
import React from "react";

async function getCategories() {
  const res = await fetch(baseurl+`/categories`)
  const data = await res.json();
  return data
}


const Page = () => {
  const categories = getCategories()
 
  return (
    <Dashboardlayout>
      <CategoryForm  />
    </Dashboardlayout>
  );
};

export default Page;
