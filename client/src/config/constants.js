/**
 *
 * @author Anass Ferrak aka " TheLordA " <an.ferrak@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Web-App-MERN-Stack-Clone
 *
 */

// This is the config used in order to send
// our token with Axios requests
export const config = {
	headers: {
		Authorization: "Bearer " + localStorage.getItem("jwt"),
	},
};
