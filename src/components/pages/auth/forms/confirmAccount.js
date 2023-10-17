import Link from "next/link";
import React from "react";

const ConfirmForm = () => {
  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Account Confirmed!
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Thank you for confirming your account. You can now access our
          services.
        </p>
       
      </div>
    </div>
  );
};

export default ConfirmForm;
