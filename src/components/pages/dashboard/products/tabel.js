"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
// import Pagination from '@/components/global/element/pagination';
import PaginatedList from "@/components/global/element/pagination";
import TableFilter from "@/components/global/element/tableFilter";
import { Menu, Dropdown } from "antd";
import Link from "next/link";
import {
  FaCheck,
  FaEdit,
  FaEye,
  FaPen,
  FaPenAlt,
  FaTrash,
} from "react-icons/fa";
import { del, get, patch, post } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";
import Image from "next/image";
import { exportExcelFile, generateUrlFromNestedObject } from "@/helper/function";
import { useRouter } from "next/navigation";

const ProductsPageElement = (props) => {
  const route = useRouter()
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");



  const handleSearch = () => {
    const paramsQuery = {
      limit: itemsPerPage,
       page: currentPage,
    };
    const checkQuerydata = generateUrlFromNestedObject({ ...paramsQuery });
    route.push(`/dashboard/products${checkQuerydata}`);
  };



  useEffect(() => {
    handleSearch()
  }, [itemsPerPage, currentPage]);

  const DeleteProduct = async (id) => {
    const res = await del("/products", id);
    res.statusCode == 200 && handleSearch();
  };

  const updateRecord = async (id) => {
    const res = await patch("/products", { status: "publish" }, id);
    res.statusCode == 200 && handleSearch();
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className=" flex gap-1 items-center justify-start">
          {/* <Image
            width={50}
            height={50}
            className=" rounded-2xl"
            src={record.images[0].url}
            alt={record.images[0].name}
            style={{ maxWidth: "100px" }}
          /> */}
          <p>{record.title}</p>
        </div>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Stock",
      dataIndex: "currentStockLevel",
      key: "currentStockLevel",
      sorter: (a, b) => a.stock - b.stock, // Enable sorting for this column
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price, // Enable sorting for this column
    },
    {
      title: "Total Review",
      dataIndex: "totalReviews",
      key: "totalReviews",
    },
    {
      title: "Rating",
      dataIndex: "averageRating",
      key: "averageRating",
      render: (text, record) => (
        <div className=" flex gap-1 items-center justify-start">
          <p>{record.averageRating?.toFixed(1)}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: (
        <div className="flex items-center gap-1 opacity-0">
          <div>Actions</div>
        </div>
      ),
      key: "actions",
      render: (item, index) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Link href={`/dashboard/products/${item._id}/edit`}>
            {" "}
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaPen />
            </button>
          </Link>
          <Link href={`/dashboard/products/${item._id}`}>
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaEye />
            </button>
          </Link>
          <button
            onClick={() => updateRecord(item._id)}
            className={`rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 cursor-pointer hover:!border-gray-900 hover:text-gray-700 ${item.status === "publish" &&
              " text-green-400 hover:!border-green-600 border-green-400 hover:text-green-600"
              }`}
          >
            <FaCheck />
          </button>
          <button
            onClick={() => DeleteProduct(item._id)}
            className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 cursor-pointer hover:!border-gray-900 hover:text-gray-700"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];


  const exportbtnclick = () => {
    const objectofkeys = {
      "title": "Product Name",
      "status": "Status",
      "sku": "SKU",
      "price": "Price",
      "salePrice": "Sale Price"
    }
    exportExcelFile(props.data.results, objectofkeys,"products")
  }

  return (
    <div>
      <Heading
        data={undefined}
        label={"Products"}
        btn={"product"}
        url={"/dashboard/products/create"} exportevent={exportbtnclick}      />
      <div>
        <TableFilter
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          status={status}
          setStatus={setStatus}
          searchEvent={handleSearch}
        />
        <Table data={props.data.results} tableColumn={columns} pagination={{ total: props.data.total, page: currentPage, limit: itemsPerPage, setPage: setCurrentPage, setLimit: setItemsPerPage }} />

      </div>
    </div>
  );
};

export default ProductsPageElement;
