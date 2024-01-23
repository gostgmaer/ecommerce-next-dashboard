import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import BrandForm from '@/components/pages/dashboard/brands/Form'
import { serverMethod } from '@/helper/serverCall/datafetch'
import React from 'react'

const Page = async (props) => {

  const data = await getRecord(props.params.id)


  return (
    <Dashboardlayout>
      <BrandForm initialValues={data.results} />
    </Dashboardlayout>
  )
}

export default Page


export const getRecord = async (id)=>{

  const params = {
    method: "get",
    header: {},
    query: {}
  };
  const product = await serverMethod(
    `/brands/${id}`,
    params
  );



return product

}