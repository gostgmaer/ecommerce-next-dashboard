"use client";
import { forgetPasswordValidation } from "@/utils/validation/validation";
import { useFormik } from "formik";
import React from "react";

const ForgetForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-5 text-black">
        <div className="rizzui-input-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-input-label block text-sm mb-1.5">
              Email
            </span>
            <span className="rizzui-input-container flex items-center peer w-full transition duration-200 px-4 py-2 h-12 rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-blue [&amp;.is-focus]:border-blue [&amp;.is-focus]:ring-blue text-sm">
              <input
                spellCheck="false"
                placeholder="Enter your email"
                className="rizzui-input-field w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0"
                type="email"
                name="username"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </span>
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <button
          className="rizzui-button inline-flex font-medium items-center bg-blue-500 justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-5 py-2 text-base h-12 rounded-md border border-transparent focus-visible:ring-offset-2 bg-blue hover:enabled:bg-blue-500 focus-visible:ring-blue/30 text-white w-full"
          type="submit"
          disabled={!formik.isValid}
        >
          <span>Submit</span>{" "}
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 256 256"
            className="ms-2 mt-0.5 h-5 w-5"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ForgetForm;
