import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import NavBar from "./components/Navbar";
import Home from "./screens/Home/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile/Profile";
import Signup from "./screens/Signup/Signup";
import Post from "./screens/CreatePost/Post";
import "./App.css";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("User"));
		if (user) {
			dispatch({ type: "USER", payload: user });
		} else {
			history.push("/login");
		}
	}, []);
	return (
		<Switch>
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
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<NavBar />
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
