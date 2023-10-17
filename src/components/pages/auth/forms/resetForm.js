"use client";
import PasswordField from "@/components/global/fields/PasswordField";
import { resetPasswordValidation } from "@/utils/validation/validation";
import { useFormik } from "formik";
import React from "react";

const ResetForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-5 text-black">
        <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-password-label block text-sm mb-1.5">
              Password
            </span>
            <PasswordField
              placeholder="your password"
              name="password"
              value={formik.values.password}
              handleChange={formik.handleChange}
            />
          </label>
        </div>
        <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block" htmlFor="confirm-password">
            <span className="rizzui-password-label block text-sm mb-1.5">
              Confirm Password
            </span>
            <PasswordField
              placeholder="confirm password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              handleChange={formik.handleChange}
            />
          </label>
        </div>

        <button
          className="rizzui-button inline-flex font-medium items-center bg-blue-500 justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-5 py-2 text-base h-12 rounded-md border border-transparent focus-visible:ring-offset-2 bg-blue hover:enabled:bg-blue-500 focus-visible:ring-blue/30 text-white w-full"
          type="submit"
          disabled={!formik.isValid}
        >
          <span>Confirm Password</span>{" "}
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

export default ResetForm;
