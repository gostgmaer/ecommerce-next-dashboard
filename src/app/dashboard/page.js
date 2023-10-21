"use client"
import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import { useAuthContext } from "@/context/authContext";
import React from "react";

const Page = () => {
  const {userId,user} = useAuthContext()

  console.log(userId,user);
  return (
    <Dashboardlayout>
      <div>asdad</div>
    </Dashboardlayout>
  );
};

export default Page;
