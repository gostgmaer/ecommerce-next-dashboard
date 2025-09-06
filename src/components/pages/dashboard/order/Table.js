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
import GridComponent from "@/components/global/element/tableElement";
import OrderServices from "@/helper/services/OrderServices";

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

  // const loadorder = React.useCallback(() => {
  //   const query = {
  //     limit: itemsPerPage,
  //     page: currentPage,
  //   };
  //   const checkQuerydata = generateUrlFromNestedObject({ ...query });
  //   route.push(`/dashboard/orders${checkQuerydata}`);
  // }, [itemsPerPage, currentPage, route]);

  // useEffect(() => {
  //   loadorder();
  // }, [loadorder]);

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
      field: "order_id",
      sortable: true,
      headerName: " ID",
      // key: "order_id",

      cellRenderer: (params) => {
        const { title, images } = params.data;
        return (
          <Link
            href={`/dashboard/orders/${params.data["order_id"]}`}
            className="flex items-center justify-start text-blue-500"
          >

            {`#${params.data["order_id"]}`}
          </Link>
        );
      },

      headerClass: "header-product",

      minWidth: 300,


    },

    {
      title: "createdAt",
      headerName: " Order Date",
      sortable: true,
      cellRenderer: (params) => {
        // const { title, images } = params.data;
        return (
          <div className="flex items-center justify-start">
            {`${params.data.createdAt
              ? moment(params.data.createdAt).format("DD MMM YYYY, h:mm a")
              : ""
              }`}
          </div>
        );
      },
      // sorter: (a, b) => a.name - b.name, // Enable sorting for this column

    },
    {
      headerName: "Customer Name",
      sortable: true,
      // dataIndex: "customerName",
      field: "customerName",
      // sorter: (a, b) => a.name - b.name,


      cellRenderer: (params) => {
        // const { title, images } = params.data;
        return (
          <div className="flex items-center justify-start">
            {`${params.data.firstName} ${params.data.lastName}`}
          </div>
        );
      },


    },
    {
      headerName: "Payment Status",
      field: "payment_status",
      sortable: true,
       cellRenderer: (params) => {
        // const { title, images } = params.data;
        return (
          <div className={`status-${params.data.payment_status} capitalize`}>
          {params.data.payment_status}
        </div>
        );
      },
      // render: (index, record) => (
      //   <div className={`status-${record.payment_status} capitalize`}>
      //     {record.payment_status}
      //   </div>
      // ),
    },

    {
    
       headerName: "Payment Method",
      field: "payment_method",
      sortable: true,
    },
    {
      headerName: "Order Status",
      field: "status",
       sortable: true,
        cellRenderer: (params) => {
          // const { title, images } = params.data;
          return (
            <div className={`status-${params.data.status} capitalize`}>
            {params.data.status}
          </div>
          );
        },
     
    },

    {
      headerName: "Amount",
      field: "totalPrice",
     sortable: true,
      cellRenderer: (params) => {
        // const { title, images } = params.data;
        return (
          <div className="flex items-center justify-start">
          {`$${Number(params.data?.totalPrice).toFixed(2)}`}
        </div>
        );
      },
     
    },
    {
      title: "Actions",
       sortable: false,
      key: "actions",
       filter: false,
      cellRenderer: (param) => {
        // console.log(record.status != "completed", record);

        return (
          <div className="flex items-center justify-start gap-3">
          {param.data.status !== "completed" && <Select
              className="flex items-center justify-start gap-2"
              options={orderStatus}
              id={"order-status-data"}
              // disabled={record.status !== "completed"}
              additionalAttrs={{
                onChange: (e) => updateRecord(param.data._id, e.target.value),
                value: param.data.status, disabled: param.data.status === "completed"
              }}
              placeholder={"Select"}
              optionkeys={{ key: "key", value: "label" }}
              label={undefined}
            ></Select>}
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
        {/* <TableFilter
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          status={status}
          setStatus={setStatus}
          searchEvent={fetch}
        /> */}
        <GridComponent
          defaultsort={'createdAt:desc'}
          columns={columns}
          apiUrl={OrderServices.getOrders}
        />
      </div>
    </div>
  );
};

export default Datatable;
