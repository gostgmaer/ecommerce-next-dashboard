"use client";
import React, { useState } from "react";
import Table from "rc-table";
import PaginatedList from "./pagination";

// import 'rc-table/assets/index.css';

const ProductTable = ({ data, tableColumn, pagination }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelect = (record) => {
    const selectedRowKeys = [...selectedRows];
    if (selectedRowKeys.includes(record._id)) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record._id), 1);
    } else {
      selectedRowKeys.push(record._id);
    }
    setSelectedRows(selectedRowKeys);
    setSelectAll(selectedRowKeys.length === data.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      const allRowKeys = data.map((record) => record._id);
      setSelectedRows(allRowKeys);
      setSelectAll(true);
    }
  };

  const isChecked = [
    {
      title: (
        <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
      ),
      dataIndex: "selection",
      key: "selection",
      render: (text, record) => (
        <input
          type="checkbox"
          onChange={() => handleSelect(record)}
          checked={selectedRows.includes(record._id)}
        />
      ),
    },
  ];

  var currentColumn = [...isChecked, ...tableColumn];

  return (
    <div className="relative">
      <Table
        className="[&_.rc-table-content]:overflow-x-auto rounded-t-none [&_table]:w-full [&_.rc-table-row:hover]:bg-gray-50 [&_.rc-table-row-expand-icon-cell]:w-14 [&_thead]:text-left [&_thead]:rtl:text-right [&_th.rc-table-cell]:uppercase [&_th.rc-table-cell]:text-xs [&_th.rc-table-cell]:w-max [&_th.rc-table-cell]:font-semibold [&_th.rc-table-cell]:tracking-wider [&_th.rc-table-cell]:text-gray-500 [&_.rc-table-cell]:px-3 [&_th.rc-table-cell]:py-3 [&_td.rc-table-cell]:py-4 [&_thead_th]:bg-gray-100 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell] [&_td.rc-table-cell]:border-gray-200/70 [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100 overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0 rc-table-ping-right [&_rc-table-cell]:capitalize rc-table-scroll-horizontal"
        columns={currentColumn}
        data={data}
        rowKey={(record) => record.key}
      />
     {pagination && <PaginatedList totalItems={pagination.total} limit={pagination.limit} currentPage={pagination.page} setPage={pagination.setPage} setLimit={pagination.setLimit} />}
    </div>
  );
};

export default ProductTable;
