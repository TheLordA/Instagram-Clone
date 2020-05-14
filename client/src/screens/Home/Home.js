import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
	const URL = `http://localhost:5000/allpost`;
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(URL).then((res) => {
			console.log(res.data.posts);
			setData(res.data.posts);
		});
	}, []);

	return data.map((item) => (
		<div className="home" key={item.id}>
			<div className="card home-card">
				<h5>Author Name</h5>
				<div className="card image">
					<img
						alt=""
						src={`data:${item.photoType};base64,${item.photo}`}
					/>
				</div>
				<div className="card content">
					<h5>{item.title}</h5>
					<p>{item.body}</p>
					<input type="text" placeholder="add a comment"></input>
				</div>
			</div>
		</div>
	));
};

export default Home;
