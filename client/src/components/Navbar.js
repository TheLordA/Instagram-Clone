import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const Navbar = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const modalSearch = useRef(null);
	const [search, setSearch] = useState("");
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
				<li key="1">
					<Link to="/login">Login</Link>
				</li>,
				<li key="2">
					<Link to="/signup">SignUp</Link>
				</li>,
			];
		}
	};
	return (
		<nav>
			<div className="nav-wrapper white">
				<Link to={state ? "/" : "/login"} className="brand-logo">
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
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<ul className="collection">
						<li className="collection-item avatar">
							<img src="images/yuna.jpg" alt="" className="circle" />
							<span className="title">Title</span>
							<p>
								First Line <br />
								Second Line
							</p>
							<a href="#!" className="secondary-content">
								<i className="material-icons">grade</i>
							</a>
						</li>
						<li className="collection-item avatar">
							<i className="material-icons circle">folder</i>
							<span className="title">Title</span>
							<p>
								First Line <br />
								Second Line
							</p>
							<a href="#!" className="secondary-content">
								<i className="material-icons">grade</i>
							</a>
						</li>
						<li className="collection-item avatar">
							<i className="material-icons circle green">insert_chart</i>
							<span className="title">Title</span>
							<p>
								First Line <br />
								Second Line
							</p>
							<a href="#!" className="secondary-content">
								<i className="material-icons">grade</i>
							</a>
						</li>
						<li className="collection-item avatar">
							<i className="material-icons circle red">play_arrow</i>
							<span className="title">Title</span>
							<p>
								First Line <br />
								Second Line
							</p>
							<a href="#!" className="secondary-content">
								<i className="material-icons">grade</i>
							</a>
						</li>
					</ul>
				</div>
				<div className="modal-footer">
					<button className="modal-close waves-effect waves-green btn-flat">Agree</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
