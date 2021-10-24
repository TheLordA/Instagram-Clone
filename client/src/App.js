/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import Routing from "./routes";
import "./App.css";

export const UserContext = createContext();

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default App;
