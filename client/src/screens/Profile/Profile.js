import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import "./Profile.css";

const Profile = () => {
	const URL = `http://localhost:5000/mypost`;
	const [data, setData] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("jwt"),
		},
	};
	useEffect(() => {
		axios.get(URL, config).then((res) => {
			console.log(res.data.posts);
			setData(res.data.posts);
		});
	}, []);
	return (
		<div className="main">
			<div className="info-bar">
				<div>
					<img
						className="profile-pic"
						src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
						alt=""
					/>
				</div>
				<div>
					<h4>{state ? state.Name : "IsLoading ..."}</h4>
					<div className="profile-detail">
						<h5>40 posts</h5>
						<h5>40 followers</h5>
						<h5>40 following</h5>
					</div>
				</div>
			</div>
			<div className="gallery">
				{data.map((item) => (
					<img
						key={item.id}
						className="item"
						alt=""
						src={`data:${item.photoType};base64,${item.photo}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
