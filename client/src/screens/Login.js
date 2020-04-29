import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Instagram Clone</h2>
				<input type="text" placeholder="email" />
				<input type="text" placeholder="password" />
				<button className="btn waves-effect waves-light">
					Login
				</button>
				<h5>
					<Link to="/signup">
						Does not have an account ? Create one
					</Link>
				</h5>
			</div>
		</div>
	);
};

export default Login;
