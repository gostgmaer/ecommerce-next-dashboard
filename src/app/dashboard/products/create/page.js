import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import ProductForm from "@/components/pages/dashboard/products/ProductForm";
import { baseurl } from "@/config/setting";
import { serverMethod } from "@/helper/serverCall/datafetch";
import React from "react";




const Page = async () => {

<<<<<<< HEAD

  return (
    <Dashboardlayout>
      <ProductForm  />
=======
  const results = await getRequiredData()

  console.log(results);
  

  return (
    <Dashboardlayout>
      <ProductForm data={{ ...results }} initialValues={{
        title: '',
        sku: '',
        productType: '',
        categories: '',
        descriptions: '',
        status: '',
        images: [],
        price: 0,
        costPrice: 0,
        retailPrice: 0,
        salePrice: 0,
        trackInventory: 'yes',
        currentStockLevel: 0,
        lowStockLevel: 0,
        gtin: '',
        manufacturerPartNumber: '',
        brandName: '', 
        overview: '',
        slug: '',
        productUPCEAN: '',
        seo_info: {
          metaTitle: '',
          metaDescription: '',
        },
        tags: [],
        reviews: [], 
        features: [],
        specifications: {},
        isFeatured: false,
        isAvailable: true,
      }} />
>>>>>>> 3a7d988e8aa85ecaa4655aece356db23b07d16eb
    </Dashboardlayout>
  );
};

export default Page;

