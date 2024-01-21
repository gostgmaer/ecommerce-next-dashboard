"use client";
import React, { useEffect, useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import { useParams, useRouter } from "next/navigation";
import { ProductImage, Summery } from "./CategoryElement";
import { get, getsingle, patch, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";
import { notifySuccess } from "@/lib/notify/notice";
import { useFormik } from "formik";
import { validateCategory } from "@/utils/validation/validation";
import TextField from "@/components/global/fields/TextField";
import SelectField from "@/components/global/fields/SelectField";
import { generateSlug } from "@/helper/function";

const initialValues = {
  name: "",
  slug: "",
  parent_category: "",
  display_type: "",
  descriptions: "",
};

const CategoryForm = (props) => {
  const [axios, spinner] = useAxios();
  const params = useParams();
  const router = useRouter();
  const cateID = params["cateID"];
  const [category, setCategory] = useState({});
  const [data, setData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateCategory,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setTimeout(() => {
        // Submit logic here (you can make an API call)

        setSubmitting(false);
        resetForm();
      }, 1000);
      switch (formik.values.clickedButton) {
        case "saveDraft":
          console.log("Save Draft clicked");
          saveCategory("draft");
          break;
        case "update":
          updateCategory(data["results"]["status"]);
          // Call the appropriate API for Update
          break;
        case "create":
          console.log("Create clicked");
          saveCategory("pending");
          break;
        default:
          break;
      }
    },
  });

  const handleNameChange = (e) => {
    const newName = e.target.value;
    formik.setFieldValue("name", newName);
    formik.setFieldValue("slug", generateSlug(newName));
  };

  const handleClick = (button) => {
    formik.setFieldValue("clickedButton", button);
    formik.submitForm(); // Trigger form submission after setting the button
  };

  const fetchCategory = async (second) => {
    const response = await get("/categories");
    setCategory(response);
  };

  const fetchSingleCategory = async () => {
    const response = await getsingle("/categories", cateID);
    if (response) {
      formik.setValues(response?.["results"]);
      setData(response);
      setSelectedFiles(response.results.images);
    }
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
      notifySuccess(res.message, 3000);
      router.push("/dashboard/categories");
    }
  };

  const saveCategory = async (status) => {
    const body = generateCategoryBody();

    const res = await post("/categories", { ...body, status: status });

    if (res.statusCode === 201) {
      setSelectedFiles([]);
      // setSlug("");
      notifySuccess(res.message, 3000);
      router.push("/dashboard/categories");
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
      <TopStepper
        links={[
          { text: "Summary", id: "summary" },

          { text: "Images & Gallery", id: "images-gallery" },
        ]}
      />
      <div>
        <form
          className="[&amp;_label.block>span]:font-medium"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <div className="summary" id="summary">
              <div className="flex gap-4 p-6 pt-8">
                <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
                  <h4 className=" font-semibold text-xl">Add new category</h4>
                  <p className="mt-2">
                    Edit your category information from here
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
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
                      value={formik.values.name}
                      classes={undefined}
                      icon={undefined}
                      id={"name"}
                    />
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
                      options={category?.["results"]}
                      onChange={formik.handleChange}
                      value={formik.values.parent_category}
                      id={"parent_category"}
                      label={"name"}
                      placeholder={undefined}
                      datakey={"_id"}
                      heading={"Parent Category"} additionalAttrs={undefined}                    />
                  </div>
                  {/* <div>
                    <SelectField
                      options={[
                        {
                          id: 1,
                          label: "Fresh Vegetables",
                          value: "Fresh Vegetables",
                        },
                        { id: 2, label: "Diet Foods", value: "Diet Foods" },
                        {
                          id: 3,
                          label: "Green Vegetables",
                          value: "Green Vegetables",
                        },
                      ]}
                      value={data.display_type}
                      onChange={handleChange}
                      id={"display_type"}
                      label={"label"}
                      placeholder={undefined}
                      datakey={"value"}
                      heading={"Display Type  "}
                    />
                  </div> */}
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
            </div>
            <ProductImage
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
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
            {cateID ? (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("update")}
              >
                Update Category
              </button>
            ) : (
              <button
                className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
                type="submit"
                onClick={() => handleClick("create")}
              >
                Create Category
              </button>
            )}
          </div>
        </form>
        {/* <FormElement productID={productID} productFormData={productFormData} setProductFormData={setProductFormData} productFormData={productFormData} setProductFormData={setProductFormData} /> */}
      </div>

    </div>
  );
};

export default CategoryForm;
