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

const BrandTable = (props) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");
  const route = useRouter();

  const fetchCategory = async (statuskey) => {
    const query = {
      limit: itemsPerPage,
      page: currentPage,
    };
    const checkQuerydata = generateUrlFromNestedObject({ ...query });
    route.push(`/dashboard/brands${checkQuerydata}`);
  };

  useEffect(() => {
    fetchCategory();
  }, [itemsPerPage, currentPage]);

  const deleteCategory = async (id) => {
    //console.log(id);
    const res = await del("/brands", id);
    res.statusCode == 200 && fetchCategory();
  };

  const updateRecord = async (id) => {
    const res = await patch("/brands", { status: "publish" }, id);
    res.statusCode == 200 && fetchCategory();
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          width={50}
          height={50}
          className=" rounded-2xl"
          src={images[0]?.url}
          alt={images[0]?.name}
          style={{ maxWidth: "100px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name, // Enable sorting for this column
    },

    {
      title: (
        <div className="flex items-center gap-1">
          <div>Status</div>
        </div>
      ),
      dataIndex: "status",
      key: "status",
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <div>Total</div>
        </div>
      ),
      dataIndex: "total",
      key: "total",
    },
    {
      title: (
        <div className="flex items-center gap-1 opacity-0">
          <div>Actions</div>
        </div>
      ),
      key: "actions",
      render: (record, index) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Link href={`/dashboard/brands/${record["_id"]}/edit`}>
            {" "}
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaPen />
            </button>
          </Link>
          {/* <Link href={`/dashboard/brands/${record["_id"]}`}>
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaEye />
            </button>
          </Link> */}
          <button
            onClick={() => updateRecord(record._id)}
            className={`rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 cursor-pointer hover:!border-gray-900 hover:text-gray-700 ${
              record.status === "publish" &&
              " text-green-400 hover:!border-green-600 border-green-400 hover:text-green-600"
            }`}
          >
            <FaCheck />
          </button>
          <button
            onClick={() => deleteCategory(record["_id"])}
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
        <TableFilter
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          status={status}
          setStatus={setStatus}
          searchEvent={fetchCategory}
        />
        <Table
          data={props.data["results"]}
          tableColumn={columns}
          pagination={{
            total: props.data["total"],
            page: currentPage,
            limit: itemsPerPage,
            setPage: setCurrentPage,
            setLimit: setItemsPerPage,
          }}
        />
      </div>
      {/* {spinner} */}
    </div>
  );
};

export default BrandTable;
