
"use client";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridComponent = ({
  apiUrl,
  columns = [],
  height = "80vh",
  defaultsort ,
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
  const debounceTimer = useRef(null);
  const [rowData, setRowData] = useState([]);

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
    } catch (err) {
      console.error("Fetch error:", err);
    }
  },
  [apiUrl, getSafeSortModel]
);
// ...existing code...

  const onGridReady = useCallback(
    (params) => {
      gridApiRef.current = params.api;
      columnApiRef.current = params.columnApi;
      fetchData("gridReady");
    }
   ,[fetchData]
  );

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

  return (
    <div style={{ height }} className="ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        enableRowPinning={true}
        pagination={true}
        paginationPageSize={20}
        enableCellTextSelection={true}
        paginationPageSizeSelector={true}
        rowSelection={{
          mode: "multiRow",
        }}
        onRowResizeStarted={onPaginationChanged}
        paginationAutoPageSize={false}
        onGridReady={onGridReady}
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
        onPaginationChanged={onPaginationChanged}
        animateRows={true}
      />
    </div>
  );
};

export default GridComponent;


