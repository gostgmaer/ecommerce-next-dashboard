"use client";
import React, { useEffect, useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import { useParams, useRouter } from "next/navigation";
import { ProductImage, Summery } from "./Elements";
import { get, getsingle, patch, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";
import { notifySuccess } from "@/lib/notify/notice";

const BrandForm = ({}) => {
  const [axios, spinner] = useAxios();
  const params = useParams();
  const router = useRouter();
  const id = params["id"];
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    descriptions: "",
    slug:"",
    email: "",
    phone: "",
    website: "",
    tagline: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [slug, setSlug] = useState("");

  const fetchSingleBrand = async () => {
    const response = await getsingle("/brands", id);
    if (response.results) {
      setFormData({
        name: response["results"]["name"],
        email: response["results"]["contact"]["email"],
        phone: response["results"]["contact"]["phone"],
        slug:"",
        website: response["results"]["contact"]["website"],
        tagline: response["results"]["tagline"],
        descriptions: response["results"]["descriptions"],
      });
      setSlug(response?.["results"]?.["slug"]);
      setData(response);
      setSelectedFiles(response.results.images);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "name") {
      setSlug(value);
    }
  };
  const haldleChangeSlug = (e) => {
    setSlug(e.target.value);
  };

  const generateBody = () => {
    const body = {
      ...formData,
      contact: {
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
      },
      images: selectedFiles,
      slug: slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-$/, ""),
    };

    return body;
  };

  const updateData = async (status) => {
    const body = generateBody();

    const res = await patch("/brands", { ...body, status: status }, id);
    if (res.statusCode === 200) {
      setFormData({
        name: "",
        slug:"",
        descriptions: "",
        email: "",
        phone: "",
        website: "",
        tagline: "",
      });
      setSelectedFiles([]);
      setSlug("");
      notifySuccess(res.message, 3000);
      router.push("/dashboard/brands");
    }
  };

  const saveData = async (status) => {
    const body = generateBody();

    const res = await post("/brands", { ...body, status: status });

    if (res.statusCode === 201) {
      setFormData({
        name: "",
        slug:"",
        descriptions: "",
        email: "",
        phone: "",
        website: "",
        tagline: "",
      });
      setSelectedFiles([]);
      setSlug("");
      notifySuccess(res.message, 3000);
      router.push("/dashboard/brands");
    }
  };
  const draftForm = (e) => {
    e.preventDefault();
    saveData("draft");
    const state = {
      status: "draft",
    };
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    if (id) {
      updateData(data["results"]["status"]);
    } else {
      saveData("pending");
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleBrand();
    }
  }, [id]);

  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={id ? "Edit Brand" : "Create A Brand"}
        btn={"Brand"}
        url={"/dashboard/brands/create"}
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
              data={formData}
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
            {id ? (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
              >
                Update Brand
              </button>
            ) : (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
              >
                Create Brand
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

export default BrandForm;
