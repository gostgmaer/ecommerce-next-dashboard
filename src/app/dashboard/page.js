import Dashboardlayout from "@/components/layout/dashboard/dashboard";
import DashboardStats from "@/components/pages/dashboard/details/DashboardStats";
import Recentordrs from "@/components/pages/dashboard/details/tables/recentOrders";
import { cookies } from "next/headers";
// import { useSession } from "next-auth/react";

export const metadata = {
  title: "Ecommerce Dashboard",
  description: "Created by kishor sarkar",
};

const Page = async (props) => {
  return (
    <Dashboardlayout>
      <DashboardStats />
      <Recentordrs />
    </Dashboardlayout>
  );
};

export default Page;
