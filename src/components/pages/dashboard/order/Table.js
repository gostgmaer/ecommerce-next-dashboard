"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
// import Pagination from '@/components/global/element/pagination';

import TableFilter from "@/components/global/element/tableFilter";
import { del, get, patch, put } from "@/lib/http";

import { useSession } from "next-auth/react";
import { Select } from "@/components/global/fields/SelectField";
import { orderStatus } from "@/assets/static/data";
import Link from "next/link";
import moment from "moment";
import { generateUrlFromNestedObject } from "@/helper/function";
import { useRouter } from "next/navigation";

const Datatable = (props) => {
  const { data: session } = useSession();
  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");
  const [setstatusData, setSetstatusData] = useState("");
  const route = useRouter();

  const loadorder = React.useCallback(() => {
    const query = {
      limit: itemsPerPage,
      page: currentPage,
    };
    const checkQuerydata = generateUrlFromNestedObject({ ...query });
    route.push(`/dashboard/orders${checkQuerydata}`);
  }, [itemsPerPage, currentPage, route]);

  useEffect(() => {
    loadorder();
  }, [loadorder]);

  // const fetch = async (statuskey) => {
  //   const header = {
  //     Authorization: "Bearer " + session?.["accessToken"],
  //   }
  //   const query = {
  //     limit: itemsPerPage,
  //     page: currentPage,
  //     filter: JSON.stringify({ status: statuskey }),
  //     search: JSON.stringify({ name: searchKey }),
  //   };

  //   const orders = await get("/orders", query, null, header);
  //   setOrder(orders);
  // };

  // useEffect(() => {
  //   fetch();
  // }, [itemsPerPage, currentPage]);
  // useEffect(() => {

  // }, [setstatusData]);

  const cancelOrder = async (id) => {
    const res = await patch("/orders", { status: "cancel" }, id);
    // res.statusCode == 200 && fetch();
  };

  const updateRecord = async (id, status = "confirmed") => {
    console.log(session);

    const header = {
      Authorization: "Bearer " + session?.["accessToken"],
    };
    const res = await put("/orders", { status: status }, id, header);
    // res.statusCode == 200 && fetch();
  };
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
        <div className={`status-${record.payment_status} capitalize`}>
          {record.payment_status}
        </div>
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
        <div className={`status-${record.status} capitalize`}>
          {record.status}
        </div>
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
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        console.log(record.status != "completed", record);
        
        return (
          <div className="flex items-center justify-start gap-3">
           <Select
                className="flex items-center justify-start gap-2"
                options={orderStatus}
                id={"order-status-data"}
                // disabled={record.status !== "completed"}
                additionalAttrs={{
                  onChange: (e) => updateRecord(record._id, e.target.value),
                  value: record.status, disabled: record.status === "completed"
                }}
                placeholder={"Select"}
                optionkeys={{ key: "key", value: "label" }}
                label={undefined}
              ></Select>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Heading
        data={undefined}
        label="Orders"
        btn={undefined}
        url={undefined}
        exportevent={undefined}
      />
      <div>
        <TableFilter
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          status={status}
          setStatus={setStatus}
          searchEvent={fetch}
        />
        <Table
          data={props.orders?.["results"]}
          tableColumn={columns}
          pagination={{
            total: props.orders?.["total"],
            page: currentPage,
            limit: itemsPerPage,
            setPage: setCurrentPage,
            setLimit: setItemsPerPage,
          }}
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

export default Datatable;
