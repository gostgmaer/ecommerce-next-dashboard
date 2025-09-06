"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
import TableFilter from "@/components/global/element/tableFilter";
import Link from "next/link";
import { FaCheck, FaEye, FaPen, FaTrash } from "react-icons/fa";
import { del, get, patch } from "@/lib/http";

import Image from "next/image";
import {
  exportExcelFile,
  generateUrlFromNestedObject,
} from "@/helper/function";
import { useRouter } from "next/navigation";
import { Grid } from "lucide-react";
import GridComponent from "@/components/global/element/tableElement";
import BrandServices from "@/helper/services/BrandService";

const BrandTable = (props) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");
  const route = useRouter();

  // const fetchCategory = async (statuskey) => {
  //   const query = {
  //     limit: itemsPerPage,
  //     page: currentPage,
  //   };
  //   const checkQuerydata = generateUrlFromNestedObject({ ...query });
  //   route.push(`/dashboard/brands${checkQuerydata}`);
  // };

  // useEffect(() => {
  //   fetchCategory();
  // }, [itemsPerPage, currentPage]);

  const deleteBrands = async (id) => {
    //console.log(id);
    const res = await del("/brands", id);
    // res.statusCode == 200 && fetchCategory();
  };

  // const updateRecord = async (id) => {
  //   const res = await patch("/brands", { status: "publish" }, id);
  //   res.statusCode == 200 && fetchCategory();
  // };


 const columns = [
    {
      field: 'title', sortable: true,
      headerName: " Name",
      cellRenderer: (params) => {
        const { name, images } = params.data;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={images[0]?.url} alt={name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <span>{name}</span>
          </div>
        );
      },

      headerClass: "header-product",

      minWidth: 300,
    },
    
    { field: 'total', sortable: true, },
    { field: 'status', sortable: true,filter: false },
    {
      field: 'Action', sortable: false, filter: false,

      headerName: " ",
      cellRenderer: (params) => {
        const { _id } = params.data;
        return (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Link href={`/dashboard/brands/${_id}/edit`}>
              {" "}
              <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
                <FaPen />
              </button>
            </Link>
            <Link href={`/dashboard/brands/${_id}`}>
              <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
                <FaEye />
              </button>
            </Link>

            <button
              onClick={() => deleteBrands(_id)}
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
      name: "Name",
      slug: "Slug",
      status: "Status",
      total: "Total",
      _id: "Brand Id",
    };
    exportExcelFile(props.data["results"], objectofkeys, "brands");
  };

  return (
    <div>
      <Heading
        data={undefined}
        label="Brands"
        btn={"brands"}
        url={"/dashboard/brands/create"}
        exportevent={exportbtnclick}
      />
      <div>
        
       <GridComponent defaultsort={'name:asc'} columns={columns} apiUrl={BrandServices.getBrands} />
      </div>
      {/* {spinner} */}
    </div>
  );
};

export default BrandTable;
