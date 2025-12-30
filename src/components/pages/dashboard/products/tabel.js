"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
// import Pagination from '@/components/global/element/pagination';
// import PaginatedList from "@/components/global/element/pagination";
import TableFilter from "@/components/global/element/tableFilter";

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
import {
  exportExcelFile,
  generateUrlFromNestedObject,
} from "@/helper/function";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Switch } from "@nextui-org/react";
import GridComponent from "@/components/global/element/tableElement";
import ProductServices from "@/helper/services/ProductServices";
import { filterProps } from "framer-motion";
import { isColumnSelectionCol } from "ag-grid-community";
import { Select } from "@/components/global/fields/SelectField";
import { handleClientScriptLoad } from "next/script";

const ProductsPageElement = (props) => {
  const { data: session } = useSession();
  const route = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);

  // const loadProduct = React.useCallback(() => {
  //   const query = {
  //     limit: itemsPerPage,
  //     page: currentPage,
  //   };
  //   const checkQuerydata = generateUrlFromNestedObject({ ...query });
  //   route.push(`/dashboard/products${checkQuerydata}`);
  // }, [itemsPerPage, currentPage, route]);

  // useEffect(() => {
  //   loadProduct();
  // }, [loadProduct]);

  // const fetch = async (statuskey) => {

  //   const header = {
  //     Authorization: "Bearer " + session?.["accessToken"],
  //   }
  // const query = {
  //   limit: itemsPerPage,
  //   page: currentPage,
  //   filter: JSON.stringify({ status: statuskey }),
  //   search: JSON.stringify({ name: searchKey }),
  // };

  //   const category = await get("/products", query, null, header);
  //   setData(category);
  // };

  // useEffect(() => {
  //   fetch()
  // }, [itemsPerPage, currentPage]);

  const DeleteProduct = async (id) => {
    const res = await del("/products", id);
  };

  const updateRecord = async (id) => {
    const res = await patch("/products", { status: "publish" }, id);
  };



  const columns = [
    {
      field: 'title', sortable: true,
      headerName: " Product",
      cellRenderer: (params) => {
        const { title, images, age } = params.data;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={images[0]?.url} alt={title} style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <span>{title}</span>
          </div>
        );
      },

      headerClass: "header-product",

      minWidth: 300,
    },
    { field: 'sku', sortable: true },
    { field: 'stock', sortable: true },
    { field: 'price', sortable: true, },
    { field: 'salePrice', sortable: true, },
    { field: 'status', sortable: true,filter: false },

    // {
    //   headerName: "status",
    //   field: "status",
    
    //   cellRenderer: (params) => {
    //     const { title, images, age } = params.data;
    //     return (
    //       <Select className="flex items-center justify-start gap-2" options={[{ key: "", label: "All" }, ...['active', 'inactive', 'draft', 'pending', 'archived', 'published'].map(s => ({ key: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))]} id={"order-status"} additionalAttrs={{ onChange: (e) => updateRecord(e) ,value:params.data.status}} placeholder={"Select"} optionkeys={{ key: "key", value: "label" }} label={undefined}>

    //       </Select>
    //     );
    //   },
    //   sortable: true, filter: true
    // },
    {
      field: 'Action', sortable: false, filter: false,

      headerName: " ",
      cellRenderer: (params) => {
        const { _id } = params.data;
        return (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Link href={`/dashboard/products/${_id}/edit`}>
              {" "}
              <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
                <FaPen />
              </button>
            </Link>
            <Link href={`/dashboard/products/${_id}`}>
              <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
                <FaEye />
              </button>
            </Link>

            <button
              onClick={() => DeleteProduct(_id)}
              className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 cursor-pointer hover:!border-gray-900 hover:text-gray-700"
            >
              <FaTrash />
            </button>
          </div>
        );
      },



    }
  ]

  const exportbtnclick = () => {
    const objectofkeys = {
      title: "Product Name",
      status: "Status",
      sku: "SKU",
      price: "Price",
      salePrice: "Sale Price",
    };
    exportExcelFile(data.results, objectofkeys, "products");
  };

  return (
    <div>
      <Heading
        data={undefined}
        label={"Products"}
        btn={"product"}
        url={"/dashboard/products/create"}
        exportevent={exportbtnclick}
      />
      <div className=" relative">
       
        <GridComponent defaultsort="title:desc" columns={columns} apiUrl={ProductServices.getAllProducts} />
      </div>
    </div>
  );
};

export default ProductsPageElement;
