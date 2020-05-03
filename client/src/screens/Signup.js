import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
//import "./Signup.css";

const Signup = () => {
	const URL = `http://localhost:5000/signup`;
	const history = useHistory();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const headers = {
		"Content-Type": "application/json",
	};
	const PostData = () => {
		if (
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			axios.post(
				URL,
				{
					name,
					password,
					email,
				},
				{
					headers: headers,
				}
			)
				.then((res) => {
					const data = res.data;
					if (data) {
						M.toast({
							html: data.error,
							classes: "#e57373 red lighten-2",
						});
					} else {
						M.toast({
							html: data.message,
							classes: "#66bb6a green lighten-1",
						});
						history.push("/login");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			M.toast({
				html: "Invalid Email",
				classes: "#e57373 red lighten-2",
			});
		}
	};
	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Instagram Clone</h2>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light"
					onClick={() => PostData()}
				>
					Sign Up
				</button>
				<h5>
					<Link to="/login">
						Already have an account ? Login
					</Link>
				</h5>
			</div>
		</div>
	);
};

export default Signup;
