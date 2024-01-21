"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
// import Pagination from '@/components/global/element/pagination';
import PaginatedList from "@/components/global/element/pagination";
import TableFilter from "@/components/global/element/tableFilter";
import Link from "next/link";
import { FaCheck, FaEye, FaPen, FaTrash } from "react-icons/fa";

import { useAxios } from "@/lib/interceptors";
import { get } from "@/lib/http";
import moment from "moment";

const items = Array.from(Array(20).keys()).map((key) => key + 1);

const LogsTable = () => {
  const [axios, spinner] = useAxios();
  const options = [5, 10, 20, 50];
  const [products, setProducts] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");

  const loadLogs = async () => {
    const query = {
      limit: itemsPerPage,
      page: currentPage,
    };
    const response = await get("/logs", query);
    var data = [];
    response["results"].forEach((item) => {
      const obj = {
        ...item,
        createdAt: moment(item["createdAt"]).format("MMMM Do YYYY, h:mm a"),
      };
      data.push(obj);
    });
    setProducts({ ...response, results: data });
    // setItems(Array.from(Array(response.total).keys()).map((key) => key + 1));
  };

  //  const items = Array.from(Array(20).keys()).map((key) => key + 1);

  useEffect(() => {
    loadLogs();
  }, [itemsPerPage, currentPage]);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Url ",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "Ip",
      dataIndex: "location",
      render: (record, index) =>{
        console.log(record);
        return  <span>{record?.ip}</span>
      },
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      sorter: (a, b) => a.stock - b.stock, // Enable sorting for this column
    },
    {
      title: "userAgent",
      dataIndex: "useragent",
      key: "useragent",
    },

    {
      title: "Created Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    // {
    //   title: (
    //     <div className="flex items-center gap-1 opacity-0">
    //       <div>Actions</div>
    //     </div>
    //   ),
    //   key: "actions",
    //   render: (record, index) => (
    //     <div className="flex items-center justify-end gap-3 pe-4">
    //       <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 cursor-pointer hover:!border-gray-900 hover:text-gray-700">
    //         <FaCheck />
    //       </button>
    //       <Link href={`/dashboard/logs/${record.id}`}>
    //         <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
    //           <FaEye />
    //         </button>
    //       </Link>
    //     </div>
    //   ),
    // },
  ];
  return (
    <div>
      <Heading data={undefined} label="Logs" btn={undefined} url={undefined} />
      <div>
        <TableFilter
          searchKey={undefined}
          setSearchKey={undefined}
          status={undefined}
          setStatus={undefined}
          searchEvent={undefined}
        />
        {/* <Table data={products["results"]} tableColumn={columns} /> */}
        <Table data={products["results"]} tableColumn={columns} pagination={{ total: products["total"], page: currentPage, limit: itemsPerPage, setPage: setCurrentPage, setLimit: setItemsPerPage }} />
        {/* <PaginatedList
          length={products["total"]}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>
    </div>
  );
};

export default LogsTable;
