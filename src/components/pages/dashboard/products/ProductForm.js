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
import { fillNullIfEmpty, generateSlug } from "@/helper/function";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import { FaDollarSign } from "react-icons/fa";
import Input from "@/components/global/fields/input";
import { orderStatus } from "@/assets/static/data";
import { SelectItem } from "@nextui-org/react";
// import MultiSelect from "@/components/global/fields/multiSelect";
import MultiSelect from "react-multi-select-component";
import ProductServices from "@/helper/services/ProductServices";
import masterServices from "@/helper/services/masterDataServices";
import { useSession } from "next-auth/react";

const options = [
  { label: "Track inventory for this product", value: "yes" },
  { label: "Do not track inventory for this product", value: "no" },
];

const ProductForm = ({ data, initialValues }) => {
  console.log(initialValues,data);

  const { data: session } = useSession();
  //  console.log(session);
  const params = useParams();

  const router = useRouter();
  const productID = params["productID"];
  const [currData, setCurrData] = useState(data);
  const [tags, setTags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(initialValues.images || []);
  const [selected, setSelected] = useState([]);
  


  const saveProduct = async (status) => {
    const body = generateProductBody();
    //console.log(body);
    const res = await post("/products", { ...body, status: status });
    if (res.statusCode === 201) {
      // notifySuccess(res.message, 3000);
      formik.resetForm();
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
      // notifySuccess(res.message, 3000);
      router.push("/dashboard/products");
    }
  };

  const generateProductBody = () => {
    const body = {
      ...formik.values,
      tags: tags,
      images: selectedFiles,
    };
    return fillNullIfEmpty(body);
  };

  const handleClick = (button) => {
    formik.setFieldValue("clickedButton", button);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { resetForm }) => {
      console.log(selected);

      try {
        // Disable the submit button during submission
        formik.setSubmitting(true);

        //console.log(formik.isSubmitting);
        switch (values["clickedButton"]) {
          case "saveDraft":
            saveProduct("draft");
            break;
          case "update":
            // console.log(currData["product"]["results"]["status"]);

            UpdateProduct(values.status);
            break;
          case "create":
            saveProduct("pending");
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        // Enable the submit button after submission (success or error)
        formik.setSubmitting(false);
      }
    },
  });

  const optionsdata = data.category.results.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  useEffect(() => {
    if (formik.values.title) {
      const slug = formik.values.title
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
      formik.setFieldValue("slug", slug);
    }
  }, [formik.values.title]);

  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={productID ? "Edit Product" : "Add Product"}
        btn={productID && "Product"}
        url={"/dashboard/products/create"}
        exportevent={undefined}
      />

      <div className="m-auto rounded-xl dark:bg-gray-700 ">
        <form
          className="mx-auto grid rounded-lg gap-4 "
          onSubmit={formik.handleSubmit}
        >
          <div
            className="  p-6 gap-4 rounded-lg col-span-full bg-white "
            id="summary"
          >
            <div className="col-span-full">
              <h4 className=" font-semibold text-xl">Products Description</h4>
              <hr className="my-2" />
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  label={"Product Name"}
                  type={"text"}
                  additionalAttrs={{
                    ...formik.getFieldProps("title"),
                    placeholder: "Pant...",
                  }}
                  classes={undefined}
                  icon={undefined}
                  id={"title"}
                />

                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">
                    {typeof formik.errors.title === "string"
                      ? formik.errors.title
                      : ""}
                  </div>
                )}
              </div>
              <div>
                <Input
                  label={"SKU (Stock keeping unit)"}
                  type={"text"}
                  additionalAttrs={{
                    ...formik.getFieldProps("sku"),
                    placeholder: "IDEAS47...",
                  }}
                  classes={undefined}
                  icon={undefined}
                  id={"sku"}
                />

                {formik.errors.sku && formik.touched.sku && (
                  <div className="text-red-500 text-sm">
                    {formik["errors"]["sku"]}
                  </div>
                )}
              </div>
 <div>
                <Select
                  label={"Status"}
                  id={"status"}
                  options={[
                    { key: "active", label: "Active" },
                    { key: "inactive", label: "Inactive" },
                    { key: "draft", label: "Draft" },
                    { key: "pending", label: "Pending" },
                    { key: "archived", label: "Archived" },
                    { key: "published", label: "Published" },
                  ]}
                  optionkeys={{ key: "key", value: "label" }}
                  placeholder={undefined}
                  additionalAttrs={{ ...formik.getFieldProps("status") }}
                />
                {formik.errors.status && formik.touched.status && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.status}
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
                {formik.errors.productType && formik.touched.productType && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.productType}
                  </div>
                )}
              </div>

              <div>
                <Select
                  label={"Category"}
                  id={"category"}
                  options={data.category.results}
                  optionkeys={{ key: "_id", value: "title" }}
                  placeholder={undefined}
                  additionalAttrs={{ ...formik.getFieldProps("category") }}
                />
                {formik.errors.category && formik.touched.category && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.category}
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
                {formik.errors.brandName && formik.touched.brandName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.brandName}
                  </div>
                )}
              </div>
              <div>
                <Input
                  label={"slug"}
                  type={"text"}
                  additionalAttrs={{
                    ...formik.getFieldProps("slug"),
                    placeholder: "product-slug",
                    readOnly: true,
                  }}
                  classes={undefined}
                  icon={undefined}
                  id={"slug"}
                />

                {formik.errors.slug && formik.touched.slug && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.slug}
                  </div>
                )}
              </div>

              {/* <div>
                <Input
                  label={"Overview"}
                  type={"text"}
                  additionalAttrs={{
                    ...formik.getFieldProps("overview"),
                    placeholder: "Overview...",
                  }}
                  classes={undefined}
                  icon={undefined}
                  id={"overview"}
                />

                {formik.errors.overview && formik.touched.overview && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.overview}
                  </div>
                )}
              </div> */}

              <div className=" col-span-2">
                <label className="block">
                  <span className=" block text-sm mb-1.5">Descriptions</span>
                  <textarea
                    rows={10}
                    className={` flex items-center peer w-full transition duration-200 px-3.5 py-1 text-sm  rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-1000 [&amp;.is-focus]:border-gray-1000 [&amp;.is-focus]:ring-gray-1000   text-gray-700 focus:outline-none `}
                    placeholder={"Descriptions"}
                    {...formik.getFieldProps("descriptions")}
                    id="descriptions"
                    name="descriptions"
                  />
                </label>
                {formik.errors.descriptions && formik.touched.descriptions && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.descriptions}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className=" p-6 gap-4 rounded-lg col-span-full bg-white"
            id="images-gallery"
          >
         <div className="col-span-full">
              <h4 className=" font-semibold text-xl">Products Images</h4>
              <hr className="my-2" />
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
          <div
            className=" p-6 gap-4 rounded-lg col-span-full bg-white"
            id="pricing-inventory"
          >
            <div className="col-span-full">
              <h4 className=" font-semibold text-xl">Pricing & Availability</h4>
              <hr className="my-2" />
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            
              <div>
                <Input
                  label={"Retail Price"}
                  type={"number"}
                  additionalAttrs={{
                    ...formik.getFieldProps("retailPrice"),
                    placeholder: "0.00",
                  }}
                  classes={undefined}
                  icon={<FaDollarSign />}
                  id={"retailPrice"}
                />

                {formik.errors.retailPrice && formik.touched.retailPrice && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.retailPrice}
                  </div>
                )}
              </div>
              <div>
                <Input
                  label={"Sale Price"}
                  type={"number"}
                  additionalAttrs={{
                    ...formik.getFieldProps("price"),
                    placeholder: "0.00",
                  }}
                  classes={undefined}
                  icon={<FaDollarSign />}
                  id={"price"}
                />

                {formik.errors.salePrice && formik.touched.salePrice && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.salePrice}
                  </div>
                )}
              </div>
                <div>
                <Input
                  label={"Current Stock Level"}
                  type={"number"}
                  additionalAttrs={{
                    ...formik.getFieldProps("stock"),
                    placeholder: "0.00",
                  }}
                  classes={undefined}
                  icon={undefined}
                  id={"stock"}
                />

                {formik.errors.stock && formik.touched.stock && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.stock}
                  </div>
                )}
              </div>

              <div>
                <Input
                  label={"Low Stock Level"}
                  type={"number"}
                  additionalAttrs={{
                    ...formik.getFieldProps("lowStockLevel"),
                    placeholder: "0.00",
                  }}
                  classes={undefined}
                  icon={undefined}
                  id={"lowStockLevel"}
                />

                {formik.errors.lowStockLevel &&
                  formik.touched.lowStockLevel && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lowStockLevel}
                    </div>
                  )}
              </div>
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
                {formik.isSubmitting ? "Submitting..." : "Create Product"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;