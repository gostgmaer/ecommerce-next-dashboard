import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import CategoryForm from '@/components/pages/dashboard/category/CategoryForm'
import { baseurl } from '@/config/setting';
import { serverMethod } from '@/helper/serverCall/datafetch';
// import { getCategories } from '@/helper/serverCall/datafetch'
import React from 'react'

const Page = async (props) => {
  const results = await getRecord(props.params.cateID)
  
  return (
    <Dashboardlayout>
      <CategoryForm data={{ ...results }} initialValues={
      results.result.results
      } />
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
    `/categories/${id}`,
    params
  );
  const categories = await serverMethod(
    `/categories`,
    params
  );


  return { result, categories }

}