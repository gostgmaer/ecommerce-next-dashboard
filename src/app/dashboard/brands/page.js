import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import BrandTable from '@/components/pages/dashboard/brands/Table'
import Categorytable from '@/components/pages/dashboard/category/categoryTable'
import React from 'react'

const Page = () => {
  return (
    <Dashboardlayout>
     <BrandTable/>
    </Dashboardlayout>
  )
}

export default Page