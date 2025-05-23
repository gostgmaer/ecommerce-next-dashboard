"use client";
import React, { useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
// import Pagination from '@/components/global/element/pagination';
import PaginatedList from "@/components/global/element/pagination";
import TableFilter from "@/components/global/element/tableFilter";

import { CiMenuKebab } from "react-icons/ci";
import { Menu, Transition } from "@headlessui/react";
// import { useFloating } from "@floating-ui/react";

const products = [
  {
    id: "0o02051402",
    name: "Tasty Metal Shirt",
    category: "Books",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    sku: "52442",
    stock: 0,
    price: "410.00",
    status: "Pending",
    rating: [4, 5, 3, 2],
  },
  {
    id: "0o17477064",
    name: "Modern Cotton Gloves",
    category: "Kids",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    sku: "98414",
    stock: 0,
    price: "342.00",
    status: "Draft",
    rating: [4, 5],
  },
  {
    id: "0o02374305",
    name: "Rustic Steel Computer",
    category: "Games",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
    sku: "78192",
    stock: 0,
    price: "948.00",
    status: "Draft",
    rating: [4, 5, 2, 5, 3],
  },
  {
    id: "0o02602714",
    name: "Licensed Concrete Cheese",
    category: "Electronics",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
    sku: "86229",
    stock: 0,
    price: "853.00",
    status: "Pending",
    rating: [3, 2],
  },
  {
    id: "0o54011366",
    name: "Electronic Rubber Table",
    category: "Books",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp",
    sku: "89762",
    stock: 18,
    price: "881.00",
    status: "Publish",
    rating: [3, 4, 5],
  },
  {
    id: "0o24033230",
    name: "Gorgeous Bronze Gloves",
    category: "Shoes",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/16.webp",
    sku: "21065",
    stock: 9,
    price: "124.00",
    status: "Pending",
    rating: [5, 5, 4, 3, 2],
  },
  {
    id: "0o27342230",
    name: "Practical Steel Keyboard",
    category: "Kids",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp",
    sku: "41063",
    stock: 0,
    price: "890.00",
    status: "Pending",
    rating: [5, 2],
  },
  {
    id: "0o64235224",
    name: "Sleek Frozen Ball",
    category: "Electronics",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
    sku: "13240",
    stock: 9,
    price: "980.00",
    status: "Publish",
    rating: [4, 2],
  },
  {
    id: "0o63671734",
    name: "Ergonomic Frozen Pants",
    category: "Games",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/9.webp",
    sku: "26214",
    stock: 0,
    price: "289.00",
    status: "Pending",
    rating: [2, 5, 4],
  },
  {
    id: "0o60206537",
    name: "Sleek Fresh Chair",
    category: "Garden",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/10.webp",
    sku: "14317",
    stock: 24,
    price: "587.00",
    status: "Draft",
    rating: [4, 3, 2, 5],
  },
  {
    id: "0o53505174",
    name: "Awesome Granite Chicken",
    category: "Electronics",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/12.webp",
    sku: "21944",
    stock: 9,
    price: "581.00",
    status: "Pending",
    rating: [3, 2, 4, 5],
  },
  {
    id: "0o20360446",
    name: "Rustic Concrete Ball",
    category: "Books",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/4.webp",
    sku: "93411",
    stock: 18,
    price: "946.00",
    status: "Pending",
    rating: [2, 5, 5],
  },
  {
    id: "0o05416424",
    name: "Electronic Concrete Computer",
    category: "Tools",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/13.webp",
    sku: "61422",
    stock: 24,
    price: "448.00",
    status: "Pending",
    rating: [2, 5, 4, 5],
  },
  {
    id: "0o52110435",
    name: "Small Wooden Pizza",
    category: "Toys",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/14.webp",
    sku: "30532",
    stock: 0,
    price: "676.00",
    status: "Draft",
    rating: [5, 3, 4],
  },
  {
    id: "0o40214300",
    name: "Tasty Bronze Salad",
    category: "Baby",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/4.webp",
    sku: "47948",
    stock: 9,
    price: "524.00",
    status: "Draft",
    rating: [5, 5, 4, 3],
  },
  {
    id: "0o05430752",
    name: "Practical Metal Mouse",
    category: "Garden",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp",
    sku: "08547",
    stock: 18,
    price: "413.00",
    status: "Pending",
    rating: [5, 5, 2, 4],
  },
  {
    id: "0o46376257",
    name: "Modern Steel Gloves",
    category: "Outdoors",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/9.webp",
    sku: "70792",
    stock: 9,
    price: "169.00",
    status: "Publish",
    rating: [4, 2, 5],
  },
  {
    id: "0o33546474",
    name: "Small Granite Chips",
    category: "Kids",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    sku: "89285",
    stock: 18,
    price: "585.00",
    status: "Draft",
    rating: [5, 5, 4],
  },
  {
    id: "0o46270610",
    name: "Rustic Steel Computer",
    category: "Outdoors",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/4.webp",
    sku: "51557",
    stock: 0,
    price: "214.00",
    status: "Draft",
    rating: [5, 3],
  },
  {
    id: "0o07506427",
    name: "Sleek Bronze Pizza",
    category: "Movies",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/12.webp",
    sku: "95683",
    stock: 9,
    price: "165.00",
    status: "Pending",
    rating: [3, 5, 5, 4],
  },
  {
    id: "0o47456433",
    name: "Electronic Metal Sausages",
    category: "Sports",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/16.webp",
    sku: "30359",
    stock: 18,
    price: "280.00",
    status: "Draft",
    rating: [5, 5, 2, 3],
  },
  {
    id: "0o63152507",
    name: "Handcrafted Bronze Pizza",
    category: "Clothing",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/2.webp",
    sku: "06117",
    stock: 18,
    price: "424.00",
    status: "Draft",
    rating: [2, 5, 3],
  },
  {
    id: "0o55307455",
    name: "Tasty Rubber Sausages",
    category: "Grocery",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    sku: "68408",
    stock: 9,
    price: "797.00",
    status: "Publish",
    rating: [2, 4],
  },
  {
    id: "0o03434327",
    name: "Awesome Fresh Pizza",
    category: "Shoes",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp",
    sku: "51660",
    stock: 44,
    price: "586.00",
    status: "Publish",
    rating: [3, 2, 5, 5, 4],
  },
  {
    id: "0o53572743",
    name: "Awesome Plastic Cheese",
    category: "Garden",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp",
    sku: "45720",
    stock: 9,
    price: "711.00",
    status: "Draft",
    rating: [2, 4, 5],
  },
  {
    id: "0o64164264",
    name: "Elegant Frozen Gloves",
    category: "Baby",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
    sku: "64677",
    stock: 24,
    price: "326.00",
    status: "Publish",
    rating: [2, 5, 3, 5],
  },
  {
    id: "0o05102064",
    name: "Rustic Fresh Pizza",
    category: "Automotive",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/10.webp",
    sku: "70546",
    stock: 24,
    price: "949.00",
    status: "Pending",
    rating: [2, 5],
  },
  {
    id: "0o52601116",
    name: "Awesome Plastic Hat",
    category: "Automotive",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    sku: "29833",
    stock: 44,
    price: "356.00",
    status: "Publish",
    rating: [2, 3, 5, 5],
  },
  {
    id: "0o25607731",
    name: "Bespoke Metal Towels",
    category: "Games",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/16.webp",
    sku: "47244",
    stock: 24,
    price: "114.00",
    status: "Draft",
    rating: [3, 5, 2],
  },
  {
    id: "0o52315717",
    name: "Ergonomic Metal Chips",
    category: "Computers",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/16.webp",
    sku: "41634",
    stock: 18,
    price: "629.00",
    status: "Pending",
    rating: [2, 5],
  },
  {
    id: "0o75327067",
    name: "Licensed Cotton Mouse",
    category: "Movies",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/4.webp",
    sku: "21101",
    stock: 9,
    price: "503.00",
    status: "Draft",
    rating: [2, 3],
  },
  {
    id: "0o50663251",
    name: "Handmade Plastic Gloves",
    category: "Home",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/16.webp",
    sku: "46682",
    stock: 0,
    price: "688.00",
    status: "Publish",
    rating: [5, 4, 5],
  },
  {
    id: "0o24615323",
    name: "Oriental Cotton Bike",
    category: "Books",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/14.webp",
    sku: "92684",
    stock: 0,
    price: "412.00",
    status: "Pending",
    rating: [2, 5, 4],
  },
  {
    id: "0o01004640",
    name: "Small Metal Soap",
    category: "Baby",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/13.webp",
    sku: "41562",
    stock: 0,
    price: "663.00",
    status: "Pending",
    rating: [2, 4],
  },
  {
    id: "0o61447507",
    name: "Tasty Soft Pants",
    category: "Books",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
    sku: "98548",
    stock: 0,
    price: "714.00",
    status: "Pending",
    rating: [5, 2, 4],
  },
  {
    id: "0o61414636",
    name: "Practical Soft Ball",
    category: "Sports",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    sku: "94776",
    stock: 24,
    price: "643.00",
    status: "Pending",
    rating: [4, 5, 5],
  },
  {
    id: "0o77066213",
    name: "Generic Concrete Table",
    category: "Movies",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/14.webp",
    sku: "33290",
    stock: 24,
    price: "535.00",
    status: "Publish",
    rating: [4, 3, 5],
  },
  {
    id: "0o62320560",
    name: "Licensed Concrete Gloves",
    category: "Games",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp",
    sku: "30229",
    stock: 24,
    price: "401.00",
    status: "Draft",
    rating: [5, 4],
  },
  {
    id: "0o66242465",
    name: "Gorgeous Cotton Ball",
    category: "Grocery",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
    sku: "33012",
    stock: 9,
    price: "156.00",
    status: "Publish",
    rating: [2, 3],
  },
  {
    id: "0o43631127",
    name: "Small Cotton Towels",
    category: "Garden",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp",
    sku: "37913",
    stock: 9,
    price: "497.00",
    status: "Pending",
    rating: [3, 5],
  },
  {
    id: "0o22474161",
    name: "Bespoke Metal Car",
    category: "Tools",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/4.webp",
    sku: "13233",
    stock: 44,
    price: "814.00",
    status: "Publish",
    rating: [5, 3, 4, 5, 2],
  },
  {
    id: "0o13056232",
    name: "Tasty Wooden Pizza",
    category: "Tools",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
    sku: "46236",
    stock: 9,
    price: "698.00",
    status: "Draft",
    rating: [5, 3],
  },
  {
    id: "0o77406503",
    name: "Handcrafted Wooden Mouse",
    category: "Sports",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/9.webp",
    sku: "31783",
    stock: 0,
    price: "283.00",
    status: "Publish",
    rating: [4, 3],
  },
  {
    id: "0o46772272",
    name: "Practical Bronze Towels",
    category: "Industrial",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    sku: "07942",
    stock: 0,
    price: "440.00",
    status: "Publish",
    rating: [4, 2, 5, 5],
  },
  {
    id: "0o22505057",
    name: "Incredible Cotton Car",
    category: "Automotive",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp",
    sku: "85757",
    stock: 67,
    price: "303.00",
    status: "Publish",
    rating: [5, 4],
  },
  {
    id: "0o56135557",
    name: "Handcrafted Wooden Computer",
    category: "Garden",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/10.webp",
    sku: "29529",
    stock: 24,
    price: "951.00",
    status: "Publish",
    rating: [4, 3, 5, 2, 5],
  },
  {
    id: "0o54006426",
    name: "Small Frozen Bike",
    category: "Books",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/2.webp",
    sku: "65129",
    stock: 18,
    price: "773.00",
    status: "Draft",
    rating: [4, 2],
  },
  {
    id: "0o34303463",
    name: "Recycled Plastic Salad",
    category: "Grocery",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/14.webp",
    sku: "93445",
    stock: 44,
    price: "210.00",
    status: "Pending",
    rating: [5, 5],
  },
  {
    id: "0o35514556",
    name: "Handcrafted Granite Hat",
    category: "Games",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/10.webp",
    sku: "58734",
    stock: 18,
    price: "328.00",
    status: "Draft",
    rating: [3, 5],
  },
  {
    id: "0o14630776",
    name: "Unbranded Cotton Fish",
    category: "Tools",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
    sku: "75994",
    stock: 44,
    price: "291.00",
    status: "Pending",
    rating: [5, 2],
  },
  {
    id: "0o62074230",
    name: "Intelligent Soft Hat",
    category: "Automotive",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp",
    sku: "95988",
    stock: 18,
    price: "136.00",
    status: "Pending",
    rating: [5, 3, 2, 4, 5],
  },
  {
    id: "0o60671014",
    name: "Intelligent Rubber Salad",
    category: "Jewelery",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/2.webp",
    sku: "06076",
    stock: 9,
    price: "556.00",
    status: "Draft",
    rating: [4, 3],
  },
  {
    id: "0o66603416",
    name: "Sleek Wooden Mouse",
    category: "Industrial",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
    sku: "09162",
    stock: 18,
    price: "879.00",
    status: "Draft",
    rating: [5, 3, 2],
  },
  {
    id: "0o47262560",
    name: "Ergonomic Cotton Keyboard",
    category: "Movies",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/12.webp",
    sku: "72758",
    stock: 9,
    price: "268.00",
    status: "Publish",
    rating: [5, 2],
  },
  {
    id: "0o45771547",
    name: "Modern Fresh Ball",
    category: "Industrial",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp",
    sku: "43417",
    stock: 0,
    price: "755.00",
    status: "Pending",
    rating: [3, 5],
  },
  {
    id: "0o47456062",
    name: "Gorgeous Frozen Cheese",
    category: "Beauty",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp",
    sku: "88821",
    stock: 44,
    price: "688.00",
    status: "Draft",
    rating: [2, 5, 4, 5, 3],
  },
  {
    id: "0o37624105",
    name: "Gorgeous Frozen Pizza",
    category: "Music",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/13.webp",
    sku: "71026",
    stock: 9,
    price: "530.00",
    status: "Pending",
    rating: [3, 5],
  },
  {
    id: "0o40442757",
    name: "Electronic Frozen Hat",
    category: "Music",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    sku: "37775",
    stock: 67,
    price: "410.00",
    status: "Pending",
    rating: [5, 3, 2, 5, 4],
  },
  {
    id: "0o34212635",
    name: "Unbranded Fresh Shirt",
    category: "Movies",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/12.webp",
    sku: "34068",
    stock: 18,
    price: "471.00",
    status: "Draft",
    rating: [5, 5, 4, 2],
  },
  {
    id: "0o64604132",
    name: "Elegant Metal Chair",
    category: "Games",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
    sku: "92130",
    stock: 18,
    price: "495.00",
    status: "Draft",
    rating: [5, 5, 3],
  },
];

const items = Array.from(Array(20).keys()).map((key) => key + 1);

const ReviewElements = () => {

  const [products, setProducts] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // const { refs, floatingStyles } = useFloating();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CUSTOMER REVIEW",
      dataIndex: "review",
      key: "review",
    },

    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      sorter: (a, b) => a.product - b.product, // Enable sorting for this column
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      sorter: (a, b) => a.created - b.created, // Enable sorting for this column
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title:  <div className="">
        <CiMenuKebab className="hidden" />
      </div>,
      key: "action",
      render: (text, record) => (
        <div className="relative inline-block">
          <button
            id="apple-imac-27-dropdown-button"
            data-dropdown-toggle="apple-imac-27-dropdown"
            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
            type="button"
          >
            <CiMenuKebab />
          </button>
      
        </div>
      ),
    },
  ];
  return (
    <div>
      <Heading data={undefined} label="Reviews" btn={"Review"} url={undefined} exportevent={undefined} />
      <div>
        {/* <TableFilter /> */}
        {/* <Table data={products} tableColumn={columns} pagination={{ total: products["length"], page: currentPage, limit: itemsPerPage, setPage: setCurrentPage, setLimit: setItemsPerPage }} /> */}
      
      </div>
    </div>
  );
};

export default ReviewElements;
