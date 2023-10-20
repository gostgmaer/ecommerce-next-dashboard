import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import LogsTable from '@/components/pages/dashboard/logs/logsTable'
import React from 'react'

const Page = () => {
  return (
    <Dashboardlayout>
     <LogsTable/>
    </Dashboardlayout>
  )
}

export default Page