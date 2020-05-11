import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Home from "./screens/Home/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile/Profile";
import Signup from "./screens/Signup/Signup";
import Post from "./screens/CreatePost/Post";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/profile">
				<Profile />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/create">
				<Post />
			</Route>
		</BrowserRouter>
	);
}

export default App;
