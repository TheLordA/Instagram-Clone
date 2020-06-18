import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import M from "materialize-css";

const Reset = () => {
	const URL = `http://localhost:5000/reset-pwd`;
	const history = useHistory();
	const [email, setEmail] = useState("");
	const emailRegex = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

	const PostData = () => {
		if (emailRegex.test(email)) {
			axios.post(URL, { email })
				.then((res) => {
					const data = res.data;
					console.log(data);
					if (data.error) {
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
				html: "Please make sure that you email has the correct form",
				classes: "#e57373 red lighten-2",
			});
		}
	};
	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Instagram Clone</h2>
				<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<button className="btn waves-effect waves-light" onClick={() => PostData()}>
					Reset Your Password
				</button>
			</div>
		</div>
	);
};

export default Reset;
