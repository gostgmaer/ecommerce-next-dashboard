"use client";
import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const route = useRouter();
  const { userId, user } = useAuthContext();

 
  useEffect(() => {
    if (!userId) {
      route.push("/auth/login");
    }
  }, [userId?.user_id]);

  return (
    <Dashboardlayout>
      <div>asdad</div>
    </Dashboardlayout>
  );
};

export default Page;
