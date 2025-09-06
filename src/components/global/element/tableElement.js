
"use client";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { ServerSideRowModelModule } from 'ag-grid-enterprise';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule, ServerSideRowModelModule]);

const GridComponent = ({
  apiUrl,
  columns = [],
  height = "80vh",
  defaultsort,
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: false,
    flex: 1,
    minWidth: 100,
  },
}) => {
  const gridApiRef = useRef(null);
  const columnApiRef = useRef(null);
  const prevSortRef = useRef(defaultsort);
  const prevFilterRef = useRef("");
  const prevPageRef = useRef(0);
  const prevPageSizeRef = useRef(0);
  const prevTotalRef = useRef(0);
  const debounceTimer = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState(0);

  const getSafeSortModel = useCallback(() => {
    const api = gridApiRef.current;
    const state = api?.getColumnState() || [];
    return state
      .filter((s) => s.sort)
      .map((sd) => ({ colId: sd.colId, sort: sd.sort }));
  }, []);

  const serializeSort = (sortModel) =>
    sortModel.map((s) => `${s.colId}:${s.sort}`).join("|");
  const fetchData = useCallback(
    async (reason = "") => {
      const api = gridApiRef.current;
      if (!api || !apiUrl) return;
      const sortModel = getSafeSortModel();
      const sortKey = serializeSort(sortModel);
      const filterModel = api.getFilterModel?.() || {};
      const filterKey = JSON.stringify(filterModel);

      const currentPage = api.paginationGetCurrentPage?.() ?? 0;
      const currentPageSize = api.paginationGetPageSize?.() ?? 20;

      const changed =
        sortKey !== prevSortRef.current ||
        filterKey !== prevFilterRef.current ||
        currentPage !== prevPageRef.current ||
        currentPageSize !== prevPageSizeRef.current;

      if (!changed && reason !== "gridReady") return;

      prevSortRef.current = sortKey;
      prevFilterRef.current = filterKey;
      prevPageRef.current = currentPage;
      prevPageSizeRef.current = currentPageSize;

      const params = new URLSearchParams({
        page: String(currentPage + 1),
        limit: String(currentPageSize), // <-- add this line
        sort: sortKey || defaultsort,
        filter: filterKey,
        type: "ag-grid", // <-- add this line
      });

      // Place params in the browser URL query string
      if (typeof window !== "undefined") {
        const url = new URL(window.location);
        url.search = params.toString();
        window.history.replaceState({}, '', url);
      }

      try {
        const res = await apiUrl(params.toString());
        console.log(res);

        setRowData(Array.isArray(res.results) ? res.results : []);
        // api.setRowCount(res.total, true);
        console.log(gridApiRef.current);

        // gridApiRef.current?.paginationSetRowCount(res.total, false); // false = reset page index
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    [apiUrl, getSafeSortModel]
  );
  // ...existing code...
  const getRowId = useCallback(function (params) {
    return params.data._id;
  }, []);
  // const onGridReady = useCallback(
  //   (params) => {
  //     gridApiRef.current = params.api;
  //     columnApiRef.current = params.columnApi;
  //     fetchData("gridReady");
  //   }
  //  ,[fetchData]
  // );


   const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);
  const onGridReady = useCallback((params) => {
    gridApiRef.current = params.api;
    columnApiRef.current = params.columnApi;

    params.api.setServerSideDatasource(serverSideDatasource);
  }, []);
  const onSortChanged = useCallback(() => {
    fetchData("sortChanged");
  }, [fetchData]);

  const onFilterChanged = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchData("filterChanged"), 300);
  }, [fetchData]);

  const onPaginationChanged = useCallback(() => {
    fetchData("paginationChanged");
  }, [fetchData]);

  const serverSideDatasource = {
    getRows: async (params) => {
      const { request } = params;
      const { startRow, endRow, sortModel, filterModel } = request;

      const page = Math.floor(startRow / 20) + 1;
      const limit = endRow - startRow;
console.log(params,request);

      const sortKey = serializeSort(sortModel);
      const filterKey = JSON.stringify(filterModel);

      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sort: sortKey || defaultsort,
        filter: filterKey,
        type: "ag-grid",
      });

      try {
        const res = await apiUrl(query.toString());

        const rows = Array.isArray(res.results) ? res.results : [];
        const totalRows = typeof res.total === "number" ? res.total : rows.length;
// console.log(params);

        params.success({rowData: rows, rowCount:totalRows});
      } catch (err) {
        console.error("Server-side fetch error:", err);
        params.fail();
      }
    },
  };


  return (
    <div style={{ height }} className="ag-theme-alpine">
      {/* <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        enableRowPinning={true}
        pagination={true}
        paginationPageSize={20}
        enableCellTextSelection={true}
        paginationPageSizeSelector={true}
        // grandTotalRow={1000}
        // rowModelType={'clientSide'}
        rowSelection={{
          mode: "multiRow",
        }}
        //   rowSelection={rowSelection}
        //  rowModelType={"infinite"}
        //   cacheBlockSize={100}
        //   cacheOverflowSize={2}
        //   maxConcurrentDatasourceRequests={2}
        //   infiniteInitialRowCount={1}
        //   maxBlocksInCache={2}
          getRowId={getRowId}
        // datasource={{ rowData, total }} 
        onRowResizeStarted={onPaginationChanged}
        paginationAutoPageSize={false}
        onGridReady={onGridReady}
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
        onPaginationChanged={onPaginationChanged}
        animateRows={true}
      /> */}

      <AgGridReact
        rowModelType="serverSide"
        serverSideDatasource={serverSideDatasource}
        columnDefs={columns}
           rowSelection={{
          mode: "multiRow",
        }}
        defaultColDef={defaultColDef}
        pagination={true}
        // rowSelection={rowSelection}
        paginationPageSize={20}
        cacheBlockSize={20}
        animateRows={true}
        getRowId={getRowId}
      />
    </div>
  );
};

export default GridComponent;


