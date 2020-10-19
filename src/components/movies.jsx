import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import Like from "./common/Like";
import Paging from "./common/Paging.jsx";

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1
	};
	handleDelete = (movie) => {
		console.log("from deletion btn movies", this.state.movies);
		const moviesAfterDeletion = this.state.movies.filter(
			(m) => m._id !== movie._id
		);
		this.setState({ movies: moviesAfterDeletion });
	};
	handleReset = () => {
		this.setState({ movies: getMovies() });
	};
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};
	render() {
		const { length: size } = this.state.movies;
		const { pageSize, currentPage } = this.state;
		if (size === 0) {
			return (
				<div>
					<p>There are no movies left in the DB!</p>
					<button
						onClick={() => this.handleReset()}
						className='btn-group-lg btn-sm'>
						click here to restore DB!
					</button>
				</div>
			);
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
									<Like
										liked={movie.liked}
										onClick={() => this.handleLike(movie)}
									/>
								</td>
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
				<Paging
					itemsCount={size}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
