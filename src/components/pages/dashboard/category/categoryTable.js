"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
import TableFilter from "@/components/global/element/tableFilter";
import Link from "next/link";
import { FaCheck, FaEye, FaPen, FaTrash } from "react-icons/fa";
import { del, get, patch } from "@/lib/http";

import Image from "next/image";
import { generateUrlFromNestedObject } from "@/helper/function";
import { useRouter } from "next/navigation";
import CategoryServices from "@/helper/services/CategoryServices";
import GridComponent from "@/components/global/element/tableElement";

const Categorytable = (props) => {

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");
  const route = useRouter()

  // const handleSearch = async () => {

  //   const result = await CategoryServices.getCategories(props.searchParams)

  //   console.log(result);

  //   const paramsQuery = {
  //     limit: itemsPerPage,
  //     page: currentPage,
  //   };
  //   const checkQuerydata = generateUrlFromNestedObject({ ...paramsQuery });
  //   route.push(`/dashboard/categories${checkQuerydata}`);
  // };





  // useEffect(() => {
  //   handleSearch()
  // }, [itemsPerPage, currentPage]);



  const deleteCategory = async (id) => {
    //console.log(id);
    const res = await del("/categories", id);
    // res.statusCode == 200 && handleSearch();
  };

  // const updateRecord = async (id) => {
  //   const res = await patch("/categories", { status: "publish" }, id);
  //   res.statusCode == 200 && handleSearch();
  // };

  // console.log(CategoryServices);
  


  const columns = [
    {
      field: 'title', sortable: true,
      headerName: " Category Name",
      cellRenderer: (params) => {
        const { title, images } = params.data;
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
    {
      field: 'total', sortable: true,
      headerName: " Total",



      minWidth: 300,
    },
 
    { field: 'status', sortable: true, filter: false },
    {
      field: 'Action', sortable: false, filter: false,

      headerName: " ",
      cellRenderer: (params) => {
        const { _id } = params.data;
        return (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Link href={`/dashboard/categories/${_id}/edit`}>
              {" "}
              <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
                <FaPen />
              </button>
            </Link>
            <Link href={`/dashboard/categories/${_id}`}>
              <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
                <FaEye />
              </button>
            </Link>

            <button
              onClick={() => deleteCategory(_id)}
              className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 cursor-pointer hover:!border-gray-900 hover:text-gray-700"
            >
              <FaTrash />
            </button>
          </div>
        );
      },



    }
  ]

  return (
    <div>
      <Heading
        data={undefined}
        label="Categories"
        btn={"category"}
        url={"/dashboard/categories/create"} exportevent={undefined} />
      <div>
        
        <GridComponent defaultsort="title:desc" columns={columns} apiUrl={CategoryServices.getCategories} />
        {/* <Table data={props.data.results} tableColumn={columns} pagination={{ total: props.data.total, page: currentPage, limit: itemsPerPage, setPage: setCurrentPage, setLimit: setItemsPerPage }} /> */}

      </div>
    </div>
  );
};

export default Categorytable;
