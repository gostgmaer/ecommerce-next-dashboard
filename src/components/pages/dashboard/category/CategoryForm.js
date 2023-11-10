"use client";
import React, { useEffect, useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import { useParams, useRouter } from "next/navigation";
import { ProductImage, Summery } from "./CategoryElement";
import { get, getsingle, patch, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";
import { notifySuccess } from "@/lib/notify/notice";

const CategoryForm = ({}) => {
  const [axios, spinner] = useAxios();
  const params = useParams();
  const router = useRouter();
  const cateID = params["cateID"];
  const [category, setCategory] = useState({});
  const [data, setData] = useState({});
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    parent_category: "",
    display_type: "",
    images: [],
    descriptions: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [slug, setSlug] = useState("");
  const fetchCategory = async (second) => {
    const response = await get("/categories");
    setCategory(response);
  };

  const fetchSingleCategory = async () => {
    const response = await getsingle("/categories", cateID);
    setCategoryForm({
      name: response?.["results"]?.["name"],
      slug: response?.["results"]?.["slug"],
      parent_category: response?.["results"]?.["parent_category"],
      display_type: response?.["results"]?.["display_type"],
      images: response?.["results"]?.["images"],
      descriptions: response?.["results"]?.["descriptions"],
    });
    setSlug(response?.["results"]?.["slug"])
    setData(response);
    setSelectedFiles(response.results.images);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({ ...categoryForm, [name]: value });
    if (name === "name") {
      setSlug(value);
    }
  };
  const haldleChangeSlug = (e) => {
    setSlug(e.target.value);
  };

  const generateCategoryBody = () => {
    const body = {
      ...categoryForm,
      images: selectedFiles,
      slug: slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-$/, ""),
    };

    return body;
  };

  const updateCategory = async (status) => {
    const body = generateCategoryBody();

    const res = await patch("/categories", { ...body, status: status }, cateID);
    if (res.statusCode === 200) {
      setCategoryForm({
        name: "",
        slug: "",
        parent_category: "",
        display_type: "",
        images: [],
        descriptions: "",
      });
      setSelectedFiles([]);
      setSlug("");
      notifySuccess(res.message, 3000);
      router.push("/dashboard/categories");
    }
  };

  const saveCategory = async (status) => {
    const body = generateCategoryBody();

    const res = await post("/categories", { ...body, status: status });

    if (res.statusCode === 201) {
      setCategoryForm({
        name: "",
        slug: "",
        parent_category: "",
        display_type: "",
        images: [],
        descriptions: "",
      });
      setSelectedFiles([]);
      setSlug("");
      notifySuccess(res.message, 3000);
      router.push("/dashboard/categories");
    }
  };
  const draftForm = (e) => {
    e.preventDefault();
    saveCategory("draft");
    const state = {
      status: "draft",
    };
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    if (cateID) {
      updateCategory(data["results"]["status"]);
    } else {
      saveCategory("pending");
    }
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
            <Summery
              handleChange={handleChange}
              data={categoryForm}
              category={category?.["results"]}
              slug={slug}
              handleSlug={haldleChangeSlug}
            />
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
