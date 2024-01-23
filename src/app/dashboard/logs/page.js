import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import LogsTable from '@/components/pages/dashboard/logs/logsTable'
import { serverMethod } from '@/helper/serverCall/datafetch'
import React from 'react'

const Page = async (props) => {

  const logs = await getAllLogs(props.searchParams)


  return (
    <Dashboardlayout>
      <LogsTable data={{...logs}} />
    </Dashboardlayout>
  )
}

export default Page



export const getAllLogs = async (query) => {

  const params = {
    method: "get",
    header: {},
    query: { ...query },
  };
  const result = await serverMethod(
    `/logs`,
    params
  );
  return result
}