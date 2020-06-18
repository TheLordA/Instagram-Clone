import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const NewPass = () => {
	const URL = `http://localhost:5000/new-pwd`;
	const history = useHistory();
	const [password, setPassword] = useState("");
	const { token } = useParams();

	const PostData = () => {
		axios.post(URL, { password, token })
			.then((res) => {
				const data = res.data;
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
	};
	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Instagram Clone</h2>
				<input
					type="password"
					placeholder="New the new password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn waves-effect waves-light" onClick={() => PostData()}>
					Update the password
				</button>
			</div>
		</div>
	);
};

export default NewPass;
