import React, { useEffect, useContext } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import AuthContext from "../contexts/auth/Auth.context";
import NavBar from "../components/Navbar";
// different routes
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost.js";
import Profile from "../screens/Profile";
import UserProfile from "../screens/UserProfile";
import SubscribePost from "../screens/SubscribePosts";
import Reset from "../screens/ResetPassword.js";
import NewPass from "../screens/NewPassword.js";

const Routing = () => {
	const { state } = useContext(AuthContext);

	// check if we are already authenticated
	useEffect(() => {
		state.isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />;
	});

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<NavBar nav="home" />
					<SubscribePost />
				</Route>
				<Route path="/explore">
					<NavBar nav="explore" />
					<Home />
				</Route>
				<Route path="/create">
					<NavBar nav="add post" />
					<CreatePost />
				</Route>
				<Route exact path="/profile">
					<NavBar nav="profile" />
					<Profile />
				</Route>
				<Route path="/profile/:userid">
					<NavBar />
					<UserProfile />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route exact path="/reset">
					<Reset />
				</Route>
				<Route path="/reset/:token">
					<NewPass />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routing;
