import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
	const URL = `http://localhost:5000/allpost`;
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(URL).then((res) => {
			setData(res.data.photo);
		});
	}, []);

	return (
		<div className="home">
			<div className="card home-card">
				<h5>TheLordA</h5>
				<div className="card image">
					<img alt="" src={`data:image/png;base64,${data}`} />
				</div>
				<div className="card content">
					<h5>title</h5>
					<p>this is an amazing post</p>
					<input type="text" placeholder="add a comment"></input>
				</div>
			</div>
		</div>
	);
};

export default Home;
