"use client";
import React, { useEffect, useState } from "react";

import Table from "@/components/global/element/Table";
import {  get } from "@/lib/http";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Heading from "../../heading";
import moment from "moment";

const Recentordrs = () => {
  const { data: session } = useSession();
  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetch = async (statuskey) => {
    const header = {
      Authorization: "Bearer " + session?.["accessToken"],
    };
    const query = {
      limit: itemsPerPage,
      page: currentPage,
      filter: JSON.stringify({ status: statuskey }),
      search: JSON.stringify({ name: searchKey }),
    };

    const category = await get("/orders", query, null, header);
    setCategories(category);
  };

  useEffect(() => {
    fetch();
  }, [itemsPerPage, currentPage]);


  const columns = [
    {
      title: "Order id",
      dataIndex: "order_id",
      key: "order_id",
      render: (index, record) => (
        <Link
          href={`/dashboard/orders/${record["order_id"]}`}
          className="flex items-center justify-start text-blue-500"
        >
          {`#${record.order_id}`}
        </Link>
      ),
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.name - b.name, // Enable sorting for this column
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
    {
      title: "Customer Name",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.name - b.name,
      render: (index, record) => (
        <div className="flex items-center justify-start">
          {`${record.firstName} ${record.lastName}`}
        </div>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
       render: (index, record) => (
        <div className={`status-${record.payment_status}`}>{record.payment_status}</div>
      ),
    },
   
    {
      title: "Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
       render: (index, record) => (
        <div className={`status-${record.status}`}>{record.status}</div>
      ),
    },
     
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (index, record) => (
        <div className="flex items-center justify-start">
          {`$${Number(record?.totalPrice).toFixed(2)}`}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Heading
        data={undefined}
        label="Recent Orders"
        isbedcrumb={false}
        btn={'View All'}
        ishow={false}
        url={'/dashboard/orders'}
        exportevent={undefined}
        isAdd={false}
      />
      <div>
        <Table
          data={categories["results"]}
          tableColumn={columns}
          pagination={undefined}
        />
        {/* <PaginatedList
          length={categories["total"]}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>
    </div>
  );
};

export default Recentordrs;
