"use client";
import React, { useEffect, useState } from "react";
import Heading from "../heading";
import Table from "@/components/global/element/Table";
// import Pagination from '@/components/global/element/pagination';
import PaginatedList from "@/components/global/element/pagination";
import TableFilter from "@/components/global/element/tableFilter";
import Link from "next/link";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { del, get } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";

const items = Array.from(Array(20).keys()).map((key) => key + 1);

const Categorytable = () => {
  const [axios, spinner] = useAxios();
  const options = [5, 10, 20, 50];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const fetchCategory = async (second) => {
    const query = {
      limit: itemsPerPage,
      page: currentPage,
      filter: JSON.stringify({ status: "", name: "" }),
    };
    const category = await get("/categories", query);
    setCategories(category);
  };

  useEffect(() => {
    fetchCategory();
  }, [itemsPerPage, currentPage]);

  const deleteCategory = async (id) => {
    console.log(id);
    const res = await del("/categories", id);
    res.statusCode == 200 && fetchCategory();
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name, // Enable sorting for this column
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      sorter: (a, b) => a.slug - b.slug, // Enable sorting for this column
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
          <Link href={`/dashboard/categories/${record["_id"]}/edit`}>
            {" "}
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaPen />
            </button>
          </Link>
          <Link href={`/dashboard/categories/${record["_id"]}`}>
            <button className="rizzui-action-icon-root inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 p-0.5 w-7 h-7 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30">
              <FaEye />
            </button>
          </Link>
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

  return (
    <div>
      <Heading
        data={undefined}
        label="Categories"
        btn={"category"}
        url={"/dashboard/categories/create"}
      />
      <div>
        <TableFilter searchValue={undefined} filterkeys={undefined} />
        <Table data={categories["results"]} tableColumn={columns} />
        <PaginatedList
          length={categories["total"]}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {spinner}
    </div>
  );
};

export default Categorytable;
