import React from "react";
import { MdKeyboardArrowRight, MdShoppingCart } from "react-icons/md";

const Dropdown = () => {
  return (
    <div
      role="collapse"
      aria-expanded="false"
      data-testid="collapse-parent"
      className="rizzui-collapse-root"
    >
      <div className="group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700">
        <span className="flex items-center">
          <span className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&amp;>svg]:h-[19px] [&amp;>svg]:w-[19px] text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700">
            <MdShoppingCart />
          </span>
          E-Commerce
        </span>
        <MdKeyboardArrowRight />
      </div>
      <div className="rizzui-collapse-panel">
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/products"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Products
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/products/FC6723757651DB74"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Product Details
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/products/create"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Create Product
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/products/FC6723757651DB74/edit"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Edit Product
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/categories"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Categories
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/categories/create"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Create Category
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/categories/FC6723757651DB74/edit"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Edit Category
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/orders"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Orders
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/orders/FC6723757651DB74"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Order Details
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/orders/create"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Create Order
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/orders/FC6723757651DB74/edit"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Edit Order
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/reviews"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Reviews
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/shop"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Shop
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/cart"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Cart
        </a>
        <a
          className="mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/ecommerce/checkout"
        >
          <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"></span>
          Checkout &amp; Payment
        </a>
      </div>
    </div>
  );
};

export default Dropdown;
