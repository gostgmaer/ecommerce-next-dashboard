"use client";
import { forgetPasswordValidation } from "@/utils/validation/validation";
import { useFormik } from "formik";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

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
            <span className="rizzui-input-container bg-white flex items-center peer w-full transition duration-200 px-4 py-2 h-12 rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-blue [&amp;.is-focus]:border-blue [&amp;.is-focus]:ring-blue text-sm">
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
          className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-8 py-2.5 text-base  rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-full text-white"
          type="submit"
          disabled={!formik.isValid}
        >
          <span>Reset Password</span>{" "}
         <MdKeyboardArrowRight/>
        </button>
      </div>
    </form>
  );
};

export default ForgetForm;
