import React from "react";
import "./Home.css";

const Home = () => {
	return (
		<div className="home">
			<div className="card home-card">
				<h5>TheLordA</h5>
				<div className="card image">
					<img
						alt=""
						src="https://images.unsplash.com/photo-1564874757179-b0358f74df91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
					/>
				</div>
				<div className="card content">
					<h5>title</h5>
					<p>this is an amazing post</p>
					<input type="text" placeholder="add a comment"></input>
				</div>
			</div>
			<div className="card home-card">
				<h5>TheLordA</h5>
				<div className="card image">
					<img
						alt=""
						src="https://images.unsplash.com/photo-1564874757179-b0358f74df91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
					/>
					<i className="material-icons">favorite</i>
					<h5>title</h5>
					<p>this is an amazing post</p>
				</div>
				<div className="card content">
					<input type="text" placeholder="add a comment"></input>
				</div>
			</div>
		</div>
	);
};

export default Home;
