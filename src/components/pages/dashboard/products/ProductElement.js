import SelectField from "@/components/global/fields/SelectField";
import TextField from "@/components/global/fields/TextField";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";

export const Summery = ({ handleChange, data, category }) => {
  console.log(category);

  return (
    <div className="summary">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Summary</h4>
          <p className="mt-2">
            Edit your product description and necessary information from here
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div>
            <TextField
              label={"Title"}
              type={"text"}
              placeholder={"Product title"}
              additionalAttrs={{ required: true }}
              value={data.title}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"title"}
            />
          </div>
          <div>
            <TextField
              label={"SKU"}
              type={"text"}
              placeholder={"HG98723867836"}
              additionalAttrs={{ required: true }}
              value={data.sku}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"sku"}
            />
          </div>
          <div>
            <SelectField
              options={[
                { id: 1, label: "physical", value: "physical" },
                { id: 2, label: "digital", value: "digital" },
              ]}
              value={data.productType}
              onChange={handleChange}
              id={"productType"}
              label={"label"}
              placeholder={undefined}
              heading={"Product Type"}
              datakey={"value"}
            />
          </div>
          <div>
            <SelectField
              options={category.results}
              value={data.categories}
              onChange={handleChange}
              id={"categories"}
              label={"name"}
              placeholder={undefined}
              heading={"Categories"}
              datakey={"name"}
            />
          </div>
          <div>
            <TextField
              label={"Slug"}
              type={"text"}
              placeholder={"product-slug"}
              additionalAttrs={{ required: true }}
              value={data.slug}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"slug"}
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
          <h4 className=" font-semibold text-xl">Upload new product images</h4>
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

export const Pricing = ({ handleChange, data }) => {
  return (
    <div className="Pricing">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Pricing</h4>
          <p className="mt-2">Add your product pricing here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div>
            <TextField
              label={"Price"}
              type={"number"}
              placeholder={"0.00"}
              additionalAttrs={undefined}
              value={data.price}
              onChange={handleChange}
              classes={undefined}
              icon={<FaDollarSign />}
              id={"price"}
            />
          </div>
          <div>
            <TextField
              label={"Cost Price"}
              type={"number"}
              placeholder={"0.00"}
              additionalAttrs={undefined}
              value={data.costPrice}
              onChange={handleChange}
              classes={undefined}
              icon={<FaDollarSign />}
              id={"costPrice"}
            />
          </div>
          <div>
            <TextField
              label={"Retail Price"}
              type={"number"}
              placeholder={"0.00"}
              additionalAttrs={undefined}
              value={data.retailPrice}
              onChange={handleChange}
              classes={undefined}
              icon={<FaDollarSign />}
              id={"retailPrice"}
            />
          </div>
          <div>
            <TextField
              label={"Sale Price"}
              type={"number"}
              placeholder={"0.00"}
              additionalAttrs={undefined}
              value={data.salePrice}
              onChange={handleChange}
              classes={undefined}
              icon={<FaDollarSign />}
              id={"salePrice"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Invantory = ({ handleChange, data }) => {
  const options = [
    { label: "Track inventory for this product", value: "yes" },
    { label: "Do not track inventory for this product", value: "no" },
    { label: "Track inventory by options", value: "by-options" },
  ];

  return (
    <div className="Invantory">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Inventory Tracking</h4>
          <p className="mt-2">Add your product inventory info here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div className="col-span-full grid gap-4">
            {options.map((item) => (
              <div className=" flex flex-col" key={item.value}>
                <label className="flex flex-row items-center">
                  <input
                    className=" disabled:bg-gray-50 disabled:border-gray-200 h-5 w-5 bg-transparent border border-gray-300 checked:!bg-gray-1000 focus:ring-gray-900/30 checked:!border-gray-1000 hover:enabled:border-gray-1000 dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
                    type="radio"
                    value={data.trackInventory}
                    onChange={handleChange}
                    id="trackInventory"
                    name="trackInventory"
                  />
                  <span className=" text-sm ml-1.5 rtl:mr-1.5">
                    {item.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <div>
            <TextField
              label={"Current Stock Level"}
              type={"text"}
              placeholder={"0"}
              additionalAttrs={undefined}
              value={data.currentStockLevel}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"currentStockLevel"}
            />
          </div>

          <div>
            <TextField
              label={"Low Stock Level"}
              type={"text"}
              placeholder={"0"}
              additionalAttrs={undefined}
              value={data.lowStockLevel}
              onChange={handleChange}
              classes={undefined}
              icon={undefined}
              id={"lowStockLevel"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Identifiers = ({ handleChange, data }) => {
  return (
    <div className="Identifiers">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Product Identifiers</h4>
          <p className="mt-2">Edit your product identifiers here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div>
            <TextField
              label={"Global Trade Item Number"}
              type={"text"}
              placeholder={"678ASD"}
              additionalAttrs={undefined}
              value={data.gtin}
              onChange={handleChange}
              classes={undefined}
              id={"gtin"}
              icon={undefined}
            />
          </div>
          <div>
            <TextField
              label={"Manufacturer Part Number"}
              type={"text"}
              placeholder={"1459894"}
              additionalAttrs={undefined}
              value={data.manufacturerPartNumber}
              onChange={handleChange}
              classes={undefined}
              id={"manufacturerPartNumber"}
              icon={undefined}
            />
          </div>
          <div>
            <TextField
              label={"Brand Name"}
              type={"text"}
              placeholder={"Brand"}
              additionalAttrs={undefined}
              value={data.brandName}
              onChange={handleChange}
              classes={undefined}
              id={"brandName"}
              icon={undefined}
            />
          </div>
          <div>
            <TextField
              label={"Product UPC/EAN"}
              type={"text"}
              placeholder={"14572454"}
              additionalAttrs={undefined}
              value={data.productUPCEAN}
              onChange={handleChange}
              classes={undefined}
              id={"productUPCEAN"}
              icon={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SEOInfo = ({ handleChange, data }) => {
  return (
    <div className="seo">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Search Engine Optimization</h4>
          <p className="mt-2">Add your product&apos;s seo info here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div>
            <TextField
              label={"Page Title"}
              type={"text"}
              placeholder={"SEO title"}
              additionalAttrs={undefined}
              value={data.pageTitle}
              onChange={handleChange}
              classes={undefined}
              id={"pageTitle"}
              icon={undefined}
            />
          </div>
          <div>
            <TextField
              label={"Meta Keywords"}
              type={"text"}
              placeholder={"SEO Meta Keywords"}
              additionalAttrs={undefined}
              value={data.metaKeywords}
              onChange={handleChange}
              classes={undefined}
              id={"metaKeywords"}
              icon={undefined}
            />
          </div>
          <div>
            <TextField
              label={"Meta Description"}
              type={"text"}
              placeholder={"SEO Meta Description"}
              additionalAttrs={undefined}
              value={data.metaDescription}
              onChange={handleChange}
              classes={undefined}
              id={"metaDescription"}
              icon={undefined}
            />
          </div>
          <div>
            <TextField
              label={"Product URL"}
              type={"text"}
              placeholder={"URL"}
              additionalAttrs={undefined}
              value={data.productURL}
              onChange={handleChange}
              classes={undefined}
              id={"productURL"}
              icon={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductVariyant = (second) => {
  return (
    <div className="Variyant">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Variant Options</h4>
          <p className="mt-2">Add your product variants here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
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
    </div>
  );
};

export const ProductTags = ({ handleChange, tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const term = inputValue.trim();
      if (term) {
        if (term && !tags.includes(term)) {
          setTags([...tags, term]);
          setInputValue("");
          setErrorMessage("");
        } else {
          setErrorMessage("Duplicate Value not allow");
        }
      }
    } else {
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const term = inputValue.trim();
    if (term) {
      if (term && !tags.includes(term)) {
        setTags([...tags, term]);
        setInputValue("");
        setErrorMessage("");
      } else {
        setErrorMessage("Duplicate Value not allow");
      }
    }
  };

  const handleRemoveClick = (index) => {
    const updatedValues = [...tags];
    updatedValues.splice(index, 1);
  };

  return (
    <div className="tags">
      <div className="flex gap-4 p-6 pt-8">
        <div className="col-span-full @4xl:col-span-4 flex-1 w-[30%]">
          <h4 className=" font-semibold text-xl">Tags</h4>
          <p className="mt-2">Add your product&apos;s tag or category here</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[70%]">
          <div className="flex items-end gap-3">
            <TextField
              label={"Tags"}
              type={"text"}
              placeholder={"Tag"}
              additionalAttrs={{ onKeyDown: handleKeyDown }}
              value={inputValue}
              onChange={handleInputChange}
              classes={undefined}
              id={undefined}
              icon={undefined}
            />
            <button
              type="button"
              className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md  border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto h-10 "
              onClick={handleAdd}
            >
              {" "}
              Add
            </button>
          </div>

          <div className="col-span-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};
