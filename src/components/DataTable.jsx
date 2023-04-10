import React from 'react';

const DataTable = (props) => {
    var name = Object.keys(props.data)[0];
    var runs = Object.values(props.data)[0];

    const columns = [
        { label: "Map", accessor: "map_name" },
        { label: "Tier", accessor: "tier" },
        { label: "Time", accessor: "time" },
        { label: "Points", accessor: "points" },
       ];

    return (
        <table>
            <thead>
                <tr>
                {columns.map(({ label, accessor }) => {
                return <th key={accessor}>{label}</th>;
                })}
                </tr>
            </thead>
            <tbody>
                {runs.map((runs, i) => {
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