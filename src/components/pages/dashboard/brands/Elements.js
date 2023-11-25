import SelectField from "@/components/global/fields/SelectField";
import TextField from "@/components/global/fields/TextField";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";

export const Summery = ({ handleChange, data, slug, handleSlug }) => {
  return (
    <div className="summary">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Add new Brands</h4>
          <p className="mt-2">Edit your Brands information from here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div>
            <TextField
              label={"Brand"}
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
              placeholder={"Slug"}
              additionalAttrs={undefined}
              value={slug}
              onChange={handleSlug}
              classes={undefined}
              icon={undefined}
              id={"slug"}
            />
          </div>
          <div className="col-span-2">
            <TextField
              label={"Tagline"}
              type={"text"}
              placeholder={"tagline"}
              additionalAttrs={undefined}
              value={data.tagline}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"tagline"}
            />
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
          <div className=" col-span-2">
            <h4>Contact Informations</h4>
          </div>
          <div>
            <TextField
              label={"Email"}
              type={"text"}
              placeholder={"Example"}
              additionalAttrs={undefined}
              value={data.email}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"email"}
            />
          </div>
          <div>
            <TextField
              label={"Phone Number"}
              type={"text"}
              placeholder={"+918637317273"}
              additionalAttrs={undefined}
              value={data.phone}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"phone"}
            />
          </div>
          <div>
            <TextField
              label={"Website"}
              type={"text"}
              placeholder={"https://website.com"}
              additionalAttrs={undefined}
              value={data.website}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"website"}
            />
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
