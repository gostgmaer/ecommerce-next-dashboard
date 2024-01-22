// components/SelectField.js
import React from "react";

const SelectField = ({ options, value, onChange, id, datakey, label, placeholder, heading, additionalAttrs }) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={id} className=" block text-sm mb-1.5">
          {heading}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        name={id}

        id={id}
        className="block w-full placeholder:text-gray-600 px-2 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="" className="text-gray-400">{placeholder ? placeholder : "Select"}</option>
        {options?.map((option) => (
          <option
            key={option[datakey]}
            value={option[datakey]}
            className=" capitalize"
            {...additionalAttrs}
          >
            {option[label]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;


export const Select = ({ options, id, label, additionalAttrs, placeholder, optionkeys = { key: "", value: "" } }) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={id} className=" block text-sm mb-1.5">
          {label}
        </label>
      )}
      <select
        {...additionalAttrs}
        name={id}
        id={id}
        className="block w-full placeholder:text-gray-600 px-2 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="" className="text-gray-400">{placeholder ? placeholder : "Select"}</option>
        {options.map((option) => (
          <option
            key={option[optionkeys.key]}
            value={option[optionkeys.key]}
            className=" capitalize"
          >
            {option[optionkeys.value]}
          </option>
        ))}
      </select>
    </div>
  );
};
