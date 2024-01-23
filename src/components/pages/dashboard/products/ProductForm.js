"use client";
import React, { useEffect, useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import { useParams, useRouter } from "next/navigation";
import { getsingle, patch, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";
import { notifySuccess } from "@/lib/notify/notice";
import { productSchema } from "@/utils/validation/validation";
import { useFormik } from "formik";
import TextField from "@/components/global/fields/TextField";
import SelectField, { Select } from "@/components/global/fields/SelectField";
import { generateSlug } from "@/helper/function";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import { FaDollarSign } from "react-icons/fa";
import Input from "@/components/global/fields/input";
const options = [
  { label: "Track inventory for this product", value: "yes" },
  { label: "Do not track inventory for this product", value: "no" },
];
const ProductForm = ({ data, initialValues }) => {
  const params = useParams();
  const router = useRouter();
  const productID = params["productID"];
  const [currData, setCurrData] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);


  const saveProduct = async (status) => {
    const body = generateProductBody();
    //console.log(body);
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
      ...formik.values,
      tags: tags,
      images: selectedFiles,
    };
    return body;
  };



  const handleClick = (button) => {
    formik.setFieldValue("clickedButton", button);
  };


  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Disable the submit button during submission
        formik.setSubmitting(true);

        //console.log(formik.isSubmitting);
        switch (values["clickedButton"]) {
          case "saveDraft":
            saveProduct("draft");
            break;
          case "update":
            UpdateProduct(currData["results"]["status"]);
            break;
          case "create":
            saveProduct("pending");
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        // Enable the submit button after submission (success or error)
        formik.setSubmitting(false);
      }
    },
  });









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
      <div className="bg-white max-w-7xl m-auto rounded-xl dark:bg-gray-700 p-5">
        <form
          className="mx-auto  grid rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full " id="summary">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Summary</h4>
              <p className="mt-2">
                Edit your product description and necessary information from
                here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>
                <Input label={"Title"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("title"),
                  placeholder: "Pant...",
                }} classes={undefined} icon={undefined} id={"title"} />

                {formik.errors.title &&
                  formik.touched.title && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.title}
                    </div>
                  )}
              </div>
              <div>

                <Input label={"SKU"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("sku"),
                  placeholder: "Pant...",
                }} classes={undefined} icon={undefined} id={"sku"} />

                {formik.errors.sku &&
                  formik.touched.sku && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["sku"]}
                    </div>
                  )}
              </div>
              <div>
                <Select
                  label={"Product Type"}
                  id={"productType"}
                  options={[
                    { id: 1, label: "physical", value: "physical" },
                    { id: 2, label: "digital", value: "digital" },
                  ]}
                  optionkeys={{ key: "label", value: "value" }}
                  placeholder={undefined}
                  additionalAttrs={{ ...formik.getFieldProps("productType") }}
                />
                {formik.errors.productType &&
                  formik.touched.productType && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productType}
                    </div>
                  )}
              </div>
              <div>
                <Select
                  label={"Categories"}
                  id={"categories"}
                  options={data.category.results}
                  optionkeys={{ key: "_id", value: "name" }}
                  placeholder={undefined}
                  additionalAttrs={{ ...formik.getFieldProps("categories") }}
                />
                {formik.errors.categories &&
                  formik.touched.categories && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.categories}
                    </div>
                  )}

              </div>
              <div>

                <Input label={"Slug"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("sku"),
                  placeholder: "product-slug",
                }} classes={undefined} icon={undefined} id={"slug"} />

                {formik.errors.slug &&
                  formik.touched.slug && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.slug}
                    </div>
                  )}

              </div>
              <div>
                <Input label={"Overview"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("overview"),
                  placeholder: "Overview...",
                }} classes={undefined} icon={undefined} id={"overview"} />

                {formik.errors.overview &&
                  formik.touched.overview && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.overview}
                    </div>
                  )}
                
              </div>

              <div className=" col-span-2">
                <label className="block">
                  <span className=" block text-sm mb-1.5">
                    Descriptions
                  </span>
                  <textarea
                    rows={10}
                    className={` flex items-center peer w-full transition duration-200 px-3.5 py-1 text-sm  rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-1000 [&amp;.is-focus]:border-gray-1000 [&amp;.is-focus]:ring-gray-1000   text-gray-700 focus:outline-none `}
                    placeholder={"Descriptions"}
                    {
                    ...formik.getFieldProps("descriptions")

                    }
                    id="descriptions"
                    name="descriptions"

                  />
                </label>
                {formik.errors.descriptions &&
                  formik.touched.descriptions && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.descriptions}
                    </div>
                  )}
              </div>

            </div>
          </div>

          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full" id="images-gallery">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Product images</h4>
              <p className="mt-2">
                Upload your product image gallery here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className=" col-span-1 sm:col-span-2">
                <MultiImageUploadr
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  label={"Images"}
                />
              </div>
            </div>
          </div>
          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full" id="pricing-inventory">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Pricing</h4>
              <p className="mt-2">
                Add your product pricing here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>

                <Input label={"Price"} type={"number"} additionalAttrs={{
                  ...formik.getFieldProps("price"),
                  placeholder: "0.00",
                }} classes={undefined} icon={<FaDollarSign />} id={"price"} />

                {formik.errors.price &&
                  formik.touched.price && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.price}
                    </div>
                  )}

              </div>
              <div>

                <Input label={"Cost Price"} type={"number"} additionalAttrs={{
                  ...formik.getFieldProps("costPrice"),
                  placeholder: "0.00",
                }} classes={undefined} icon={<FaDollarSign />} id={"costPrice"} />

                {formik.errors.costPrice &&
                  formik.touched.costPrice && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.costPrice}
                    </div>
                  )}



              </div>
              <div>

                <Input label={"Retail Price"} type={"number"} additionalAttrs={{
                  ...formik.getFieldProps("retailPrice"),
                  placeholder: "0.00",
                }} classes={undefined} icon={<FaDollarSign />} id={"retailPrice"} />

                {formik.errors.retailPrice &&
                  formik.touched.retailPrice && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.retailPrice}
                    </div>
                  )}

              </div>
              <div>


                <Input label={"Sale Price"} type={"number"} additionalAttrs={{
                  ...formik.getFieldProps("salePrice"),
                  placeholder: "0.00",
                }} classes={undefined} icon={<FaDollarSign />} id={"salePrice"} />

                {formik.errors.salePrice &&
                  formik.touched.salePrice && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.salePrice}
                    </div>
                  )}

              </div>
            </div>
          </div>
          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full" id="inventory">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Inventory Tracking</h4>
              <p className="mt-2">
                Add your product inventory info here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-full grid gap-4">

    
              </div>
              <div>

                <Input label={"Current Stock Level"} type={"number"} additionalAttrs={{
                  ...formik.getFieldProps("currentStockLevel"),
                  placeholder: "0.00",
                }} classes={undefined} icon={undefined} id={"currentStockLevel"} />

                {formik.errors.currentStockLevel &&
                  formik.touched.currentStockLevel && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.currentStockLevel}
                    </div>
                  )}



              </div>

              <div>

                <Input label={"Low Stock Level"} type={"number"} additionalAttrs={{
                  ...formik.getFieldProps("lowStockLevel"),
                  placeholder: "0.00",
                }} classes={undefined} icon={undefined} id={"lowStockLevel"} />

                {formik.errors.lowStockLevel &&
                  formik.touched.lowStockLevel && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lowStockLevel}
                    </div>
                  )}


              </div>
            </div>
          </div>
          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full" id="custom-fields">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Product Identifiers</h4>
              <p className="mt-2">
                Edit your product identifiers here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input label={"Global Trade Item Number"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("gtin"),
                  placeholder: "678ASD.......",
                }} classes={undefined} icon={undefined} id={"gtin"} />

                {formik.errors.gtin &&
                  formik.touched.gtin && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.gtin}
                    </div>
                  )}

              </div>
              <div>


                <Input label={"Manufacturer Part Number"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("manufacturerPartNumber"),
                  placeholder: "1459894.......",
                }} classes={undefined} icon={undefined} id={"manufacturerPartNumber"} />

                {formik.errors.manufacturerPartNumber &&
                  formik.touched.manufacturerPartNumber && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.manufacturerPartNumber}
                    </div>
                  )}


              </div>
              <div>


                <Select
                  label={"Brand"}
                  id={"brandName"}
                  options={data.brands.results}
                  optionkeys={{ key: "_id", value: "name" }}
                  placeholder={undefined}
                  additionalAttrs={{ ...formik.getFieldProps("brandName") }}
                />
                {formik.errors.brandName &&
                  formik.touched.brandName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.brandName}
                    </div>
                  )}

              </div>
              <div>



                <Input label={"Product UPC/EAN"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("productUPCEAN"),
                  placeholder: "487894.......",
                }} classes={undefined} icon={undefined} id={"productUPCEAN"} />

                {formik.errors.productUPCEAN &&
                  formik.touched.productUPCEAN && (
                    <div className="text-red-500 text-sm">
                      {formik?.errors?.["productUPCEAN"]}
                    </div>
                  )}

              </div>
            </div>
          </div>
          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full" id="seo-info">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Search Engine Optimization</h4>
              <p className="mt-2">
                Add your product&lsquo;s seo information here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>

                <Input label={"Meta Title"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("seo_info.metaTitle"),
                  placeholder: "seo meta title",
                }} classes={undefined} icon={undefined} id={"seo_info.metaTitle"} />

                {formik.errors.seo_info?.["metaTitle"] &&
                  formik.touched.seo_info?.["metaTitle"] && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.seo_info?.["metaTitle"]}
                    </div>
                  )}
              </div>
              <div>
               
              </div>
              <div className=" col-span-2">
                <label className="block">
                  <span className=" block text-sm mb-1.5">
                    Meta Description
                  </span>
                  <textarea
                    rows={10}
                    className={` flex items-center peer w-full transition duration-200 px-3.5 py-1 text-sm  rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-1000 [&amp;.is-focus]:border-gray-1000 [&amp;.is-focus]:ring-gray-1000   text-gray-700 focus:outline-none `}
                    placeholder={"SEO Meta Description...."}
                    id="seo_info.metaDescription"
                    name="seo_info.metaDescription"
                    {
                    ...formik.getFieldProps("seo_info.metaDescription")
                    }

                  />
                </label>
                {formik.errors.seo_info?.["metaDescription"] &&
                  formik.touched.seo_info?.["metaDescription"] && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.seo_info?.["metaDescription"]}
                    </div>
                  )}
              </div>
         
            </div>
          </div>
          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full" id="variant-options">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Variant Options</h4>
              <p className="mt-2">
                Add your product variants here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <TextField
                  label={"Product URL"}
                  type={"text"}
                  placeholder={"URL"}
                  additionalAttrs={undefined}
                  value={undefined}
                  onChange={undefined}
                  classes={undefined}
                  id={undefined}
                  icon={undefined}
                />
              </div>
            </div>
          </div>
          <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full" id="product-tags">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Tags</h4>
              <p className="mt-2">
                Add your product&lsquo;s tag or category here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-end gap-3">
                {/* <TextField
              label={"Tags"}
              type={"text"}
              placeholder={"Tag"}
              additionalAttrs={{ onKeyDown: handleKeyDown }}
              value={inputValue}
              onChange={handleInputChange}
              classes={undefined}
              id={undefined}
              icon={undefined}
            /> */}


                {/* <Input label={"Tags"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("tags"),
                  placeholder: "678ASD.......",value:formik.values.tags
                }} classes={undefined} icon={undefined} id={"tags"} />

                {formik.errors.tags &&
                  formik.touched.tags && (
                    <div className="text-red-500 text-sm">
                      {formik.errors?.tags}
                    </div>
                  )} */}


                {/* <button
              type="button"
              className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md  border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto h-10 "
              onClick={handleAdd}
            >
              {" "}
              Add
            </button> */}
              </div>

              {/* <div className="col-span-2">
            <p className="error text-red-500 text-xs font-medium my-1">
              {errorMessage}
            </p>
            <div className="flex justify-start items-center gap-3 flex-wrap">
              {tags.map((option, index) => (
                <div key={option} className="relative">
                  <div className="flex justify-start">
                    <span className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-sm cursor-pointer">
                      {option}
                    </span>
                    <button
                      className="ml-1 text-red-600"
                      onClick={() => handleRemoveClick(index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
            </div>
          </div>



          <div className="sticky bottom-0 left-0 right-0 py-4 p-6 bg-white  flex items-center justify-end gap-4 border-t ">
            <button
              className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 min-w-max @xl:w-auto"
              type="submit"
              onClick={() => handleClick("saveDraft")}
              disabled={formik.isSubmitting}
            >
              Save as Draft
            </button>
            {productID ? (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("update")}
                disabled={formik.isSubmitting}
              >
                Update Product
              </button>
            ) : (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("create")}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Create Product'}

              </button>
            )}
          </div>
        </form>
       
      </div>

    </div>
  );
};

export default ProductForm;




