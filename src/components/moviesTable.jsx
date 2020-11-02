import React, { Component } from "react";
import Like from "./common/Like";
import Table from "./common/table";
class MoviesTable extends Component {
	columns = [
		{ path: "title", lable: "Title" },
		{ path: "genre.name", lable: "Genre" },
		{ path: "numberInStock", lable: "Stock" },
		{ path: "dailyRentalRate", lable: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
			)
		},
		{
			key: "delete",
			content: (movie) => (
				<button
					onClick={() => this.props.onDelete(movie)}
					className='btn btn-danger btn-sm'>
					Delete
				</button>
			)
		}
	];
	render() {
		const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
		return (
			<Table
				data={movies}
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				onLike={onLike}
				onDelete={onDelete}
			/>
		);
	}
}

export default MoviesTable;
