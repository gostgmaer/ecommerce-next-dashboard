import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import ProductForm from "@/components/pages/dashboard/products/ProductForm";
import { baseurl } from "@/config/setting";
import React from "react";

async function getCategories() {
  const res = await fetch(baseurl+`/categories`)
  const data = await res.json();
  return data
}

async function getBrands() {
  const res = await fetch(baseurl+`/brands`)
  const data = await res.json();
  return data
}

const Page = async () => {

  const category = await getCategories()
  const brands = await getBrands()

  return (
    <Dashboardlayout>
      <ProductForm data={{category,brands}} />
    </Dashboardlayout>
  );
};

export default Page;
