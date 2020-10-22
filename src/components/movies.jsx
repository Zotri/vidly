import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { paginate } from "../utils/paginate.js";
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
		const { pageSize, currentPage, movies: allMovies } = this.state;
		const { length: totalNumberOfMovies } = allMovies;

		// renders waht paginate finction returns
		const movies = paginate(allMovies, currentPage, pageSize);
		const { length: numberOfRenderedMoviesForEachPage } = movies;
		if (totalNumberOfMovies === 0) {
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
				<span>Found {totalNumberOfMovies} movies in the DB</span>
				<p>Showing {numberOfRenderedMoviesForEachPage} on this page</p>
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
						{movies.map((movie) => (
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
					itemsCount='abc'
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
