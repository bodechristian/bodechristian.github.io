import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const DataTable = ({data}) => {
    const [tableData, setTableData] = useState([]);
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    var name = Object.keys(data)[0];
    var runs = Object.values(data)[0];

    useEffect(() => setTableData(runs), []);

    const columns = [
        { label: "Map", accessor: "map_name" },
        { label: "Tier", accessor: "tier" },
        { label: "Time", accessor: "time" },
        { label: "Points", accessor: "points" },
       ];

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    const handleSorting = (sortField, sortOrder) => {
        console.log(sortField);
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) * (sortOrder === "asc" ? 1 : -1)
          );
         });
         setTableData(sorted);
        }
       };

    return (
        <table>
            <thead>
                <tr>
                {columns.map(({ label, accessor }) => {
                return <th key={accessor} onClick={() => handleSortingChange(accessor)}>{label}</th>;
                })}
                </tr>
            </thead>
            <tbody>
                {tableData.map((runs, i) => {
                    return (
                    <tr key={i}>
                        {columns.map(({ accessor }) => {
                        const tData = runs[accessor] ? runs[accessor] : "——";
                        return <td key={accessor}>{tData}</td>;
                        })}
                    </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default DataTable;