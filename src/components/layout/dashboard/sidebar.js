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

// Remove TypeScript interfaces and use plain JS objects

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCart className="w-5 h-5" />,
    children: [
      { id: 'orders-all', label: 'All Orders', icon: <ShoppingCart className="w-4 h-4" /> },
      { id: 'orders-pending', label: 'Pending', icon: <AlertCircle className="w-4 h-4" /> },
      { id: 'orders-processing', label: 'Processing', icon: <Package className="w-4 h-4" /> },
      { id: 'orders-shipped', label: 'Shipped', icon: <Truck className="w-4 h-4" /> },
      { id: 'orders-delivered', label: 'Delivered', icon: <UserCheck className="w-4 h-4" /> }
    ]
  },
  {
    id: 'products',
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
    children: [
      { id: 'products-all', label: 'All Products', icon: <Package className="w-4 h-4" /> },
      { id: 'products-categories', label: 'Categories', icon: <Tag className="w-4 h-4" /> },
      { id: 'products-inventory', label: 'Inventory', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'products-reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: <Users className="w-5 h-5" />,
    children: [
      { id: 'customers-all', label: 'All Customers', icon: <Users className="w-4 h-4" /> },
      { id: 'customers-segments', label: 'Segments', icon: <Tag className="w-4 h-4" /> }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { id: 'analytics-sales', label: 'Sales Report', icon: <TrendingUp className="w-4 h-4" /> },
      { id: 'analytics-products', label: 'Product Analytics', icon: <Package className="w-4 h-4" /> },
      { id: 'analytics-customers', label: 'Customer Insights', icon: <Users className="w-4 h-4" /> }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: <Gift className="w-5 h-5" />,
    children: [
      { id: 'marketing-campaigns', label: 'Campaigns', icon: <Gift className="w-4 h-4" /> },
      { id: 'marketing-coupons', label: 'Coupons', icon: <Tag className="w-4 h-4" /> }
    ]
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: <CreditCard className="w-5 h-5" />
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    children: [
      { id: 'settings-general', label: 'General', icon: <Settings className="w-4 h-4" /> },
      { id: 'settings-shipping', label: 'Shipping', icon: <Truck className="w-4 h-4" /> },
      { id: 'settings-payments', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> }
    ]
  }
];

// Convert Sidebar to JS, remove type annotations
const Sidebar = ({ isCollapsed, onToggle, activeItem, onItemClick }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
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
              toggleExpanded(item.id);
            } else {
              onItemClick(item.id);
            }
          }}
          className={`
            w-full flex items-center gap-3 p-3 ${isCollapsed ?'justify-center':" justify-start" }  rounded-lg transition-all duration-200
          
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