import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import CategoryForm from "@/components/pages/dashboard/category/CategoryForm";
import React from "react";

const Page = () => {
  return (
    <Dashboardlayout>
      <CategoryForm data={undefined} />
    </Dashboardlayout>
  );
};

export default Page;
