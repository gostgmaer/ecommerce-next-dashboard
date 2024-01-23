import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import { serverMethod } from '@/helper/serverCall/datafetch'
import { cookies } from 'next/headers'


const Page = async (props) => {


  const userData = await getProfile()
  

  return (
    <Dashboardlayout>
      <div></div>
    </Dashboardlayout>
  )
}

export default Page




export const getProfile = async () => {

  const cookieStore = cookies()
  const tokendata = "Bearer " + cookieStore.get("headerPayload").value + "." + cookieStore.get("signature").value;

  const params = {
    method: "get",
    header: {
      Authorization: tokendata,
    },
    query: {}
  };
  const result = await serverMethod(
    `/user/auth/profile`,
    params
  );


  return result

}