/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */
import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link to="/">InstagramClone</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

export default Copyright;
