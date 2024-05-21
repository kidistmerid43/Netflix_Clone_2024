import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

const Banner = () => {
	const [movie, setMovie] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(requests.fetchNetflixOrginals);
				console.log("API Response:", response);

				// Check for a successful response and ensure data is present
				if (
					response.status === 204 ||
					!response.data ||
					!response.data.results ||
					response.data.results.length === 0
				) {
					console.error("No results found");
					return;
				}

				setMovie(
					response.data.results[
						Math.floor(Math.random() * response.data.results.length)
					]
				);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<div
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: movie?`url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
					: "",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="banner_contents">
				<h1 className="banner_title">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<div className="banner_buttons">
					<button className="banner_button play">Play</button>
					<button className="banner_button myList">My List</button>
				</div>
				<h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
			</div>
			<div className="bannerfadeBottom" />
		</div>
	);
};

export default Banner;
