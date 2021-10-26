/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { RESET_PWD_URL } from "../config/constants";
import { EmailRegex } from "../utils/regex";
import Copyright from "../components/Copyight";
// Material-UI Components
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

// General Styles
const useStyles = makeStyles((theme) => ({
	root: {
		height: "-webkit-fill-available",
	},
	image: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		height: "100vh",
	},
	container: {
		margin: " auto 0px",
	},
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

	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Reset = () => {
	const history = useHistory();
	const classes = useStyles();
	const [email, setEmail] = useState("");

	const [emailCheck, setEmailCheck] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);

	const timerRef = useRef();

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[]
	);

	const handleInputChanges = (e) => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;

			default:
				break;
		}
	};

	const handlePostData = () => {
		if (EmailRegex.test(email)) {
			axios.post(RESET_PWD_URL, { email })
				.then((res) => {
					const data = res.data;
					console.log(data);
					if (data.error) {
						setEmailCheck(false);
						setErrorMsg(true);
					} else {
						// make sure to not display another Alert instead
						setEmailCheck(false);
						setErrorMsg(false);
						// show the confirmation message
						setSuccessMsg(true);
						// set a time before we redirect the user to login page
						timerRef.current = setTimeout(() => {
							history.push("/login");
						}, 3000);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setErrorMsg(false);
			setEmailCheck(true);
		}
	};

	return (
		<Grid container className={classes.root}>
			<Grid className={classes.image} item sm={4} md={6} />
			<Grid item xs={12} sm={8} md={6} className={classes.container}>
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
						{emailCheck ? (
							<Alert variant="outlined" severity="error">
								Invalid Email format — check it out!
							</Alert>
						) : null}
						{errorMsg ? (
							<Alert variant="outlined" severity="error">
								No User exists with that email — check it Again !
							</Alert>
						) : null}
						{successMsg ? (
							<Alert variant="outlined" severity="success">
								The reset password link has been sent — check out your email inbox !
							</Alert>
						) : null}
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Email Address"
								name="email"
								autoFocus
								value={email}
								onChange={handleInputChanges}
							/>
							<Button
								fullWidth
								variant="outlined"
								color="primary"
								className={classes.submit}
								disabled={email !== "" ? false : true}
								onClick={handlePostData}
							>
								Reset your Password
							</Button>
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

export default Reset;
