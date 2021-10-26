/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../contexts/auth/Auth.context";
import { config as axiosConfig, SUB_POST_URL } from "../config/constants";
// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SendIcon from "@material-ui/icons/Send";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Navbar from "../components/Navbar";

// General styles
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 500,
		margin: "20px auto",
		"& .MuiTextField-root": {
			width: "100%",
		},
		"& .MuiOutlinedInput-multiline": {
			paddingTop: "8px",
			paddingBottom: "8px",
			marginTop: "5px",
			marginLeft: "5px",
			marginRight: "5px",
		},
		"& .MuiCardContent-root:last-child": {
			paddingBottom: "10px",
		},
		"& .MuiDivider-middle": {
			marginBottom: "4px",
		},
		"& .MuiListItem-root": {
			padding: "0px 16px",
		},
		"& .MuiCardContent-root": {
			paddingTop: "0px",
			paddingBottom: "5px",
		},
		"& .MuiIconButton-root:focus": {
			backgroundColor: "rgba(0, 0, 0, 0)",
		},
	},
	header: {
		padding: "10px",
	},
	media: {
		//height: 0,
		paddingTop: "56.25%", // 16:9
		height: "max-content",
	},
	likeBar: {
		height: "25px",
		paddingTop: "0px",
		marginTop: "8px",
		marginLeft: "2px",
		paddingLeft: "0px",
		paddingBottom: "4px",
	},
	comments: {
		display: "flex",
		paddingTop: "0px",
		paddingLeft: "12px",
		paddingRight: "0px",
	},
	comment_item_see_more: {
		width: "35%",
		cursor: "pointer",
	},
	comments_icon_see_more: {
		height: "17px",
		width: "17px",
		paddingTop: "4px",
		paddingBottom: "3px",
	},
	comments_icon: {
		height: "30px",
		paddingLeft: "0px",
		paddingTop: "13px",
		paddingRight: "8px",
		paddingBottom: "0px",
	},
	inline: {
		display: "inline",
		fontWeight: "600",
	},
	avatar: {
		height: "40px",
	},
	links: {
		textDecoration: "none",
	},
}));

const SubscribePost = () => {
	const classes = useStyles();
	const { state } = useContext(AuthenticationContext);

	const [data, setData] = useState([]);
	const [showSend, setShowSend] = useState(false);
	const [comment, setComment] = useState("");

	const config = axiosConfig(localStorage.getItem("jwt"));

	useEffect(() => {
		axios.get(SUB_POST_URL, config).then((res) => {
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

	const unlikePost = (id) => {
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
		setComment("");
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

	return (
		<>
			<Navbar />
			{data.map((item) => (
				<div className="home" key={item._id}>
					<Card className={classes.root}>
						<CardHeader
							className={classes.header}
							avatar={
								<Avatar>
									<img
										className={classes.avatar}
										alt=""
										src={`data:${item.PhotoType};base64,${item.Photo}`}
									/>
								</Avatar>
							}
							title={
								<Link
									className={classes.links}
									to={
										item.PostedBy._id !== state._id
											? `/profile/${item.PostedBy._id}`
											: "/profile"
									}
								>
									{item.PostedBy.Name}
								</Link>
							}
							subheader="September 14, 2016"
						/>

						<CardMedia
							className={classes.media}
							image={`data:${item.PhotoType};base64,${item.Photo}`}
							title="Paella dish"
						/>

						<CardActions className={classes.likeBar} disableSpacing>
							{item.Likes.includes(state._id) ? (
								<IconButton
									aria-label="Like"
									color="secondary"
									onClick={() => {
										unlikePost(item._id);
									}}
								>
									<FavoriteIcon />
								</IconButton>
							) : (
								<IconButton
									aria-label="Like"
									onClick={() => {
										likePost(item._id);
									}}
								>
									<FavoriteBorderIcon />
								</IconButton>
							)}
							<IconButton aria-label="comments">
								<ChatBubbleOutlineIcon />
							</IconButton>
						</CardActions>

						<CardContent>
							<Typography variant="subtitle2" display="block" gutterBottom>
								{item.Likes.length} Likes
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{item.Body}
							</Typography>
						</CardContent>

						<Divider variant="middle" />

						<List>
							{item.Comments.map((cmt) => {
								return (
									<ListItem
										className={classes.comment_item}
										alignItems="flex-start"
										key={cmt._id}
									>
										<ListItemText
											secondary={
												<React.Fragment>
													<Typography
														component="span"
														variant="body2"
														className={classes.inline}
														color="textPrimary"
													>
														<Link
															className={classes.links}
															to={
																cmt.PostedBy._id !== state._id
																	? `/profile/${cmt.PostedBy._id}`
																	: "/profile"
															}
														>
															{cmt.PostedBy.Name}
														</Link>
													</Typography>
													{" — "}
													{cmt.Text}
												</React.Fragment>
											}
										/>
									</ListItem>
								);
							})}
							{item.Comments.length === 0 ? (
								<ListItem alignItems="flex-start" style={{ left: "38%" }}>
									<Typography variant="caption" display="block" gutterBottom>
										No Comments yet
									</Typography>
								</ListItem>
							) : null}
							{item.Comments.length > 3 && item.Comments.length !== 0 ? (
								<ListItem
									alignItems="flex-start"
									className={classes.comment_item_see_more}
								>
									<Typography variant="caption" display="block" gutterBottom>
										See all {item.Comments.length} comments
									</Typography>
									<DoubleArrowIcon className={classes.comments_icon_see_more} />
								</ListItem>
							) : null}
						</List>

						<Divider variant="middle" />

						<CardContent className={classes.comments}>
							<Avatar>
								<img
									className={classes.avatar}
									alt=""
									src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
								/>
							</Avatar>
							<TextField
								multiline
								rows={1}
								placeholder="Add your comment..."
								variant="outlined"
								value={comment}
								onChange={(event) => {
									event.preventDefault();
									setComment(event.target.value);
									setShowSend(true);
									if (event.target.value === "") setShowSend(false);
								}}
							/>
							<IconButton
								aria-label="add to favorites"
								className={classes.comments_icon}
								disabled={!showSend}
								onClick={() => makeComment(comment, item._id)}
							>
								<SendIcon />
							</IconButton>
						</CardContent>
					</Card>
				</div>
			))}
		</>
	);
};

export default SubscribePost;
