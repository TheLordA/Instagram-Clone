import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";

const UserProfile = () => {
	const { dispatch } = useContext(UserContext);
	const { userid } = useParams();
	const [data, setData] = useState(null);
	const [showfollow, setShowFollow] = useState(true);
	const config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("jwt"),
		},
	};
	useEffect(() => {
		axios.get(`http://localhost:5000/user/${userid}`, config).then((res) => {
			setData(res.data);
		});
	}, []);

	const followUser = () => {
		axios.put(`http://localhost:5000/follow`, { followId: userid }, config).then((result) => {
			dispatch({
				type: "UPDATE",
				payload: { Followers: result.data.Followers, Following: result.data.Following },
			});
			localStorage.setItem("user", JSON.stringify(result.data));
			setData((prevState) => {
				return {
					...prevState,
					user: {
						...prevState.user,
						Followers: [...prevState.user.Followers, result.data._id],
					},
				};
			});
			setShowFollow(false);
		});
	};

	const UnfollowUser = () => {
		axios.put(`http://localhost:5000/unfollow`, { unfollowId: userid }, config).then((result) => {
			dispatch({
				type: "UPDATE",
				payload: { Followers: result.data.Followers, Following: result.data.Following },
			});
			localStorage.setItem("user", JSON.stringify(result.data));
			setData((prevState) => {
				const newFollower = prevState.user.Followers.filter((item) => item !== result.data._id);
				return {
					...prevState,
					user: {
						...prevState.user,
						Followers: newFollower,
					},
				};
			});
			setShowFollow(true);
		});
	};

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
								<h5>{data.user ? data.user.Followers.length : "IsLoading..."} followers </h5>
								<h5>{data.user ? data.user.Following.length : "IsLoading..."} following </h5>
							</div>
							{showfollow ? (
								<button
									className="waves-effect waves-light btn-small"
									onClick={() => followUser()}
								>
									Follow
								</button>
							) : (
								<button
									className="waves-effect waves-light btn-small"
									onClick={() => UnfollowUser()}
								>
									UnFollow
								</button>
							)}
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
