import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
//import "./Profile.css";

const UserProfile = () => {
	const { userid } = useParams();
	const [data, setData] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("jwt"),
		},
	};
	useEffect(() => {
		axios.get(`http://localhost:5000/user/${userid}`, config).then((res) => {
			console.log(res.data);
			console.log(res.data.user);
			console.log(res.data.posts);
			setData(res.data);
		});
	}, []);

	return (
		<>
			{data ? (
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
							<h4>{data.user ? data.user.Name : "Is Loading ..."}</h4>
							<h5>{data.user ? data.user.Email : "Is Loading ..."}</h5>
							<div className="profile-detail">
								<h5>{data.posts ? data.posts.length : "IsLoading..."} posts</h5>
								<h5>40 followers</h5>
								<h5>40 following</h5>
							</div>
						</div>
					</div>
					<div className="gallery">
						{data.posts
							? data.posts.map((item) => (
									<img
										key={item._id}
										className="item"
										alt=""
										src={`data:${item.PhotoType};base64,${item.Photo}`}
									/>
							  ))
							: "Is Loading ..."}
					</div>
				</div>
			) : (
				"Is Loading ..."
			)}
		</>
	);
};

export default UserProfile;
