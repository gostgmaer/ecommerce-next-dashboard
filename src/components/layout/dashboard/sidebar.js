import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  BarChart3,
  Users,
  Settings,
  ShoppingCart,
  Package,
  CreditCard,
  Truck,
  Star,
  Tag,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Gift
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Remove TypeScript interfaces and use plain JS objects

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    url: '/dashboard' // dashboard is the starting page
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCart className="w-5 h-5" />,
    url: '/dashboard/orders',
    children: [
      { id: 'orders-all', label: 'All Orders', icon: <ShoppingCart className="w-4 h-4" />, url: '/dashboard/orders' },
      { id: 'orders-pending', label: 'Pending', icon: <AlertCircle className="w-4 h-4" />, url: '/dashboard/orders/pending' },
      { id: 'orders-processing', label: 'Processing', icon: <Package className="w-4 h-4" />, url: '/dashboard/orders/processing' },
      { id: 'orders-shipped', label: 'Shipped', icon: <Truck className="w-4 h-4" />, url: '/dashboard/orders/shipped' },
      { id: 'orders-delivered', label: 'Delivered', icon: <UserCheck className="w-4 h-4" />, url: '/dashboard/orders/delivered' }
    ]
  },
  {
    id: 'products',
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
    url: '/dashboard/products',
    children: [
      { id: 'products-all', label: 'All Products', icon: <Package className="w-4 h-4" />, url: '/dashboard/products' },
      { id: 'products-categories', label: 'Categories', icon: <Tag className="w-4 h-4" />, url: '/dashboard/products/categories' },
      { id: 'products-inventory', label: 'Inventory', icon: <BarChart3 className="w-4 h-4" />, url: '/dashboard/products/inventory' },
      { id: 'products-reviews', label: 'Reviews', icon: <Star className="w-4 h-4" />, url: '/dashboard/products/reviews' }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: <Users className="w-5 h-5" />,
    url: '/dashboard/customers',
    children: [
      { id: 'customers-all', label: 'All Customers', icon: <Users className="w-4 h-4" />, url: '/dashboard/customers' },
      { id: 'customers-segments', label: 'Segments', icon: <Tag className="w-4 h-4" />, url: '/dashboard/customers/segments' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    url: '/dashboard/analytics',
    children: [
      { id: 'analytics-sales', label: 'Sales Report', icon: <TrendingUp className="w-4 h-4" />, url: '/dashboard/analytics/sales' },
      { id: 'analytics-products', label: 'Product Analytics', icon: <Package className="w-4 h-4" />, url: '/dashboard/analytics/products' },
      { id: 'analytics-customers', label: 'Customer Insights', icon: <Users className="w-4 h-4" />, url: '/dashboard/analytics/customers' }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: <Gift className="w-5 h-5" />,
    url: '/dashboard/marketing',
    children: [
      { id: 'marketing-campaigns', label: 'Campaigns', icon: <Gift className="w-4 h-4" />, url: '/dashboard/marketing/campaigns' },
      { id: 'marketing-coupons', label: 'Coupons', icon: <Tag className="w-4 h-4" />, url: '/dashboard/marketing/coupons' }
    ]
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: <CreditCard className="w-5 h-5" />,
    url: '/dashboard/payments'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    url: '/dashboard/settings',
    children: [
      { id: 'settings-general', label: 'General', icon: <Settings className="w-4 h-4" />, url: '/dashboard/settings/general' },
      { id: 'settings-shipping', label: 'Shipping', icon: <Truck className="w-4 h-4" />, url: '/dashboard/settings/shipping' },
      { id: 'settings-payments', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" />, url: '/dashboard/settings/payments' }
    ]
  }
];
// ...existing

// Convert Sidebar to JS, remove type annotations
const Sidebar = ({ isCollapsed, onToggle, activeItem,   onItemClick }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const router = useRouter();

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev =>
      prev.includes(itemId.id)
        ? prev.filter(id => id !== itemId.id)
        : [...prev, itemId.id]
    );
    router.push(itemId.url)
  };

  const renderNavItem = (item, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;
    const paddingLeft = isCollapsed ? 'pl-4' : depth === 0 ? 'pl-4' : 'pl-8';

    return (
      <div key={item.id}>
      <button
        onClick={() => {
        if (hasChildren) {
          toggleExpanded(item);
        } else {
          onItemClick(item);
          router.push(item.url);
        }
        }}
        className={`
        w-full flex items-center gap-3 p-3 ${isCollapsed ? 'justify-center' : " justify-start"}  rounded-lg transition-all duration-200
        ${isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
        }
        `}
      >
        <span className="flex-shrink-0">
        {item.icon}
        </span>
        {!isCollapsed && (
        <div className='flex items-center justify-between flex-1'>
          <span className=" font-medium text-sm">
          {item.label}
          </span>
          {hasChildren && (
          <span className="flex-shrink-0">
            {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
            ) : (
            <ChevronDown className="w-4 h-4" />
            )}
          </span>
          )}
        </div>
        )}
      </button>

      {hasChildren && isExpanded && !isCollapsed && (
        <div className="mt-1 space-y-1">
        {item.children.map(child => renderNavItem(child, depth + 1))}
        </div>
      )}
      </div>
    );
  };

  return (
    <div className={`
      bg-slate-800 border-r border-slate-700 h-screen flex flex-col transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">
              Dashboard
            </h1>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map(item => renderNavItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!isCollapsed && (
          <div className="text-xs text-gray-400 text-center">
            © 2025 Dashboard
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;