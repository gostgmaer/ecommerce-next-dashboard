import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import { serverMethod } from '@/helper/serverCall/datafetch'
import React from 'react'

const Page = async (props) => {

  // //console.log(props);
  const result = await getRecord(props.params.productID)
// //console.log(result);
  return (
    <Dashboardlayout>
      <div></div>
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
  const result = await serverMethod(
    `/products/${id}`,
    params
  );


return result

}