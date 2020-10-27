import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService.js";
import { getMovies } from "../services/fakeMovieService.js";
import { paginate } from "../utils/paginate.js";
import Like from "./common/Like";
import ListGroup from "./common/ListGroup.jsx";
import Paging from "./common/Paging.jsx";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1
	};

	componentDidMount() {
		this.setState({ movies: getMovies(), genres: getGenres() });
	}

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
	handleGenreSelect = (genre) => {
		console.log("slectedItem", genre);
		this.setState({ selectedGenre: genre });
	};
	render() {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre
		} = this.state;
		const { length: totalNumberOfMovies } = allMovies;
		// apply fliter before pagination to set page number properly to the number of filtered movies
		const filteredMovies = selectedGenre
			? allMovies.filter((m) => m.genre._id === selectedGenre._id)
			: allMovies;
		// renders what paginate function returns
		const movies = paginate(filteredMovies, currentPage, pageSize);

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
			<div className='row'>
				<div className='col-3'>
					<div className='row'>
						<span>Found {totalNumberOfMovies} movies in the DB</span>
						<p>Showing {filteredMovies.length} on this page</p>
					</div>
					<ListGroup
						items={this.state.genres}
						selectedItemFromGenre={this.state.selectedGenre}
						onSelecteItem={this.handleGenreSelect}
					/>
				</div>
				<div className='col'>
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
						itemsCount={filteredMovies.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
