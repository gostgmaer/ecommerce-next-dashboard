"use client";
import React, { useState, useEffect } from "react";
import Heading from "./heading";
import Input from "@/components/global/fields/input";
import { useFormik } from "formik";
import { Country, State, City } from "country-state-city";
import { Switch } from "@headlessui/react";
import { Select } from "@/components/global/fields/SelectField";
import timezones from "timezones-list";
import { post } from "@/lib/http";

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

// Example config object (replace with your actual fetch logic)
const configObject = {
  siteName: "My Store",
  name: "My E-Commerce Platform",
  contactInfo: {
    email: "support@example.com",
    phone: "+1234567890",
    address: {
      street: "123 Main St",
      city: "Kolkata",
      state: "West Bengal",
      zipCode: "700001",
      country: "India",
    },
  },
  branding: {
    logo: "https://example.com/logo.png",
    favicon: "https://example.com/favicon.ico",
    themeColor: "#ff6600",
  },
  shippingOptions: ["Standard Shipping", "Express Shipping"],
  emailTemplates: {
    orderConfirmation: "<h1>Thank you for your order!</h1>",
    passwordReset: "<p>Click here to reset your password.</p>",
  },
  seo: {
    title: "Best Online Store",
    description: "Shop the best products online.",
    keywords: ["ecommerce", "shop", "online store"],
  },
  analytics: {
    googleAnalyticsID: "UA-12345678-1",
    facebookPixelID: "123456789012345",
  },
  currency: "INR",
  taxRate: 18,
  logo: "https://example.com/logo.png",
  favicon: "https://example.com/favicon.ico",
  paymentMethods: ["Credit Card", "PayPal", "Cash on Delivery"],
  shippingMethods: ["Standard Shipping", "Express Shipping"],
  orderConfirmationEmailTemplate: "<h1>Order Confirmed</h1>",
  passwordResetEmailTemplate: "<p>Reset your password here.</p>",
  smtpHost: "smtp.example.com",
  smtpPort: 587,
  smtpUser: "user@example.com",
  smtpPassword: "securepassword",
  socialMediaLinks: {
    facebook: "https://facebook.com/mystore",
    twitter: "https://twitter.com/mystore",
    instagram: "https://instagram.com/mystore",
    linkedin: "https://linkedin.com/company/mystore",
    youtube: "https://youtube.com/mystore",
    pinterest: "https://pinterest.com/mystore",
    tiktok: "https://tiktok.com/@mystore",
  },
  isLive: true,
  maintenanceMode: false,
  featuredCategories: ["60f7c0f5b4dcbf001c8e4b1a", "60f7c0f5b4dcbf001c8e4b1b"],
  currencySymbol: "₹",
  minOrderAmount: 100,
  maxOrderAmount: 10000,
  loyaltyProgram: {
    enabled: true,
    pointsPerDollar: 2,
  },
  returnPolicy: "Returns accepted within 30 days.",
  privacyPolicy: "We respect your privacy.",
  termsOfService: "Use of this site is subject to terms.",
};

const initialValues = {
  shop_name: configObject.siteName,
  company: configObject.name,
  address: configObject.contactInfo.address.street,
  city: configObject.contactInfo.address.city,
  state: configObject.contactInfo.address.state,
  country: configObject.contactInfo.address.country,
  pincode: configObject.contactInfo.address.zipCode,
  email: configObject.contactInfo.email,
  phone: configObject.contactInfo.phone,
  currency: configObject.currency,
  tax_percentage: configObject.taxRate,
  no_of_image: 5,
  timezone: "",
  date_format: "",
  time_format: "",
  description: "",
  website: "",
  display_price_tax: true,
  max_login: 3,
  allow_cod: configObject.paymentMethods?.includes("Cash on Delivery") ?? true,
  // Additional fields from the object
  logo: configObject.branding.logo,
  favicon: configObject.branding.favicon,
  themeColor: configObject.branding.themeColor,
  shippingOptions: configObject.shippingOptions,
  emailTemplates: configObject.emailTemplates,
  seo_title: configObject.seo.title,
  seo_description: configObject.seo.description,
  seo_keywords: configObject.seo.keywords.join(", "),
  googleAnalyticsID: configObject.analytics.googleAnalyticsID,
  facebookPixelID: configObject.analytics.facebookPixelID,
  paymentMethods: configObject.paymentMethods,
  shippingMethods: configObject.shippingMethods,
  orderConfirmationEmailTemplate: configObject.orderConfirmationEmailTemplate,
  passwordResetEmailTemplate: configObject.passwordResetEmailTemplate,
  smtpHost: configObject.smtpHost,
  smtpPort: configObject.smtpPort,
  smtpUser: configObject.smtpUser,
  smtpPassword: configObject.smtpPassword,
  socialMediaLinks: configObject.socialMediaLinks,
  isLive: configObject.isLive,
  maintenanceMode: configObject.maintenanceMode,
  featuredCategories: configObject.featuredCategories,
  currencySymbol: configObject.currencySymbol,
  minOrderAmount: configObject.minOrderAmount,
  maxOrderAmount: configObject.maxOrderAmount,
  loyaltyProgramEnabled: configObject.loyaltyProgram.enabled,
  pointsPerDollar: configObject.loyaltyProgram.pointsPerDollar,
  returnPolicy: configObject.returnPolicy,
  privacyPolicy: configObject.privacyPolicy,
  termsOfService: configObject.termsOfService,
};

const Blocksetting = () => {
  const [selectedCountry, setSelectedCountry] = useState(initialValues.country || "");
  const [selectedState, setSelectedState] = useState(initialValues.state || "");

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      // Submit logic here
      console.log(values);
      // await post("/global/add", values);
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

  useEffect(() => {
    setSelectedCountry(formik.values.country);
    setSelectedState(formik.values.state);
  }, [formik.values.country, formik.values.state]);

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
          {/* Basic Fields */}
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
            />
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
              searchable={false}
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
                placeholder: "3",
                min: 1,
              }}
              id={"max_login"}
            />
          </div>
          {/* Branding */}
          <div className="col-span-1">
            <Input
              label="Logo URL"
              type="url"
              additionalAttrs={{
                ...formik.getFieldProps("logo"),
                placeholder: "https://example.com/logo.png",
              }}
              id="logo"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Favicon URL"
              type="url"
              additionalAttrs={{
                ...formik.getFieldProps("favicon"),
                placeholder: "https://example.com/favicon.ico",
              }}
              id="favicon"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Theme Color"
              type="text"
              additionalAttrs={{
                ...formik.getFieldProps("themeColor"),
                placeholder: "#ff6600",
              }}
              id="themeColor"
            />
          </div>
          {/* SEO */}
          <div className="col-span-1">
            <Input
              label="SEO Title"
              type="text"
              additionalAttrs={{
                ...formik.getFieldProps("seo_title"),
                placeholder: "Best Online Store",
              }}
              id="seo_title"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="SEO Description"
              type="text"
              additionalAttrs={{
                ...formik.getFieldProps("seo_description"),
                placeholder: "Shop the best products online.",
              }}
              id="seo_description"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="SEO Keywords"
              type="text"
              additionalAttrs={{
                ...formik.getFieldProps("seo_keywords"),
                placeholder: "ecommerce, shop, online store",
              }}
              id="seo_keywords"
            />
          </div>
          {/* Analytics */}
          <div className="col-span-1">
            <Input
              label="Google Analytics ID"
              type="text"
              additionalAttrs={{
                ...formik.getFieldProps("googleAnalyticsID"),
                placeholder: "UA-12345678-1",
              }}
              id="googleAnalyticsID"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Facebook Pixel ID"
              type="text"
              additionalAttrs={{
                ...formik.getFieldProps("facebookPixelID"),
                placeholder: "123456789012345",
              }}
              id="facebookPixelID"
            />
          </div>
          {/* Social Media Links */}
          <div className="col-span-1">
            <Input
              label="Facebook Link"
              type="url"
              additionalAttrs={{
                value: formik.values.socialMediaLinks?.facebook || "",
                onChange: (e) =>
                  formik.setFieldValue("socialMediaLinks", {
                    ...formik.values.socialMediaLinks,
                    facebook: e.target.value,
                  }),
                placeholder: "https://facebook.com/mystore",
              }}
              id="socialMediaLinks.facebook"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Twitter Link"
              type="url"
              additionalAttrs={{
                value: formik.values.socialMediaLinks?.twitter || "",
                onChange: (e) =>
                  formik.setFieldValue("socialMediaLinks", {
                    ...formik.values.socialMediaLinks,
                    twitter: e.target.value,
                  }),
                placeholder: "https://twitter.com/mystore",
              }}
              id="socialMediaLinks.twitter"
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Instagram Link"
              type="url"
              additionalAttrs={{
                value: formik.values.socialMediaLinks?.instagram || "",
                onChange: (e) =>
                  formik.setFieldValue("socialMediaLinks", {
                    ...formik.values.socialMediaLinks,
                    instagram: e.target.value,
                  }),
                placeholder: "https://instagram.com/mystore",
              }}
              id="socialMediaLinks.instagram"
            />
          </div>
          {/* Add more social links as needed */}
          {/* Policies */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Return Policy</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              {...formik.getFieldProps("returnPolicy")}
              placeholder="Returns accepted within 30 days."
              id="returnPolicy"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Privacy Policy</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              {...formik.getFieldProps("privacyPolicy")}
              placeholder="We respect your privacy."
              id="privacyPolicy"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Terms of Service</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              {...formik.getFieldProps("termsOfService")}
              placeholder="Use of this site is subject to terms."
              id="termsOfService"
            />
          </div>
          {/* Switches */}
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
                placeholder: "18",
                min: 0,
                max: 100,
                step: 0.01,
              }}
              id={"tax_percentage"}
            />
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
