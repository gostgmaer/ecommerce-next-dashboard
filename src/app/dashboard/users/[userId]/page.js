import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import { serverMethod } from '@/helper/serverCall/datafetch'
import React from 'react'

const Page = async (props) => {

  const user = await getRecord(props.params.userId)
  

  return (
    <Dashboardlayout>
      <div></div>
    </Dashboardlayout>
  )
}

export default Page



export const getRecord = async (id) => {

  const params = {
    method: "get",
    header: {},
    query: {}
  };
  const result = await serverMethod(
    `/users/${id}`,
    params
  );
  return result

}