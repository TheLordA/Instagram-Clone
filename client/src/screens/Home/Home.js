import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import "./Home.css";

const Home = () => {
	const [data, setData] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const URL = `http://localhost:5000/allpost`;
	const config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("jwt"),
		},
	};

	useEffect(() => {
		axios.get(URL, config).then((res) => {
			setData(res.data.posts);
		});
	}, []);

	const likePost = (id) => {
		axios.put(`http://localhost:5000/like`, { postId: id }, config)
			.then((result) => {
				const newData = data.map((item) => {
					if (result.data._id === item._id) return result.data;
					else return item;
				});
				setData(newData);
			})
			.catch((err) => console.log(err));
	};
	const UnlikePost = (id) => {
		axios.put(`http://localhost:5000/Unlike`, { postId: id }, config)
			.then((res) => {
				const newData = data.map((item) => {
					if (res.data._id === item._id) return res.data;
					else return item;
				});
				setData(newData);
			})
			.catch((err) => console.log(err));
	};
	const makeComment = (text, postId) => {
		axios.put(`http://localhost:5000/comment`, { text, postId }, config)
			.then((result) => {
				const newData = data.map((item) => {
					if (result.data._id === item._id) return result.data;
					else return item;
				});
				setData(newData);
			})
			.catch((err) => console.log(err));
	};
	const deletePost = (postId) => {
		axios.delete(`http://localhost:5000/deletepost/${postId}`, config).then((res) => {
			const newData = data.filter((item) => {
				return item._id !== res.data;
			});
			setData(newData);
		});
	};

	return data.map((item) => (
		<div className="home" key={item._id}>
			<div className="card home-card">
				<h5>
					<Link to={item.PostedBy._id !== state._id ? `/profile/${item.PostedBy._id}` : "/profile"}>
						{item.PostedBy.Name}
					</Link>
					{item.PostedBy._id === state._id && (
						<i
							className="material-icons"
							onClick={() => {
								deletePost(item._id);
							}}
						>
							delete
						</i>
					)}
				</h5>
				<div className="card image">
					<img className="post-image" alt="" src={`data:${item.PhotoType};base64,${item.Photo}`} />
				</div>
				<div className="card content">
					{item.Likes.includes(state._id) ? (
						<i
							className="material-icons"
							onClick={() => {
								UnlikePost(item._id);
							}}
						>
							thumb_down
						</i>
					) : (
						<i
							className="material-icons"
							onClick={() => {
								likePost(item._id);
							}}
						>
							thumb_up
						</i>
					)}
					<h6>{item.Likes.length} likes</h6>
					<h6>{item.Title}</h6>
					<p>{item.Body}</p>
					{item.Comments.map((cmt) => {
						return (
							<h6 key={cmt._id}>
								<span>{cmt.PostedBy.Name}</span> {cmt.Text}
							</h6>
						);
					})}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							makeComment(e.target[0].value, item._id);
						}}
					>
						<input type="text" placeholder="add a comment"></input>
					</form>
				</div>
			</div>
		</div>
	));
};

export default Home;
