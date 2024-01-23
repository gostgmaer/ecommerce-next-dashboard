import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import BrandTable from '@/components/pages/dashboard/brands/Table'
import Categorytable from '@/components/pages/dashboard/category/categoryTable'
import { serverMethod } from '@/helper/serverCall/datafetch'
import React from 'react'

const Page = async (props) => {

  const brands = await getAllRecord(props.searchParams)


  return (
    <Dashboardlayout>
      <BrandTable data={brands} />
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
    `/brands`,
    params
  );


  return result

}