import React, { Component } from "react";
import Like from "./common/Like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
	columns = [
		{ path: "title", lable: "Title" },
		{ path: "genre.name", lable: "Genre" },
		{ path: "numberInStock", lable: "Stock" },
		{ path: "dailyRentalRate", lable: "Rate" },
		{},
		{}
	];
	render() {
		const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
		return (
			<table className='table'>
				<TableHeader
					onSort={onSort}
					sortColumn={sortColumn}
					columns={this.columns}
				/>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like liked={movie.liked} onClick={() => onLike(movie)} />
							</td>
							<td>
								<button
									onClick={() => onDelete(movie)}
									className='btn btn-danger btn-sm'>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default MoviesTable;
