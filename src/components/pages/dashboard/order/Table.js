"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
// import Pagination from '@/components/global/element/pagination';

import TableFilter from "@/components/global/element/tableFilter";
import { del, get, patch } from "@/lib/http";

import { useSession } from "next-auth/react";
import { Select } from "@/components/global/fields/SelectField";
import { orderStatus } from "@/assets/static/data";


const Datatable = () => {
  const { data: session } = useSession()
  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");
  const [setstatusData, setSetstatusData] = useState('');

  const fetch = async (statuskey) => {
    const header = {
      Authorization: "Bearer " + session?.["accessToken"],
    }
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
  // useEffect(() => {

  // }, [setstatusData]);

  const cancelOrder = async (id) => {

    const res = await patch("/orders", { status: "cancel" }, id);
    res.statusCode == 200 && fetch();
  };

  const updateRecord = async (id, status = 'confirmed') => {
    console.log(session);

    const header = {
      Authorization: "Bearer " + session?.["accessToken"],
    }
    const res = await patch("/orders", { status: status }, id, header);
    res.statusCode == 200 && fetch();
  };
  const columns = [
    {
      title: "Order id",
      dataIndex: "order_id",
      key: "order_id",

    },
    {
      title: "ORDER TIME",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.name - b.name, // Enable sorting for this column
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
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title:"Actions",
      key: "actions",
      render: (record, index) => (
        <div className="flex items-center justify-start gap-3">
       

          <Select className="flex items-center justify-start gap-2" options={orderStatus} id={"order-status-data"} additionalAttrs={{ onChange: (e) => updateRecord(record._id, e.target.value), value: record.status }} placeholder={"Select"} optionkeys={{ key: "key", value: "label" }} label={undefined}>

          </Select>


        </div>
      ),
    },
  ];

  return (
    <div>
      <Heading
        data={undefined}
        label="Orders"
        btn={undefined}
        url={undefined} exportevent={undefined} />
      <div>
        <TableFilter
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          status={status}
          setStatus={setStatus}
          searchEvent={fetch}
        />
        <Table data={categories["results"]} tableColumn={columns} pagination={{ total: categories["total"], page: currentPage, limit: itemsPerPage, setPage: setCurrentPage, setLimit: setItemsPerPage }} />
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

export default Datatable;
