"use client";
import React, { useEffect, useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import { useParams, useRouter } from "next/navigation";
import { get, getsingle, patch, post } from "@/lib/http";
import { notifySuccess, notifyinfo } from "@/lib/notify/notice";
import { useFormik } from "formik";
import TextField from "@/components/global/fields/TextField";
import SelectField from "@/components/global/fields/SelectField";
import { generateSlug } from "@/helper/function";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import MultiSelect from "@/components/global/fields/multiSelect";
// import {  ExamplecomboBox } from "@/components/global/fields/comboBox";


const CategoryForm = (props) => {

  const params = useParams();
  const router = useRouter();
  const cateID = params["cateID"];
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleNameChange = (e) => {
    const newName = e.target.value;
    formik.setFieldValue("name", newName);
    formik.setFieldValue("slug", generateSlug(newName));
  };
  const generateCategoryBody = () => {
    const body = {
      ...formik.values,
      images: selectedFiles,
    };
    return body;
  };

  const updateCategory = async (status) => {
    const body = generateCategoryBody();

    const res = await patch("/categories", { ...body, status: status }, cateID);
    if (res.statusCode === 200) {
      setSelectedFiles([]);
      notifyinfo(res.message, 5000);
      router.push("/dashboard/categories");
    }
  };

  const saveCategory = async (status) => {
    const body = generateCategoryBody();

    const res = await post("/categories", { ...body, status: status });

    if (res.statusCode === 201) {
      setSelectedFiles([]);
      notifySuccess(res.message, 3000);
      router.push("/dashboard/categories");
    }
  };



  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {

        formik.setSubmitting(true);

        //console.log(formik.isSubmitting);
        switch (values["clickedButton"]) {
          case "saveDraft":
            saveCategory("draft");
            break;
          case "update":
            updateCategory(props.initialValues["status"]);
            break;
          case "create":
            saveCategory("pending");
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
        label={cateID ? "Edit Category" : "Create A Category"}
        btn={cateID && "Category"}
        url={"/dashboard/categories/create"} exportevent={undefined}      />
      <TopStepper
        links={[
          { text: "Summary", id: "summary" },

          { text: "Images & Gallery", id: "images-gallery" },
        ]}
      />
      <div>
        <form
          className="mx-auto  grid rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <div className="mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full " id="summary">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Add new category</h4>
              <p className="mt-2">
                Edit your category information from here
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2" >
              <div>
                <TextField
                  label={"Category Name"}
                  type={"text"}
                  placeholder={"Example"}
                  additionalAttrs={undefined}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleNameChange(e);
                  }}
                  value={formik.values.title}
                  classes={undefined}
                  icon={undefined}
                  id={"title"}
                />
              </div>
            <div>
              <MultiSelect></MultiSelect>
            </div>
              <div>
                <TextField
                  label={"Slug"}
                  type={"text"}
                  placeholder={"Category Slug"}
                  additionalAttrs={undefined}
                  onChange={formik.handleChange}
                  value={formik.values.slug}
                  classes={undefined}
                  icon={undefined}
                  id={"slug"}
                />
              </div>
              <div>
                <SelectField
                  options={props.data.categories.results}
                  onChange={formik.handleChange}
                  value={formik.values.parent}
                  id={"parent"}
                  label={"title"}
                  placeholder={undefined}
                  datakey={"_id"}
                  heading={"Parent Category"} additionalAttrs={undefined} />
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
                      onChange={formik.handleChange}
                      value={formik.values.descriptions}
                    />
                  </label>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-8 grid p-6 gap-4 sm:grid-cols-3 col-span-full " id="images-gallery">
            <div className="col-span-1">
              <h4 className=" font-semibold text-xl">Upload new thumbnail image</h4>
              <p className="mt-2">Upload your product image gallery here</p>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2" >
              <div className=" col-span-full">
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
            >
              Save as Draft
            </button>
            {cateID ? (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("update")}
              >
                Update
              </button>
            ) : (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("create")}
              >
                Save
              </button>
            )}
          </div>
        </form>

      </div>

    </div>
  );
};

export default CategoryForm;
