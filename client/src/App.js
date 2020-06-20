import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost.js";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import SubscribePost from "./components/SubscribePosts";
import Reset from "./components/ResetPassword.js";
import NewPass from "./components/NewPassword.js";
import "./App.css";

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "USER", payload: user });
		} else {
			if (!history.location.pathname.startsWith("/reset")) history.push("/login");
		}
	}, []);
	return (
		<Switch>
			<Route exact path="/">
				<NavBar nav="recents" />
				<Home />
			</Route>
			<Route exact path="/profile">
				<NavBar />
				<Profile />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route exact path="/reset">
				<Reset />
			</Route>
			<Route path="/reset/:token">
				<NewPass />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/create">
				<NavBar />
				<CreatePost />
			</Route>
			<Route path="/profile/:userid">
				<NavBar />
				<UserProfile />
			</Route>
			<Route path="/feed">
				<NavBar nav="favorites" />
				<SubscribePost />
			</Route>
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
