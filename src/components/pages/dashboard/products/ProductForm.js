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
import { productSchema } from "@/utils/validation/validation";
import { useFormik } from "formik";
import TextField from "@/components/global/fields/TextField";
import SelectField from "@/components/global/fields/SelectField";
import { generateSlug } from "@/helper/function";

const initialsValue = {
  title: "",
  slug: "",
  sku: "",
  productType: "",
  categories: "",
  descriptions: "",
  images: [],
  price: "0",
  costPrice: "0",
  retailPrice: "0",
  salePrice: "0",
  trackInventory: false,
  currentStockLevel: "0",
  lowStockLevel: "0",
  gtin: "",
  manufacturerPartNumber: "",
  brandName: "",
  productUPCEAN: "",
  pageTitle: "",
  metaDescription: "",
  metaKeywords: "",
  overview: "",
};

const ProductForm = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const productID = params["productID"];
  const [currData, setCurrData] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [axios, spinner] = useAxios();

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialsValue,
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        setSelectedFiles([]);
        setTags([]);
        resetForm();
      }, 1000);

      switch (values.clickedButton) {
        case "saveDraft":
          saveProduct("draft");
          break;
        case "update":
          UpdateProduct(currData["results"]["status"]);
          // Call the appropriate API for Update
          break;
        case "create":
          saveProduct("pending");
          // saveCategory("pending");
          break;
        default:
          break;
      }
    },
  });

  const getCurrentProduct = async () => {
    const res = await getsingle("/products", productID);
    if (res.results) {
      setValues({
        ...res.results,
        pageTitle: res?.["results"]?.["seo_info"]?.["pageTitle"],
        metaKeywords: res?.["results"]?.["seo_info"]?.["metaKeywords"],
        metaDescription: res?.["results"]?.["seo_info"]?.["metaDescription"],
        categories: res?.["results"]?.["categories"][0]["_id"],
      });
    }
    setTags(res?.["results"]?.["tags"]);
    setSelectedFiles(res?.["results"]?.["images"]);
    setCurrData(res);
  };

  useEffect(() => {
    if (productID) {
      getCurrentProduct();
    }
  }, [productID]);

  const saveProduct = async (status) => {
    const body = generateProductBody();
    const res = await post("/products", { ...body, status: status });
    if (res.statusCode === 201) {
      notifySuccess(res.message, 3000);
    }
  };

  const UpdateProduct = async (status) => {
    const body = generateProductBody();

    const res = await patch(
      "/products",
      { ...body, status: status },
      productID
    );
    if (res.statusCode === 200) {
      notifySuccess(res.message, 3000);
    }
  };

  const generateProductBody = () => {
    const body = {
      ...values,
      tags: tags,
      seo_info: {
        pageTitle: values.pageTitle,
        metaKeywords: values.metaKeywords,
        metaDescription: values.metaDescription,
      },
      images: selectedFiles,
    };

    return body;
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFieldValue("title", newName);
    setFieldValue("slug", generateSlug(newName));
    setFieldValue("pageTitle", newName);
  };
  const handleOverviewChange = (e) => {
    const newName = e.target.value;
    setFieldValue("overview", newName);
    setFieldValue("metaDescription", newName);
  };

  const handleClick = (button) => {
    setFieldValue("clickedButton", button);
    handleSubmit();
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
      <TopStepper
        links={[
          { text: "Summary", id: "summary" },
          { text: "Images & Gallery", id: "images-gallery" },
          { text: "Pricing & Inventory", id: "pricing-inventory" },
          { text: "Product Identifiers & Custom Fields", id: "custom-fields" },
          { text: "Inventory", id: "inventory" },
          { text: "SEO", id: "seo" },
          { text: "Variant Options", id: "variant-options" },
          { text: "Tags", id: "product-tags" },
        ]}
      />
      <div>
        <form
          className="[&amp;_label.block>span]:font-medium"
          onSubmit={handleSubmit}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <div className="summary" id="summary">
              <div className="flex gap-4 p-6 pt-8">
                <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
                  <h4 className=" font-semibold text-xl">Summary</h4>
                  <p className="mt-2">
                    Edit your product description and necessary information from
                    here
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
                  <div>
                    <TextField
                      label={"Title"}
                      type={"text"}
                      placeholder={"Product title"}
                      additionalAttrs={{ required: true }}
                      onChange={(e) => {
                        handleChange(e);
                        handleNameChange(e);
                      }}
                      value={values.title}
                      classes={undefined}
                      icon={undefined}
                      id={"title"}
                    />
                    {errors.title && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.title}
                      </div>
                    )}
                  </div>
                  <div>
                    <TextField
                      label={"SKU"}
                      type={"text"}
                      placeholder={"HG98723867836"}
                      additionalAttrs={{}}
                      onChange={handleChange}
                      value={values.sku}
                      classes={undefined}
                      icon={undefined}
                      id={"sku"}
                    />
                    {errors.sku && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.sku}
                      </div>
                    )}
                  </div>
                  <div>
                    <SelectField
                      options={[
                        { id: 1, label: "physical", value: "physical" },
                        { id: 2, label: "digital", value: "digital" },
                      ]}
                      onChange={handleChange}
                      value={values.productType}
                      id={"productType"}
                      label={"label"}
                      placeholder={undefined}
                      heading={"Product Type"}
                      datakey={"value"}
                      additionalAttrs={undefined}
                    />
                    {errors.productType && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.productType}
                      </div>
                    )}
                  </div>
                  <div>
                    <SelectField
                      options={data.category.results}
                      onChange={handleChange}
                      value={values.categories}
                      id={"categories"}
                      label={"name"}
                      placeholder={undefined}
                      heading={"Categories"}
                      datakey={"_id"}
                      additionalAttrs={{ multiple: true }}
                    />
                    {errors.categories && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.categories}
                      </div>
                    )}
                  </div>
                  <div>
                    <TextField
                      label={"Slug"}
                      type={"text"}
                      placeholder={"product-slug"}
                      additionalAttrs={{}}
                      onChange={handleChange}
                      value={values.slug}
                      classes={undefined}
                      icon={undefined}
                      id={"slug"}
                    />
                    {errors.slug && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.slug}
                      </div>
                    )}
                  </div>
                  <div>
                    <TextField
                      label={"Overview"}
                      type={"text"}
                      placeholder={"Overview Details"}
                      additionalAttrs={{}}
                      onChange={(e) => {
                        handleChange(e);
                        handleOverviewChange(e);
                      }}
                      value={values.overview}
                      classes={undefined}
                      icon={undefined}
                      id={"overview"}
                    />
                    {errors.overview && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.overview}
                      </div>
                    )}
                  </div>
                
                  <div className=" col-span-2">
                    <div className=" flex flex-col">
                      <label className="block">
                        <span className=" block text-sm mb-1.5">
                          Descriptions
                        </span>
                        <textarea
                          rows={10}
                          className={` flex items-center peer w-full transition duration-200 px-3.5 py-1 text-sm  rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-1000 [&amp;.is-focus]:border-gray-1000 [&amp;.is-focus]:ring-gray-1000   text-gray-700 focus:outline-none `}
                          placeholder={"Descriptions"}
                          id="descriptions"
                          name="descriptions"
                          onChange={handleChange}
                          value={values.descriptions}
                        />
                      </label>
                    </div>
                    {errors.descriptions && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.descriptions}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <ProductImage
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
            <Pricing handleChange={handleChange} data={values} />
            <Invantory handleChange={handleChange} data={values} />
            <Identifiers
              handleChange={handleChange}
              preData={data}
              data={values}
            />

            <SEOInfo handleChange={handleChange} data={values} />
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
              type="submit"
              onClick={() => handleClick("saveDraft")}
            >
              Save as Draft
            </button>
            {productID ? (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("update")}
              >
                Update Product
              </button>
            ) : (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("create")}
              >
                Create Product
              </button>
            )}
          </div>
        </form>
        {/* <FormElement productID={productID} productFormData={productFormData} setProductFormData={setProductFormData} productFormData={productFormData} setProductFormData={setProductFormData} /> */}
      </div>
      {/* {spinner} */}
    </div>
  );
};

export default ProductForm;
