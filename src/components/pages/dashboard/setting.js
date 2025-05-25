"use client";
import React, { useState } from "react";
import Heading from "./heading";
import Input from "@/components/global/fields/input";
import { useFormik } from "formik";
import { Country, State, City } from "country-state-city";
import { Switch } from "@headlessui/react";
import { Select } from "@/components/global/fields/SelectField";
import timezones from "timezones-list";
import { post } from "@/lib/http";

// Fix: Correct currency options and initial values, fix typos, and ensure form submission works

const dateFormats = [
  { key: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { key: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { key: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  { key: "MMM DD, YYYY", value: "MMM DD, YYYY" },
  { key: "MMMM DD, YYYY", value: "MMMM DD, YYYY" },
  { key: "DD MMMM YYYY", value: "DD MMMM YYYY" },
  { key: "YYYY/MM/DD", value: "YYYY/MM/DD" },
  { key: "DD-MM-YYYY", value: "DD-MM-YYYY" },
  { key: "MM-DD-YYYY", value: "MM-DD-YYYY" },
  { key: "dddd, MMMM DD, YYYY", value: "dddd, MMMM DD, YYYY" },
  { key: "Do MMMM YYYY", value: "Do MMMM YYYY" },
  { key: "YYYY.MM.DD", value: "YYYY.MM.DD" },
  { key: "MM/DD/YY", value: "MM/DD/YY" },
];

// Helper to get unique currencies from countries
const getCurrencyOptions = () => {
  const countries = Country.getAllCountries();
  const seen = new Set();
  return countries
    .filter((c) => c.currency && !seen.has(c.currency) && seen.add(c.currency))
    .map((c) => ({
      key: c.currency,
      value: c.currency,
    }));
};

const initialValues = {
  no_of_image: "",
  currency: "",
  timezone: "",
  date_format: "",
  time_format: "",
  shop_name: "",
  description: "",
  company: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  email: "",
  phone: "",
  website: "",
  tax_percentage: "",
  display_price_tax: true,
  max_login: "",
  allow_cod: true,
};

const Blocksetting = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      // You can handle form submission here
      console.log(values);
      
     const response = post("/global/add", values);
      // resetForm();
    },
  });

  // Keep country/state/city selection in sync
  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    formik.setFieldValue("country", value);
    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    formik.setFieldValue("state", value);
    formik.setFieldValue("city", "");
  };

  return (
    <div className="bg-white max-w-7xl m-auto rounded-xl dark:bg-gray-700 p-5">
      <Heading
        ishow={false}
        data={undefined}
        label={"Setting"}
        btn={undefined}
        url={"/dashboard/setting"}
        exportevent={undefined}
      />
      <form
        className="mx-auto  grid rounded-lg"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-2 col-span-full ">
          <div className="col-span-1">
            <Input
              label={"Number of images per product"}
              type={"number"}
              additionalAttrs={{
                ...formik.getFieldProps("no_of_image"),
                placeholder: "5",
                min: 1,
              }}
              id={"no_of_image"}
              classes={undefined}
              icon={undefined}
            />
            {formik.errors.no_of_image && formik.touched.no_of_image && (
              <div className="text-red-500 text-sm">
                {formik.errors.no_of_image}
              </div>
            )}
          </div>
          <div className="col-span-1">
            <Select
              label={"Default currency"}
              additionalAttrs={{
                ...formik.getFieldProps("currency"),
              }}
              id={"currency"}
              options={getCurrencyOptions()}
              optionkeys={{ key: "key", value: "value" }}
              placeholder={"Select"}
            />
          </div>
          <div className="col-span-1">
            <Select
              label={"Default time zone"}
              additionalAttrs={{
                ...formik.getFieldProps("timezone"),
              }}
              id={"timezone"}
              options={timezones}
              searchable={true}
              optionkeys={{ key: "tzCode", value: "label" }}
              placeholder={"Select"}
            />
          </div>
          <div className="col-span-1">
            <Select
              label={"Default Date Format"}
              additionalAttrs={{
                ...formik.getFieldProps("date_format"),
              }}
              id={"date_format"}
              options={dateFormats}
              optionkeys={{ key: "key", value: "value" }}
              placeholder={"DD/MM/YYYY"}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Shop name"}
              type={"text"}
              additionalAttrs={{
                ...formik.getFieldProps("shop_name"),
                placeholder: "Shop",
              }}
              id={"shop_name"}
              classes={undefined}
              icon={undefined}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Company Name"}
              type={"text"}
              additionalAttrs={{
                ...formik.getFieldProps("company"),
                placeholder: "Company",
              }}
              id={"company"}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Address"}
              type={"text"}
              additionalAttrs={{
                ...formik.getFieldProps("address"),
                placeholder: "5th suite",
              }}
              id={"address"}
            />
          </div>
          <div className="col-span-1">
            <Select
              label={"Country"}
              additionalAttrs={{
                ...formik.getFieldProps("country"),
                onChange: handleCountryChange,
                value: formik.values.country,
              }}
              id={"country"}
              options={Country.getAllCountries()}
              optionkeys={{ key: "isoCode", value: "name" }}
              placeholder={"Select"}
            />
          </div>
          <div className="col-span-1">
            <Select
              label={"State"}
              additionalAttrs={{
                ...formik.getFieldProps("state"),
                onChange: handleStateChange,
                value: formik.values.state,
              }}
              id={"state"}
              options={
                formik.values.country
                  ? State.getStatesOfCountry(formik.values.country)
                  : []
              }
              optionkeys={{ key: "isoCode", value: "name" }}
              placeholder={"Select"}
            />
          </div>
          <div className="col-span-1">
            <Select
              label={"City"}
              additionalAttrs={{
                ...formik.getFieldProps("city"),
                value: formik.values.city,
              }}
              id={"city"}
              options={
                formik.values.country && formik.values.state
                  ? City.getCitiesOfState(
                      formik.values.country,
                      formik.values.state
                    )
                  : []
              }
              optionkeys={{ key: "name", value: "name" }}
              placeholder={"Select"}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Post Code"}
              type={"text"}
              additionalAttrs={{
                ...formik.getFieldProps("pincode"),
                placeholder: "121235",
              }}
              id={"pincode"}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Contact"}
              type={"text"}
              additionalAttrs={{
                ...formik.getFieldProps("phone"),
                placeholder: "1111111111",
              }}
              id={"phone"}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Email"}
              type={"email"}
              additionalAttrs={{
                ...formik.getFieldProps("email"),
                placeholder: "info@mail.com",
              }}
              id={"email"}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Web site"}
              type={"url"}
              additionalAttrs={{
                ...formik.getFieldProps("website"),
                placeholder: "https://web.com",
              }}
              id={"website"}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={"Maximum Login Try"}
              type={"number"}
              additionalAttrs={{
                ...formik.getFieldProps("max_login"),
                placeholder: "2",
                min: 1,
              }}
              id={"max_login"}
            />
          </div>
          <div className="col-span-full">
            <Switch.Group>
              <div className="flex flex-col w-full mb-1">
                <div className="block">
                  <Switch.Label className=" block text-sm capitalize font-medium text-gray-600  mb-1">
                    Enable Cash On Delivery
                  </Switch.Label>
                  <div className="flex items-center peer  w-full transition duration-200  rounded-md bg-transparent  false">
                    <Switch
                      checked={formik.values.allow_cod}
                      onChange={(value) =>
                        formik.setFieldValue("allow_cod", value)
                      }
                      className={`${
                        formik.values.allow_cod ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          formik.values.allow_cod
                            ? "translate-x-6"
                            : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </Switch.Group>
          </div>
          <div className="col-span-full">
            <hr />
          </div>
          <div className="col-span-full grid grid-cols-2">
            <Switch.Group>
              <div className="flex flex-col w-full mb-1">
                <div className="block">
                  <Switch.Label className=" block text-sm capitalize font-medium text-gray-600  mb-1">
                    Enable Product Price include Tax
                  </Switch.Label>
                  <div className="flex items-center peer  w-full transition duration-200  rounded-md bg-transparent  false">
                    <Switch
                      checked={formik.values.display_price_tax}
                      onChange={(value) =>
                        formik.setFieldValue("display_price_tax", value)
                      }
                      className={`${
                        formik.values.display_price_tax
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          formik.values.display_price_tax
                            ? "translate-x-6"
                            : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </Switch.Group>
          </div>
          <div className="col-span-1">
            <Input
              label={"Tax Percentage (%)"}
              type={"number"}
              additionalAttrs={{
                ...formik.getFieldProps("tax_percentage"),
                placeholder: "5",
                min: 0,
                max: 100,
                step: 0.01,
              }}
              id={"tax_percentage"}
            />
            {formik.errors.tax_percentage && formik.touched.tax_percentage && (
              <div className="text-red-500 text-sm">
                {formik.errors.tax_percentage}
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 left-0 right-0 py-4 p-6 bg-white  flex items-center justify-end gap-4 border-t ">
          <button
            className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 min-w-max @xl:w-auto"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Blocksetting;
