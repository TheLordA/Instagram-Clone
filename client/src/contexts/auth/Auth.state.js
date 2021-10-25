import React, { useReducer } from "react";

import AuthContext from "./Auth.context";
import AuthReducer from "./Auth.reducer";

const AuthState = (props) => {
	let initialState = {};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
