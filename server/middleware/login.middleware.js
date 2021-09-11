/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

const jwt = require("jsonwebtoken");

const JWT_SECRET = require("../constants");
const User = require("../models/user.model");

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "You must be logged In" });
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "You must be logged In" });
		}
		const { _id } = payload;
		User.findById(_id).then((userdata) => {
			// We make user data accessible
			req.user = userdata;
			next();
		});
	});
};
