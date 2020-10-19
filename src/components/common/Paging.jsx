import React, { Component } from "react";
import _ from "lodash";

const Paging = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
	const pageCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pageCount + 1);
	console.log("currentPage", currentPage);
	if (itemsCount === pageSize) {
		return <nav></nav>;
	}

	return (
		<nav>
			<ul className='pagination'>
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page-item"}>
						<a className='page-link' onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Paging;
