"use client"
import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import { useAuthContext } from "@/context/authContext";
import React from "react";

const Page = () => {
  const {userId} = useAuthContext()

  return (
    <Dashboardlayout>
      <div>asdad</div>
    </Dashboardlayout>
  );
};

export default Page;
