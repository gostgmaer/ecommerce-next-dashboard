import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import Categorytable from '@/components/pages/dashboard/category/categoryTable'
import { serverMethod } from '@/helper/serverCall/datafetch'
import React from 'react'

const Page = async (props) => {

  const result = await getAllRecord(props.searchParams)


  return (
    <Dashboardlayout>
      <Categorytable data={result} />
    </Dashboardlayout>
  )
}

export default Page


export const getAllRecord = async (query) => {

  const params = {
    method: "get",
    header: {},
    query: { ...query },
  };
  const result = await serverMethod(
    `/categories`,
    params
  );


  return result

}