import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import BrandForm from "@/components/pages/dashboard/brands/Form";
import CategoryForm from "@/components/pages/dashboard/category/CategoryForm";
import React from "react";

const Page = () => {
  return (
    <Dashboardlayout>
      <BrandForm
        initialValues={{
          name: "",
          descriptions: "",
          slug: "",
          email: "",
          phone: "",
          website: "",
          tagline: "",
        }}
   
      />
    </Dashboardlayout>
  );
};

export default Page;
