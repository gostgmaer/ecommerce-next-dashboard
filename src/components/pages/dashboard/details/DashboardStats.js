import { FiShoppingCart, FiDollarSign, FiUsers, FiCreditCard } from 'react-icons/fi'
import Link from 'next/link'

const stats = [
  {
    label: 'Orders',
    value: '5,312',
    change: '-2.29%',
    icon: <FiShoppingCart className="text-cyan-500" size={24} />,
    changeType: 'down',
    linkText: 'View Orders',
    linkHref: '#',
  },
  {
    label: 'Revenue',
    value: '$8,312',
    change: '+2.29%',
    icon: <FiDollarSign className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'View Earnings',
    linkHref: '#',
  },
  {
    label: 'Customer',
    value: '$15,312',
    change: '+5.16%',
    icon: <FiUsers className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'All Customer',
    linkHref: '#',
  },
  {
    label: 'Balance',
    value: '$35.64k',
    change: '',
    icon: <FiCreditCard className="text-cyan-500" size={24} />,
    changeType: '',
    linkText: 'Withdraw Money',
    linkHref: '#',
  },
]

export default function DashboardStats() {
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Ecommerce</h1>
        <Link href={'/dashboard/products/create'} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
