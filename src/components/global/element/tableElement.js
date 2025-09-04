
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
  // pageSize = 20,
  height = "80vh",
  defaultColDef = {
    sortable: true,
    filter: true,
    // floatingFilter: true,
    resizable: false,
    flex: 1,
    minWidth: 100,
  },
}) => {
  const gridApiRef = useRef(null);
  const columnApiRef = useRef(null);

  const prevSortRef = useRef("");
  const prevFilterRef = useRef("");
  const prevPageRef = useRef(0);
  const debounceTimer = useRef(null);

  const [rowData, setRowData] = useState([]);
  const [pageSize, setPageSize] = useState(20);

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
      const currentPageSize = api.paginationGetPageSize?.() ?? pageSize;

      const changed =
        sortKey !== prevSortRef.current ||
        filterKey !== prevFilterRef.current ||
        currentPage !== prevPageRef.current;

      if (!changed && reason !== "gridReady") return;

      prevSortRef.current = sortKey;
      prevFilterRef.current = filterKey;
      prevPageRef.current = currentPage;

      const startRow = currentPage * currentPageSize;
      const endRow = startRow + currentPageSize;

      const params = new URLSearchParams({
        start: startRow,
        end: endRow,
        sort: sortKey,
        filter: filterKey,
      });

      try {
        const res = await apiUrl(params);
        console.log(res);

        setRowData(Array.isArray(res.results) ? res.results : []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    [apiUrl, getSafeSortModel, pageSize]
  );

  const onGridReady = useCallback(
    (params) => {
      gridApiRef.current = params.api;
      columnApiRef.current = params.columnApi;
      fetchData("gridReady");
    }
      // gridApiRef.current = params.api;
      // columnApiRef.current = params.columnApi;
      // fetchData("gridReady");

   ,[fetchData]
  );

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    gridApiRef.current.paginationSetPageSize(newSize);
    gridApiRef.current.refreshServerSideStore({ purge: true });
    fetchData("pageSizeChanged");
  };

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
        paginationPageSize={pageSize}
        // enableAdvancedFilter={true}
        enableCellTextSelection={true}
        paginationPageSizeSelector={true}
        cacheBlockSize={pageSize}

        onRowResizeStarted={onPaginationChanged}
        paginationAutoPageSize={false}
        onGridReady={onGridReady}
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
        onPaginationChanged={onPaginationChanged}
        // rowModelType="infinite"
        // ServerSideRowModelModule ={true}
        animateRows={true}
      />
    </div>
  );
};

export default GridComponent;
