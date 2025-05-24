import { FiShoppingCart, FiDollarSign, FiUsers, FiCreditCard, FiMessageCircle } from 'react-icons/fi'
import Link from 'next/link'

const stats = [
  {
    label: 'Orders',
    value: '1,245',
    change: '+3.2%',
    icon: <FiShoppingCart className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'View Orders',
    linkHref: '/dashboard/orders',
  },
  {
    label: 'Revenue',
    value: '$18,420',
    change: '+5.8%',
    icon: <FiDollarSign className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'View Revenue',
    linkHref: '/dashboard/revenue',
  },
  {
    label: 'Customers',
    value: '3,112',
    change: '+1.9%',
    icon: <FiUsers className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'All Customers',
    linkHref: '/dashboard/customers',
  },
  {
    label: 'Out of Stock',
    value: '7',
    change: '-12.5%',
    icon: <FiShoppingCart className="text-cyan-500" size={24} />,
    changeType: 'down',
    linkText: 'View Products',
    linkHref: '/dashboard/products?filter=out-of-stock',
  },
  {
    label: 'Total Sales',
    value: '2,340',
    change: '+4.1%',
    icon: <FiMessageCircle className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'View Sales',
    linkHref: '/dashboard/sales',
  },
  {
    label: 'Balance',
    value: '$7,890',
    change: '+0.7%',
    icon: <FiCreditCard className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'Withdraw Money',
    linkHref: '/dashboard/withdraw',
  },
]
export default function DashboardStats() {
  return (
    <div className="bg-gray-100 p-6 mb-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Ecommerce</h1>
        <Link href={'/dashboard/products/create'} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded shadow flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                {stat.change && (
                  <p className={`text-sm ${stat.changeType === 'down' ? 'text-red-500' : 'text-green-500'}`}>
                    {stat.changeType === 'down' ? '↓' : '↑'} {stat.change}
                  </p>
                )}
              </div>
              <div>{stat.icon}</div>
            </div>
            <Link href={stat.linkHref} className="mt-4 text-sm text-indigo-600 hover:underline">
              {stat.linkText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
