import SelectField from "@/components/global/fields/SelectField";
import TextField from "@/components/global/fields/TextField";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";

export const Summery = ({ handleChange, data,category,slug,handleSlug }) => {
  
  return (
    <div className="summary">
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
              value={data.name}
              onChange={handleChange}
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
              value={slug}
              onChange={handleSlug}
              classes={undefined}
              icon={undefined}
              id={"slug"}
            />
          </div>
          <div>
            <SelectField
              options={category}
              value={data.parent_category}
              onChange={handleChange}
              id={"parent_category"}
              label={"name"}
              placeholder={undefined} datakey={"name"} heading={"Parent Category"}            />
          </div>
          <div>
            <SelectField
              options={[
                { id: 1, label: "Fresh Vegetables", value: "Fresh Vegetables" },
                { id: 2, label: "Diet Foods", value: "Diet Foods" },
                { id: 3, label: "Green Vegetables", value: "Green Vegetables" }
              ]}
              value={data.display_type}
              onChange={handleChange}
              id={"display_type"}
              label={"label"}
              placeholder={undefined} datakey={"value"} heading={"Display Type  "}            />
          </div>
          <div className=" col-span-2">
            <div className=" flex flex-col">
              <label className="block">
                <span className=" block text-sm mb-1.5">Descriptions</span>
                <textarea
                  rows={10}
                  className={` flex items-center peer w-full transition duration-200 px-3.5 py-1 text-sm  rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-1000 [&amp;.is-focus]:border-gray-1000 [&amp;.is-focus]:ring-gray-1000   text-gray-700 focus:outline-none `}
                  placeholder={"Descriptions"}
                  id="descriptions"
                  name="descriptions"
                  onChange={handleChange}
                  value={data.descriptions}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductImage = ({ selectedFiles, setSelectedFiles }) => {
  // const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <div className="Image">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Upload new thumbnail image</h4>
          <p className="mt-2">Upload your product image gallery here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div className=" col-span-2">
            <MultiImageUploadr
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              label={"Images"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

