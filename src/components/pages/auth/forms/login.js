"use client";
import PasswordField from "@/components/global/fields/PasswordField";
import React, { useState } from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/utils/validation/validation";
import { useRouter } from "next/navigation";


const LoginForm = () => {

  const route = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      route.push('/dashboard')
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
                onChange={formik.handleChange}
                value={formik.values.email}
                className="rizzui-input-field w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0"
                type="email"
                name="email"
                
              />
            </span>
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-password-label block text-sm mb-1.5">
              Password
            </span>
          </label>
          <PasswordField
            placeholder="your password"
            name="password"
            value={formik.values.password}
            handleChange={formik.handleChange}
          />
           {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <div className="flex items-center justify-between pb-2">
          <div className="rizzui-checkbox-root flex flex-col [&amp;>label>span]:font-medium">
            <label className="rizzui-checkbox-container flex flex-row items-center">
              <span className="relative leading-none">
                <input
                  className="rizzui-checkbox-input peer disabled:bg-gray-50 disabled:border-gray-200 h-5 w-5 rounded border-0 bg-blue-lighter/70 hover:enabled:bg-blue-lighter/90 focus:ring-blue/30 checked:!bg-blue-dark"
                  type="checkbox"
                  name="remember"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="rizzui-checkbox-icon peer-checked:opacity-100 absolute opacity-0 text-white top-0 left-0 h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <span className="rizzui-checkbox-label text-sm ml-1.5 rtl:mr-1.5">
                Remember Me
              </span>
            </label>
          </div>
          <a
            className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
            href="/auth/forgot-password"
          >
            Forget Password?
          </a>
        </div>
        <button
          className="rizzui-button disabled:bg-blue-200 inline-flex font-medium items-center bg-blue-500 justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-5 py-2 text-base h-12 rounded-md border border-transparent focus-visible:ring-offset-2 bg-blue hover:enabled:bg-blue-500 focus-visible:ring-blue/30 text-white w-full"
          type="submit"
          disabled={!formik.isValid}
        >
          <span>Sign in</span>{" "}
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

export default LoginForm;
