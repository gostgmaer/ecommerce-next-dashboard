"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
import TableFilter from "@/components/global/element/tableFilter";
import { generateUrlFromNestedObject } from "@/helper/function";
import { useRouter } from "next/navigation";
import moment from "moment";

const LogsTable = (props) => {

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const route = useRouter()


  const loadLogs =  () => {
    const query = {
      limit: itemsPerPage,
      page: currentPage,
    };

    const checkQuerydata = generateUrlFromNestedObject({ ...query });
    route.push(`/dashboard/logs${checkQuerydata}`);
  };

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
        render: (index, record) => (
              <div className="flex items-center justify-start">
                {`${
                  record.createdAt
                    ? moment(record.createdAt).format("DD MMM YYYY, h:mm a")
                    : ""
                }`}
              </div>
            ),
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
   
        <Table data={props.data["results"]} tableColumn={columns} pagination={{ total: props.data["total"], page: currentPage, limit: itemsPerPage, setPage: setCurrentPage, setLimit: setItemsPerPage }} />
       
      </div>
    </div>
  );
};

export default LogsTable;
