import Dashboardlayout from '@/components/layout/dashboard/dashboard'
import ProductForm from '@/components/pages/dashboard/products/ProductForm'
import React from 'react'

const Page = () => {
  return (
    <Dashboardlayout>
     <ProductForm data={undefined} />
    </Dashboardlayout>
  )
}

export default Page