import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import Categorytable from '@/components/pages/dashboard/category/categoryTable'
import { serverMethod } from '@/helper/serverCall/datafetch'
import CategoryServices from '@/helper/services/CategoryServices'
import React from 'react'

const Page = async (props) => {

  const result = await CategoryServices.getCategories(props.searchParams)


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