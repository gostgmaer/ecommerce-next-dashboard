"use client";
import React, { useEffect, useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { getsingle, patch, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";
import { notifySuccess } from "@/lib/notify/notice";

const ProductForm = ({ data }) => {
  const params = useParams();
  const router = useRouter()
  const productID = params["productID"];
  const [currData, setCurrData] = useState({});
  const [productFormData, setProductFormData] = useState({
    title: "",
    sku: "",
    productType: "",
    categories: "",
    descriptions: "",
    images: [],
    price: "0",
    costPrice: "0",
    retailPrice: "0",
    salePrice: "0",
    trackInventory: "",
    currentStockLevel: "0",
    lowStockLevel: "0",
    gtin: "",
    manufacturerPartNumber: "",
    brandName: "",
    productUPCEAN: "",
  });
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("Draft");
  const [seo, setSeo] = useState({
    pageTitle: "",
    metaKeywords: "",
    metaDescription: "",
    productURL: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [slug, setSlug] = useState("");
  const [axios, spinner] = useAxios();

  const getCurrentProduct = async () => {
    const res = await getsingle("/products", productID);
    setProductFormData({
      title: res?.["results"]?.["title"],
      sku: res?.["results"]?.["sku"],
      productType: res?.["results"]?.["productType"],
      categories: res?.["results"]?.["categories"][0],
      descriptions: res?.["results"]?.["descriptions"],
      images: [],
      price: res?.["results"]?.["price"],
      costPrice: res?.["results"]?.["costPrice"],
      retailPrice: res?.["results"]?.["retailPrice"],
      salePrice: res?.["results"]?.["salePrice"],
      trackInventory: res?.["results"]?.["trackInventory"],
      currentStockLevel: res?.["results"]?.["currentStockLevel"],
      lowStockLevel: res?.["results"]?.["lowStockLevel"],
      gtin: res?.["results"]?.["gtin"],
      manufacturerPartNumber: res?.["results"]?.["manufacturerPartNumber"],
      brandName: res?.["results"]?.["brandName"],
      productUPCEAN: res?.["results"]?.["productUPCEAN"],
    });
    setTags(res?.["results"]?.["tags"]);
    setSeo({
      pageTitle: res?.["results"]?.["seo_info"]?.["pageTitle"],
      metaKeywords: res?.["results"]?.["seo_info"]?.["metaKeywords"],
      metaDescription: res?.["results"]?.["seo_info"]?.["metaDescription"],
      productURL: res?.["results"]?.["seo_info"]?.["productURL"],
    });
    setSelectedFiles(res?.["results"]?.["images"]);
    setSlug(res?.["results"]?.["slug"]);
    setCurrData(res);
  };

  useEffect(() => {
    if (productID) {
      getCurrentProduct();
    }
  }, [productID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
    if (name === "title") {
      setSlug(value);
    }
  };


  const handleChangeSeo = (e) => {
    const { name, value } = e.target;
    setSeo({ ...seo, [name]: value });
    console.log(seo);
  };

  const haldleChangeSlug = (e) => {
    setSlug(e.target.value);
  };

  const saveProduct = async (status) => {
    const body = generateProductBody();
    const res = await post("/products", { ...body, status: status });
    if (res.statusCode === 201) {
      setProductFormData({
        title: "",
        sku: "",
        productType: "",
        categories: "",
        descriptions: "",
        images: [],
        price: "0",
        costPrice: "0",
        retailPrice: "0",
        salePrice: "0",
        trackInventory: "",
        currentStockLevel: "0",
        lowStockLevel: "0",
        gtin: "",
        manufacturerPartNumber: "",
        brandName: "",
        productUPCEAN: "",
      });
      setSeo({
        pageTitle: "",
        metaKeywords: "",
        metaDescription: "",
        productURL: "",
      });
      setSelectedFiles([]);
      setSlug("");
      setTags([]);
      notifySuccess(res.message,3000)
    }
 
  };

  const UpdateProduct = async (status) => {
    const body =  generateProductBody();
  
    const res = await patch(
      "/products",
      { ...body, status: status },
      productID
    );
    if (res.statusCode === 200) {
      setProductFormData({
        title: "",
        sku: "",
        productType: "",
        categories: "",
        descriptions: "",
        images: [],
        price: "0",
        costPrice: "0",
        retailPrice: "0",
        salePrice: "0",
        trackInventory: "",
        currentStockLevel: "0",
        lowStockLevel: "0",
        gtin: "",
        manufacturerPartNumber: "",
        brandName: "",
        productUPCEAN: "",
      });
      setSeo({
        pageTitle: "",
        metaKeywords: "",
        metaDescription: "",
        productURL: "",
      });
      setSelectedFiles([]);
      setSlug("");
      setTags([]);
      notifySuccess(res.message,3000)
      router.push('/dashboard/products')
    }

  };

  const generateProductBody =  () => {
    console.log(productFormData);
    const body = {
      ...productFormData,
      tags: tags,
      seo_info: seo,
      images: selectedFiles,
      slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
    };

    return body;
  };

  const draftForm = (e) => {
    e.preventDefault();
    saveProduct("draft");
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    if (productID) {
      UpdateProduct(currData["results"]["status"]);
    } else {
      saveProduct("pending");
    }
  };

  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={productID ? "Edit Product" : "Add Product"}
        btn={"Product"}
        url={"/dashboard/products/create"}
      />
      <TopStepper />
      <div>
        <form
          className="[&amp;_label.block>span]:font-medium"
          onSubmit={SubmitForm}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <Summery
              handleChange={handleChange}
              data={productFormData}
              category={data}
              slug={slug}
              handleSlug={haldleChangeSlug}
            />
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
      {spinner}
    </div>
  );
};

export default ProductForm;
