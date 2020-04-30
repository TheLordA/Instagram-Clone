import React from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import CreatePost from "./screens/CreatePost/CreatePost";
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
				<CreatePost />
			</Route>
		</BrowserRouter>
	);
}

export default App;
