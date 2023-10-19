import Table from "@/components/global/element/Table";
import MyComponent from "@/components/global/element/tableFilter";
import TableFilter from "@/components/global/element/tableFilter";
import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import Heading from "@/components/pages/dashboard/heading";
import ProductsPageElement from "@/components/pages/dashboard/products/tabel";
import React from "react";

const Page = () => {
  return (
    <Dashboardlayout>
      <ProductsPageElement />
    </Dashboardlayout>
  );
};

export default Page;
