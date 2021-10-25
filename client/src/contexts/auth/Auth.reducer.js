/* eslint-disable import/no-anonymous-default-export */
import { FETCH_USER_DATA, UPDATE_FOLLOW_DATA, BOOKMARK_POST, LOGOUT } from "../types";

export default (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case FETCH_USER_DATA:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
			};
		case UPDATE_FOLLOW_DATA:
			return {
				...state,
				Followers: payload.Followers,
				Following: payload.Following,
			};
		case BOOKMARK_POST:
			return {
				...state,
				Bookmarks: payload.Bookmarks,
			};
		case LOGOUT:
			return { isAuthenticated: true };
		default:
			return state;
	}
};
