import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const DataTable = ({data, team, fastestTeams, doTier}) => {
    const [tableData, setTableData] = useState([]);
    const [sortField, setSortField] = useState("map_name");
    const [order, setOrder] = useState("asc");

    var runs = data.runs

    // default sort by map name
    useEffect(() => {const sortedRuns = [...runs].sort((a, b) => {
                        return (
                            a["map_name"].toString().localeCompare(b["map_name"].toString(), "en", {numeric: true,})
                        );}); 
                        setTableData(sortedRuns)}
            , []);

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
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
            if(sortField==="time" && a["time"].length != b["time"].length){
                // properly sort times with different lengths. E.g. sub1 minute and >1minute
                if(a["time"].length < b["time"].length) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                return a[sortField].toString().localeCompare(b[sortField].toString(), "en", {numeric: true,}) * (sortOrder === "asc" ? 1 : -1);
            }
         });
         setTableData(sorted);
        }
       };

    return (
        <table>
            <thead>
                <tr>
                {columns.map(({ label, accessor }) => {
                    if(!doTier && accessor === "tier") { return}
                    else {return <th key={accessor} onClick={() => handleSortingChange(accessor)}>{label}</th>;}     
                })}
                </tr>
            </thead>
            <tbody>
                {tableData.map((runs, i) => {
                    return (
                    <tr key={i}>
                        {columns.map(({ accessor }) => {
                            if(!doTier && accessor === "tier") { return}
                            else {return <td style={{background: team && team==fastestTeams[runs["map_name"]]?"gold":""}} 
                                                key={accessor}>{runs[accessor] ? runs[accessor] : "——"}</td>}
                        })}
                    </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default DataTable;