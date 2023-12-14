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

const UserTable = () => {
  const [axios, spinner] = useAxios();
  const options = [5, 10, 20, 50];
  const [users, setusers] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");

  const loadusers = async (statuskey) => {
    const query = {
      limit: itemsPerPage,
      page: currentPage,
      filter: JSON.stringify({ status: statuskey }),
      search: JSON.stringify({ name: searchKey }),
    };
    const response = await get("/users", query);
    setusers(response);
    // setItems(Array.from(Array(response.total).keys()).map((key) => key + 1));
  };

  //  const items = Array.from(Array(20).keys()).map((key) => key + 1);

  useEffect(() => {
    loadusers(status);
  }, [itemsPerPage, currentPage]);

  const DeleteProduct = async (id) => {
    const res = await del("/users", id);
    res.statusCode == 200 && loadusers();
  };

  const updateRecord = async (id) => {
    const res = await patch("/users", { status: "publish" }, id);
    res.statusCode == 200 && loadusers();
  };
  const columns = [
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id"
    },
    {
      title: "Image",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (text, record) => (
        <div className=" flex gap-1 items-center justify-start">
          <Image
            width={50}
            height={50}
            className=" rounded-2xl"
            src={record.profilePicture}
            alt={record.profilePicture}
            style={{ maxWidth: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username - b.username, // Enable sorting for this column
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "is Verified",
      dataIndex: "isVerified",
      key: "isVerified",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
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
          <Link href={`/dashboard/users/${item._id}/edit`}>
           
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaPen />
            </button>
          </Link>
          <Link href={`/dashboard/users/${item._id}`}>
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaEye />
            </button>
          </Link>
          <button
            onClick={() => updateRecord(item._id)}
            className={`rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 cursor-pointer hover:!border-gray-900 hover:text-gray-700 ${
              item.status === "publish" &&
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

  return (
    <div>
      <Heading
        data={undefined}
        label={"users"}
        btn={undefined}
        url={"/dashboard/users/create"}
      />
      <div>
        <TableFilter
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          status={status}
          setStatus={setStatus}
          searchEvent={loadusers}
        />
        <Table data={users["results"]} tableColumn={columns} />
        <PaginatedList
          length={users["total"]}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserTable;
