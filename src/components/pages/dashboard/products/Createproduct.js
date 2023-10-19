"use client";
import React, { useState } from "react";
import TopStepper from "../TopStepper";
import Heading from "../heading";
import TextField from "@/components/global/fields/TextField";
import SelectField from "@/components/global/fields/SelectField";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";
import { FaDollarSign } from "react-icons/fa";
import {
  Identifiers,
  Invantory,
  Pricing,
  ProductImage,
  ProductTags,
  ProductVariyant,
  SEOInfo,
  Summery,
} from "./ProductElement";
import { useParams } from "next/navigation";

const Createproduct = () => {
  const params = useParams();
  const productID = params["productID"];
  console.log(productID);

  return (
    <div>
      <Heading
        ishow={false}
        data={undefined}
        label={"Create Product"}
        btn={"Product"}
      />
      <TopStepper />
      <div>
        <CreateProductForm />
      </div>
    </div>
  );
};

export default Createproduct;

const CreateProductForm = (second) => {
  return (
    <form className="[&amp;_label.block>span]:font-medium">
      <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <Summery />
        <ProductImage />
        <Pricing />
        <Invantory />
        <Identifiers />

        <SEOInfo />
        <ProductVariyant />

        <ProductTags />
      </div>
      <div className="sticky bottom-0 left-0 right-0 py-4 p-6 bg-white  flex items-center justify-end gap-4 border-t ">
        <button
          className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 min-w-max @xl:w-auto"
          type="submit"
        >
          Save as Draft
        </button>
        <button
          className=" text-white inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-max @xl:w-auto "
          type="submit"
        >
          Create Product
        </button>
      </div>
    </form>
  );
};
