/**
 *
 * @author Anass Ferrak aka " TheLordA " <an.ferrak@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Web-App-MERN-Stack-Clone
 *
 */

import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
// Material-UI Components
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link to="/">InstaClone</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
// General Styles
const useStyles = makeStyles((theme) => ({
	Logo: {
		fontFamily: "Grand Hotel, cursive",
		margin: "40px 0px",
	},
	paper: {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	image: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const { dispatch } = useContext(UserContext);

	const history = useHistory();
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formatValidation, setFormatValidation] = useState(false);
	const [authValidation, setAuthValidation] = useState(false);

	const PostData = () => {
		const URL = `http://localhost:5000/signin`;
		// the Regex email validation was token from : https://emailregex.com/
		if (
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			axios.post(URL, { password, email })
				.then((res) => {
					const data = res.data;
					if (data.error) {
						setFormatValidation(false);
						setAuthValidation(true);
					} else {
						// we store our generated token in order to use it to access protected endpoints
						localStorage.setItem("jwt", data.token);
						// we also store the user details
						localStorage.setItem("user", JSON.stringify(data.user));
						dispatch({ type: "USER", payload: data.user });
						//we can show that success PopUp or not depends on dev choice
						//
						// we redirect the user to home page
						history.push("/");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setAuthValidation(false);
			setFormatValidation(true);
		}
	};

	return (
		<Grid container>
			<Grid className={classes.image} item sm={4} md={6} />
			<Grid item xs={12} sm={8} md={6}>
				<Container component="main" maxWidth="xs" style={{ paddingBottom: "64px" }}>
					<CssBaseline />
					<div className={classes.paper}>
						<Typography
							className={classes.Logo}
							variant="h2"
							gutterBottom
							style={{ fontFamily: "Grand Hotel, cursive " }}
						>
							Instagram Clone
						</Typography>
						{formatValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid Email format — check it out!
							</Alert>
						) : null}
						{authValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid given Email/Password — check it out!
							</Alert>
						) : null}
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={email !== "" && password !== "" ? false : true}
								onClick={() => PostData()}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link to="/reset">Forgot password?</Link>
								</Grid>
								<Grid item>
									<Link to="/signup">{"Don't have an account? Sign Up"}</Link>
								</Grid>
							</Grid>
						</form>
					</div>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};

export default Login;
