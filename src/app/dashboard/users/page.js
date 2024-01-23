import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import UserTable from '@/components/pages/dashboard/users/UserTable'
import { serverMethod } from '@/helper/serverCall/datafetch'
import { cookies } from 'next/headers'
import React from 'react'

const Page = async (props) => {

  const users = await getAllRecord(props.searchParams)

 console.log(users);

  return (
    <Dashboardlayout>
      <UserTable users={users} />
    </Dashboardlayout>
  )
}

export default Page





export const getAllRecord = async (query) => {

  const cookieStore = cookies()
  const tokendata = "Bearer " + cookieStore.get("headerPayload").value + "." + cookieStore.get("signature").value;


  const params = {
    method: "get",
    header: {
      Authorization: tokendata,
    },
    query: { ...query },
  };
  const result = await serverMethod(
    `/users`,
    params
  );
  return result
}