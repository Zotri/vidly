import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ data, columns, sortColumn, onSort, onLike, onDelete }) => {
	return (
		<table className='table'>
			<TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
			<TableBody
				data={data}
				columns={columns}
				onLike={onLike}
				onDelete={onDelete}
			/>
		</table>
	);
};

export default Table;
