import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import Categorytable from '@/components/pages/dashboard/category/categoryTable'
import React from 'react'

const Page = () => {
  return (
    <Dashboardlayout>
     <Categorytable/>
    </Dashboardlayout>
  )
}

export default Page