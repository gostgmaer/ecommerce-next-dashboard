import { FiShoppingCart, FiDollarSign, FiUsers, FiCreditCard, FiMessageCircle } from 'react-icons/fi'
import Link from 'next/link'

const stats = [

  // {
  //   label: 'Revenue',
  //   value: '$18,420',
  //   change: '+5.8%',
  //   icon: <FiDollarSign className="text-cyan-500" size={24} />,
  //   changeType: 'up',
  //   linkText: 'View Revenue',
  //   linkHref: '/dashboard/revenue',
  // },
  {
    label: 'Employee',
    value: '253',
    change: '+1.9%',
    icon: <FiUsers className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'All Users',
    linkHref: '/dashboard/user',
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
    label: 'Total Products',
    value: '1,245',
    change: '+3.2%',
    icon: <FiShoppingCart className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'View Products',
    linkHref: '/dashboard/products',
  },
  {
    label: 'Out of Stock',
    value: '77  ',
    change: '-12.5%',
    icon: <FiShoppingCart className="text-cyan-500" size={24} />,
    changeType: 'down',
    linkText: 'View Products',
    linkHref: '/dashboard/products?filter=out-of-stock',
  },
  // {
  //   label: 'Total Sales',
  //   value: '2,340',
  //   change: '+4.1%',
  //   icon: <FiMessageCircle className="text-cyan-500" size={24} />,
  //   changeType: 'up',
  //   linkText: 'View Sales',
  //   linkHref: '/dashboard/sales',
  // },
  {
    label: 'This Month Revinue',
    value: '$70,232',
    change: '+0.7%',
    icon: <FiCreditCard className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'View Revinue',
    linkHref: '/dashboard/revinue',
  },
  {
    label: 'All time Revinue',
    value: '$7,890,232',
    change: '+0.7%',
    icon: <FiCreditCard className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'Withdraw Money',
    linkHref: '/dashboard/revinue',
  },
]

const stats2 = [
 
  {
    label: 'Total Orders',
    value: '18,420',
    change: '+5.8%',
    icon: <FiDollarSign className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'View Revenue',
    linkHref: '/dashboard/revenue',
  },
  {
    label: 'Orders Processing',
    value: '3,112',
    change: '+1.9%',
    icon: <FiUsers className="text-cyan-500" size={24} />,
    changeType: 'up',
    linkText: 'All Customers',
    linkHref: '/dashboard/customers',
  },
  {
    label: 'Orders Delivered',
    value: '7654',
    change: '-12.5%',
    icon: <FiShoppingCart className="text-cyan-500" size={24} />,
    changeType: 'down',
    linkText: 'View Products',
    linkHref: '/dashboard/products?filter=out-of-stock',
  }
]
export default function DashboardStats() {
  return (
    <div className="bg-gray-100 p-2 mb-5 flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3  gap-5">
        {stats2.map((stat, index) => (
          <DashboardStatsbelow key={index} {...stat} />
        ))}
      </div>
    </div>
  )
}



export function DashboardStatsbelow(stat) {
  return (



    <div className="bg-white p-4 rounded-md shadow flex items-end justify-between">
      <div className=" flex flex-col gap-5">
        <div>{stat.icon}</div>
        <div>
          <p className="text-gray-500 text-sm">{stat.label}</p>
          <h3 className="text-3xl font-bold">{stat.value}</h3>

        </div>

      </div>
      <div>
        {stat.change && (
          <p className={`text-sm ${stat.changeType === 'down' ? 'text-red-500' : 'text-green-500'}`}>
            {stat.changeType === 'down' ? '↓' : '↑'} {stat.change}
          </p>
        )}
      </div>

    </div>
  )
}
