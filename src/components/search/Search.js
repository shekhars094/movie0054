import React, { useState } from "react";

import Modal from "react-modal";

import StarRatingComponent from "react-star-rating-component";

const Search = () => {
	const [values, setValues] = useState({
		titleOrId: "",
		search: "",
		year: "",
		type: "",
	});

	const [results, setResults] = useState([]);
	const [close, setClose] = useState(false);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
		setResults([]);
	};

	const handleSubmit = async () => {
		const { titleOrId, search, year, type } = values;

		const response = await fetch(
			`https://www.omdbapi.com/?i=${titleOrId}&s=${search}&y=${year}&type=${type}&apikey=8b4e12f4`
		);
		const data = await response.json();

		setResults([...results, ...data.Search]);
	};

	return (
		<>
			<form className="row" style={{ marginTop: "30px" }}>
				<div className="col-sm-2 form-group d-inline-block mr-20">
					<select
						className="form-control"
						value={values.titleOrId}
						id="exampleFormControlSelect1"
						onChange={handleChange("titleOrId")}>
						<option defaultValue>Search By</option>
						<option value="t">Title</option>
						<option value="i">Id</option>
					</select>
				</div>

				<div className="col-sm-3 form-group d-inline-block">
					<input
						type="text"
						className="form-control"
						placeholder="Search"
						value={values.search}
						onChange={handleChange("search")}></input>
				</div>

				<div className="col-sm-3 form-group d-inline-block">
					<input
						type="text"
						className="form-control"
						placeholder="Year"
						value={values.year}
						onChange={handleChange("year")}></input>
				</div>
				<div className="col-sm-2 w-30 form-group d-inline-block mr-20">
					<select
						className="form-control"
						id="exampleFormControlSelect1"
						onChange={handleChange("type")}>
						<option defaultValue>Type</option>
						<option value="movie">Movies</option>
						<option value="series">Series</option>
						<option value="episode">Episodes</option>
					</select>
				</div>

				<div
					className="col-sm-2 btn btn-primary form-control"
					onClick={handleSubmit}>
					Search
				</div>
			</form>

			{results.map((movie, index) => {
				return (
					<div key={index} className="d-inline-flex flex-row">
						<div className="m-3">
							<img
								src={movie.Poster}
								className="img-fluid"
								alt=""
								onClick={() => setClose(true)}
							/>
							<div>
								<p>{movie.Title}</p>
							</div>
						</div>
						<Modal
							isOpen={close}
							style={{ width: "50%" }}
							onRequestClose={() => setClose(false)}>
							<h1 className="text-center">{movie.Title}</h1>
							<img
								src={movie.Poster}
								className="img-fluid"
								alt=""
								style={{ display: "block", margin: "0 auto" }}
							/>
							<p className="text-center">
								Release Year:
								{movie.Year}
							</p>

							<div
								style={{
									display: "block",
									width: "400px",
									margin: "0 auto",
								}}>
								<StarRatingComponent
									name="rating"
									editing={false}
									renderStarIcon={() => <span>&#9733;</span>}
									starCount={10}
									onClick={() => {
										localStorage.setItem("rating", "value");
									}}
									value={8}></StarRatingComponent>
							</div>

							<button
								className="btn btn-danger mx-auto"
								onClick={() => setClose(false)}
								style={{
									display: "block",
									width: "100px",
									margin: "0 auto",
								}}>
								Close
							</button>
						</Modal>
					</div>
				);
			})}
		</>
	);
};

export default Search;
