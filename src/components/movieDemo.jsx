import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";

class MoviesDemo extends Component {
	state = {
		movies: getMovies()
	};
	handleDelete = (movie) => {
		console.log(movie);
		const moviesAfterDeletion = this.state.movies.filter(
			(m) => m._id !== movie._id
		);
		this.setState({ movies: moviesAfterDeletion });
	};
	render() {
		const { length: size } = this.state.movies;

		if (size === 0) {
			return <p>There are no movies left in the DB!</p>;
		}

		return (
			<React.Fragment>
				<p>Showing {size} movies in the DB</p>
				<table className='table'>
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										className='btn btn-danger btn-sm'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

export default MoviesDemo;
