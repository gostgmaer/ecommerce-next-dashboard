import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import ProductForm from "@/components/pages/dashboard/products/ProductForm";
import { baseurl } from "@/config/setting";
import { serverMethod } from "@/helper/serverCall/datafetch";
import React from "react";




const Page = async () => {

  const results = await getRequiredData()


  return (
    <Dashboardlayout>
      <ProductForm data={{ ...results }} initialValues={{
        title: '',
        sku: '',
        productType: '',
        categories: '', // Assuming categories is an array of ObjectId
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
        brandName: '', // Assuming brandName is an ObjectId
        overview: '',
        slug: '',
        productUPCEAN: '',
        seo_info: {
          metaTitle: '',
          metaDescription: '',
        },
        tags: [],
        reviews: [], // Assuming reviews is an array of ObjectId
        features: [],
        specifications: {},
        isFeatured: false,
        isAvailable: true,
      }} />
    </Dashboardlayout>
  );
};

export default Page;


export const getRequiredData = async (query) => {

  const params = {
    method: "get",
    header: {},
    query: { ...query },
  };
  const brands = await serverMethod(
    `/brands`,
    params
  );
  const category = await serverMethod(
    `/categories`,
    params
  );

  return { category, brands }

}