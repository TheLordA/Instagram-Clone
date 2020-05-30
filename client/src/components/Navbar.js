import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import Axios from "axios";
import "./Navbar.css";

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const Navbar = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const modalSearch = useRef(null);
	const [pattern, setPattern] = useState("");
	const [search, setSearch] = useState([]);

	useEffect(() => {
		M.Modal.init(modalSearch.current);
	}, []);

	const renderList = () => {
		if (state) {
			return [
				<li key="1">
					<i
						data-target="modal1"
						className="large material-icons modal-trigger"
						style={{ color: "black" }}
					>
						search
					</i>
				</li>,
				<li key="2">
					<Link to="/feed">Subscribe's feed</Link>
				</li>,
				<li key="3">
					<Link to="/profile">Profile</Link>
				</li>,
				<li key="4">
					<Link to="/create">Create Post</Link>
				</li>,
				<li key="5">
					<button
						className="btn waves-effect waves-light"
						onClick={() => {
							localStorage.clear();
							dispatch({ type: "CLEAR" });
							history.push("/login");
						}}
					>
						LogOut
					</button>
				</li>,
			];
		} else {
			return [
				<li key="6">
					<Link to="/login">Login</Link>
				</li>,
				<li key="7">
					<Link to="/signup">SignUp</Link>
				</li>,
			];
		}
	};

	const FindUser = (pattern) => {
		if (!(pattern === "")) {
			const URL = `http://localhost:5000/users-research`;
			const config = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
				},
			};
			setPattern(pattern);
			Axios.post(URL, { pattern }, config).then((res) => {
				setSearch(res.data);
			});
		}
	};

	const _handleClick = () => {
		M.Modal.getInstance(modalSearch.current).close();
		setPattern("");
		setSearch([]);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			width: "100%",
		},
		inline: {
			display: "inline",
		},
	}));

	const classes = useStyles();

	return (
		<nav>
			<div className="nav-wrapper white">
				<Link to={state ? "/" : "/login"} className="brand-logo" style={{ left: "10%" }}>
					Instagram Clone
				</Link>
				<ul id="nav-mobile" className="right">
					{renderList()}
				</ul>
			</div>

			<div id="modal1" className="modal" ref={modalSearch} style={{ color: "black" }}>
				<div className="modal-content">
					<input
						type="text"
						placeholder="Search"
						value={pattern}
						onChange={(e) => FindUser(e.target.value)}
					/>

					<List className={classes.root}>
						{search.user
							? search.user.map((item) => {
									return (
										<Link
											key={item._id}
											to={item._id !== state._id ? `/profile/${item._id}` : "/profile"}
											onClick={() => _handleClick()}
										>
											<ListItem alignItems="flex-start">
												<ListItemAvatar>
													<Avatar
														alt="Remy Sharp"
														src="/static/images/avatar/1.jpg"
													/>
												</ListItemAvatar>

												<ListItemText
													primary={item.Name}
													secondary={
														<React.Fragment>{item.Email}</React.Fragment>
													}
												/>
											</ListItem>
											<Divider variant="inset" component="li" />
										</Link>
									);
							  })
							: "Is Loading ..."}
					</List>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
