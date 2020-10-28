/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paging = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
	const pageCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pageCount + 1);
	if (itemsCount === pageSize) {
		return <div></div>;
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

Paging.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired
};

export default Paging;
