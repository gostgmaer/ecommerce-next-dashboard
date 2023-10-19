"use client";
import React, { useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import {
  Identifiers,
  Invantory,
  Pricing,
  ProductImage,
  ProductTags,
  ProductVariyant,
  SEOInfo,
  Summery,
} from "./ProductElement";
import { useParams, usePathname } from "next/navigation";

const EditProduct = ({ data }) => {
  const [productFormData, setProductFormData] = useState({
    title: "Product title",
    sku: "HG98723867836",
    productType: "physical",
    categories: "Fruits",
    descriptions: "Descriptions",
    images: [],
    price: "0.00",
    costPrice: "0.00",
    retailPrice: "0.00",
    salePrice: "0.00",
    trackInventory: "yes",
    currentStockLevel: "0",
    lowStockLevel: "0",
    gtin: "678ASD",
    manufacturerPartNumber: "1459894",
    brandName: "Brand",
    productUPCEAN: "14572454",
    tag: [],
  });
  const [seo, setSeo] = useState({
    pageTitle: "SEO title",
    metaKeywords: "SEO Meta Keywords",
    metaDescription: "SEO Meta Description",
    productURL: "URL",
  });

  const params = useParams();
  const productID = params["productID"];

  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={productID ? "Edit Product" : "Add Product"}
        btn={"Product"}
      />
      <TopStepper />
      <div>
        <EditProductForm productID={productID} />
      </div>
    </div>
  );
};

export default EditProduct;

const EditProductForm = ({ productID }) => {
  return (
    <form className="[&amp;_label.block>span]:font-medium">
      <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <Summery />
        <ProductImage />
        <Pricing />
        <Invantory />
        <Identifiers />

        <SEOInfo />
        <ProductVariyant />

        <ProductTags />
      </div>
      <div className="sticky bottom-0 left-0 right-0 py-4 p-6 bg-white  flex items-center justify-end gap-4 border-t ">
        <button
          className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 min-w-max @xl:w-auto"
          type="submit"
        >
          Save as Draft
        </button>
        {productID ? (
          <button
            className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
            type="submit"
          >
            Update Product
          </button>
        ) : (
          <button
            className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
            type="submit"
          >
            Create Product
          </button>
        )}
      </div>
    </form>
  );
};
