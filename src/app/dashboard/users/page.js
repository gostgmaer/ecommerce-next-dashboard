import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import UserTable from '@/components/pages/dashboard/users/UserTable'
import React from 'react'

const Page = () => {
  return (
    <Dashboardlayout>
   <UserTable/>
    </Dashboardlayout>
  )
}

export default Page