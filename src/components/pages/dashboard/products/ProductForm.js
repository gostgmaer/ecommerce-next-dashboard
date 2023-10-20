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
import { useParams } from "next/navigation";

const ProductForm = ({ data }) => {
  const params = useParams();
  const productID = params["productID"];

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
  });


   const initialValues = {
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
  };



  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("Draft");
  const [seo, setSeo] = useState({
    pageTitle: "SEO title",
    metaKeywords: "SEO Meta Keywords",
    metaDescription: "SEO Meta Description",
    productURL: "URL",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
    console.log(productFormData);
  };

  const handleChangeSeo = (e) => {
    const { name, value } = e.target;
    setSeo({ ...seo, [name]: value });
    console.log(seo);
  };


  const saveProduct = (status) => { 
   const body={...productFormData,tags:tags,seo_info:seo,status:status}
   console.log(body);

   }

  const draftForm = (e) => {
    e.preventDefault()
    saveProduct("draft")
    const state = {
      status:"draft"
    }
    }

  const SubmitForm = (e) => {
  e.preventDefault()
  saveProduct("pending")
  }

  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={productID ? "Edit Product" : "Add Product"}
        btn={"Product"} url={"/dashboard/products/create"}      />
      <TopStepper />
      <div>
        <form className="[&amp;_label.block>span]:font-medium" onSubmit={SubmitForm}>
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <Summery handleChange={handleChange} data={productFormData} />
            <ProductImage
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
            <Pricing handleChange={handleChange} data={productFormData} />
            <Invantory handleChange={handleChange} data={productFormData} />
            <Identifiers handleChange={handleChange} data={productFormData} />

            <SEOInfo handleChange={handleChangeSeo} data={seo} />
            <ProductVariyant />

            <ProductTags
              handleChange={handleChange}
              tags={tags}
              setTags={setTags}
            />
          </div>
          <div className="sticky bottom-0 left-0 right-0 py-4 p-6 bg-white  flex items-center justify-end gap-4 border-t ">
            <button
              className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 min-w-max @xl:w-auto"
              type="button"
              onClick={draftForm}
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
        {/* <FormElement productID={productID} productFormData={productFormData} setProductFormData={setProductFormData} productFormData={productFormData} setProductFormData={setProductFormData} /> */}
      </div>
    </div>
  );
};

export default ProductForm;
