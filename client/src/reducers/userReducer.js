export const initialState = null;
export const reducer = (state, action) => {
	if (action.type === "USER") {
		return action.payload;
	}
	if (action.type === "CLEAR") {
		return null;
	}
	if (action.type === "UPDATE") {
		return {
			...state,
			Followers: action.payload.Followers,
			Following: action.payload.Following,
		};
	}
	if (action.type === "BOOKMARK") {
		return {
			...state,
			Bookmarks: action.payload.Bookmarks,
		};
	}
	return state;
};
