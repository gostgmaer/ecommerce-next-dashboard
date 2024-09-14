import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ label, type, additionalAttrs, classes, icon, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col w-full mb-1">
      <div className="block">
       { label && <label className=" block text-sm capitalize font-medium text-gray-600  mb-1">
          {label}  {additionalAttrs.required&&<span className=" text-red-500 align-sub font-bold text-lg">*</span>} :{" "}
        </label>}
        <div
          className={`flex items-center peer  w-full transition duration-200  rounded-md bg-transparent  ${icon && "border pl-3.5 h-10 leading-[40px]"
            }  ${type === "password" && "border h-10 leading-[40px]"}`}
        >
          {icon && <button className="pr-3.5">{icon}</button>}
          <input
            className={` rounded w-full read-only:bg-gray-100 read-only:border-gray-200  leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500   border px-3.5 h-10 ${type === "password" && "pr-0"
              }  ${classes && classes}`}
            type={showPassword && type === "password" ? "text" : type}
            name={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            id={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            {...additionalAttrs} // Spread additional attributes/props
          />
          {type === "password" && (
            <>
              {" "}
              <button
                className="px-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash
                    className=" w-5 h-5"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="w-5 h-5"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
