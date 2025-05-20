"use client";
import React, { useEffect, useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import { useParams, useRouter } from "next/navigation";
import { ProductImage, Summery } from "./Elements";
import { get, getsingle, patch, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";
import { notifySuccess, notifyinfo } from "@/lib/notify/notice";
import { useFormik } from "formik";
import TextField from "@/components/global/fields/TextField";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import Input from "@/components/global/fields/input";

const BrandForm = ({ initialValues }) => {
  const [axios, spinner] = useAxios();
  const params = useParams();
  const router = useRouter();
  const id = params["id"];


  const [selectedFiles, setSelectedFiles] = useState([]);
  const [slug, setSlug] = useState("");

  const generateBody = () => {
    const body = {
      ...formik.values,
      contact: {
        email: formik.values.email,
        phone: formik.values.phone,
        website: formik.values.website,
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
      setSelectedFiles([]);
      setSlug("");
      notifyinfo(res.message, 3000);
      router.push("/dashboard/brands");
    }
  };

  const saveData = async (status) => {
    const body = generateBody();
    const res = await post("/brands", { ...body, status: status });
    if (res.statusCode === 201) {
      setSelectedFiles([]);
      setSlug("");
      notifySuccess(res.message, 3000);

    }
  };



  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {

        formik.setSubmitting(true);

        //console.log(formik.isSubmitting);
        switch (values["clickedButton"]) {
          case "saveDraft":
            saveData("draft");
            break;
          case "update":
            updateData(initialValues["status"]);
            break;
          case "create":
            saveData("pending");
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


  const handleClick = (button) => {
    formik.setFieldValue("clickedButton", button);
  };




  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={id ? "Edit Brand" : "Create A Brand"}
        btn={id && "Brand"}
        url={"/dashboard/brands/create"} exportevent={undefined}      />
      <TopStepper
        links={[
          { text: "Summary", id: "summary" },
          { text: "Contact info", id: "contact-info" },
          { text: "Images & Gallery", id: "images-gallery" },
        ]}
      />
      <div className="bg-white max-w-7xl m-auto rounded-xl dark:bg-gray-700 p-5">
        <form
          className="mx-auto  grid rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <div className="mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full ">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Add new Brands</h4>
              <p className="mt-2">Edit your Brands information from here</p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2" id="summary">
              <div>

                <Input label={"Brand"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("name"),
                  placeholder: "Nike",
                }} classes={undefined} icon={undefined} id={"name"} />

                {formik.errors.name &&
                  formik.touched.name && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["name"]}
                    </div>
                  )}

              </div>
              <div>
                <Input label={"Slug"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("slug"),
                  placeholder: "Slug",
                }} classes={undefined} icon={undefined} id={"slug"} />

                {formik.errors.slug &&
                  formik.touched.slug && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["slug"]}
                    </div>
                  )}

              </div>
              <div className="col-span-full">

                <Input label={"Tagline"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("tagline"),
                  placeholder: "tagline...",
                }} classes={undefined} icon={undefined} id={"tagline"} />

                {formik.errors.tagline &&
                  formik.touched.tagline && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["tagline"]}
                    </div>
                  )}
              </div>
              <div className=" col-span-full">
                <label className="block">
                  <span className=" block text-sm mb-1.5">Descriptions</span>
                  <textarea
                    rows={10}
                    className={` flex items-center peer w-full transition duration-200 px-3.5 py-1 text-sm  rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-1000 [&amp;.is-focus]:border-gray-1000 [&amp;.is-focus]:ring-gray-1000   text-gray-700 focus:outline-none `}
                    placeholder={"Descriptions"}
                    id="descriptions"
                    name="descriptions"
                    {
                    ...formik.getFieldProps("descriptions")
                    }
                  />
                </label>
                {formik.errors.descriptions &&
                  formik.touched.descriptions && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["descriptions"]}
                    </div>
                  )}
              </div>
              <div className=" col-span-full " id="contact-info">
                <h4 className="my-5">Contact Informations</h4>
              </div>
              <div>

                <Input label={"Email"} type={"email"} additionalAttrs={{
                  ...formik.getFieldProps("email"),
                  placeholder: "info@mail.com..",
                }} classes={undefined} icon={undefined} id={"email"} />

                {formik.errors.email &&
                  formik.touched.email && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["email"]}
                    </div>
                  )}
              </div>
              <div>

                <Input label={"Phone Number"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("phone"),
                  placeholder: "+918000000000",
                }} classes={undefined} icon={undefined} id={"phone"} />

                {formik.errors.phone &&
                  formik.touched.phone && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["phone"]}
                    </div>
                  )}

              </div>
              <div>

                <Input label={"Website"} type={"text"} additionalAttrs={{
                  ...formik.getFieldProps("website"),
                  placeholder: "https://website.com",
                }} classes={undefined} icon={undefined} id={"website"} />

                {formik.errors.website &&
                  formik.touched.website && (
                    <div className="text-red-500 text-sm">
                      {formik["errors"]["website"]}
                    </div>
                  )}

              </div>
            </div>
          </div>
          <div className="mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full " id="images-gallery">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Upload new thumbnail image</h4>
              <p className="mt-2">Upload your product image gallery here</p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-full">
                <MultiImageUploadr
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  label={"Images"}
                />
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
            {id ? (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("update")}
                disabled={formik.isSubmitting}
              >
                Update
              </button>
            ) : (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("create")}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Save'}

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
