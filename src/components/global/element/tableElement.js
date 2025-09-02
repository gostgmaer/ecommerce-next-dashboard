'use client';
import { AgGridReact } from 'ag-grid-react';
import { useState, useRef, useCallback } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridComponent = () => {
    const gridApiRef = useRef(null);
    const columnApiRef = useRef(null);

    const prevSortRef = useRef('');
    const prevFilterRef = useRef('');
    const prevPageRef = useRef(0);
    const sizeRef = useRef(null);
    const debounceTimer = useRef(null);

    const [rowData, setRowData] = useState([]);
    const [columnDefs] = useState([
        { field: 'athlete', sortable: true},
        { field: 'age', sortable: true },
        { field: 'date', sortable: true },
        { field: 'country', sortable: true, },
        { field: 'sport', sortable: true,  },
        { field: 'gold', sortable: true },
        { field: 'silver', sortable: true },
        { field: 'bronze', sortable: true },
        { field: 'total', sortable: true },
    ]);

    // const pageSize = 20;

    const getSafeSortModel = useCallback(() => {

        const api = gridApiRef.current;
        const state = api.getColumnState() || [];
        const sortModel = state.filter(s => s.sort).map(sd => ({ colId: sd.colId, sort: sd.sort }));
        return sortModel;
    }, []);

    const serializeSort = (sortModel) =>
        sortModel.map(s => `${s.colId}:${s.sort}`).join('|');

    const fetchData = useCallback(async (reason = '') => {
        const api = gridApiRef.current;
        if (!api) return;

        const sortModel = getSafeSortModel();
        const sortKey = serializeSort(sortModel);


        const filterModel = api.getFilterModel?.() || {};
        const filterKey = JSON.stringify(filterModel);

        const currentPage = api.paginationGetCurrentPage?.() ?? 0;
        const pageSize = api.paginationGetPageSize?.() ?? 20;

        // Guard: only fetch if something actually changed
        // console.log('Fetch:', { reason, currentPage, sortKey, filterKey, pageSize, sizeRef, prevPageRef });

        const changed =
            sortKey !== prevSortRef.current ||
            filterKey !== prevFilterRef.current ||
            currentPage !== prevPageRef.current;

        if (!changed && reason !== 'gridReady') return;

        prevSortRef.current = sortKey;
        prevFilterRef.current = filterKey;
        prevPageRef.current = currentPage;
        const startRow = currentPage * pageSize;
        const endRow = startRow + pageSize;

        const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';


        const res = await fetch(url);
        const data = await res.json();
        setRowData(Array.isArray(data) ? data : (data.rows || []));
    }, []);

    const onGridReady = useCallback((params) => {
        gridApiRef.current = params.api;
        columnApiRef.current = params.columnApi;
        // params.api.paginationGetPageSize();
        fetchData('gridReady');
    }, [fetchData]);

    const onSortChanged = useCallback((params) => {
        fetchData('sortChanged');
    }, [fetchData]);

    const onFilterChanged = useCallback(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchData('filterChanged'), 250);
    }, [fetchData]);

    const onPaginationChanged = useCallback(() => {
        fetchData('paginationChanged');
    }, [fetchData]);



    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ sortable: true, filter: false }}
                pagination={true}
                serverSideEnableClientSideSort={true}
                // paginationPageSize={sizeRef.current}
                onGridReady={onGridReady}
                onSortChanged={onSortChanged}
                onFilterChanged={onFilterChanged}
                onPaginationChanged={onPaginationChanged}
                // onRowHeightChanged={handlePageSizeChange}
                animateRows={true}
            />
        </div>
    );
};

export default GridComponent;


