"use client";
import React, { useEffect, useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import { useParams } from "next/navigation";
import { ProductImage, Summery } from "./CategoryElement";
import { get, getsingle, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";

const CategoryForm = ({}) => {
  const [axios, spinner] = useAxios();

  const [data, setData] = useState({});
  const [productFormData, setProductFormData] = useState({
    name: data["name"],
    slug: data["slug"],
    parent_category: data["parent_category"],
    display_type: data["display_type"],
    images: [],
    descriptions: data["descriptions"],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fetchCategory = async (second) => {
    const category = await get("/categories");
    console.log(category);
  };

  const params = useParams();
  const cateID = params["cateID"];

  const fetchSingleCategory = async () => {
    const response = await getsingle("/categories", cateID);
    console.log(response);
    setData(response);
    setSelectedFiles(response.results.images);
    setTimeout(() => {
      console.log(productFormData, data, response);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
    console.log(productFormData);
  };

  const saveProduct = async (status) => {
    const body = { ...productFormData, status: status, images: selectedFiles };

    const res = await post("/categories", body);
    console.log(res);
    if (res) {
      setProductFormData({
        name: "",
        slug: "",
        parent_category: "",
        display_type: "",
        images: [],
        descriptions: "",
      });
      setSelectedFiles([]);
    }
    fetchCategory();
  };

  const draftForm = (e) => {
    e.preventDefault();
    saveProduct("draft");
    const state = {
      status: "draft",
    };
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    saveProduct("pending");
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (cateID) {
      fetchSingleCategory();
    }
  }, [cateID]);

  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={cateID ? "Edit Category" : "Create A Category"}
        btn={"Category"}
        url={"/dashboard/categories/create"}
      />
      <TopStepper />
      <div>
        <form
          className="[&amp;_label.block>span]:font-medium"
          onSubmit={SubmitForm}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <Summery handleChange={handleChange} data={productFormData} />
            <ProductImage
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
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
            {cateID ? (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
              >
                Update Category
              </button>
            ) : (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
              >
                Create Category
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

export default CategoryForm;
