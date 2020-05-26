const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../constants");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("SENDGRID_API_KEY");

const User = mongoose.model("User");
const router = express.Router();

// Our welcome msg from the API
router.get("/", (req, res) => {
	res.send("Welcome to our InstaClone API");
});

// Just to test that our middleware is working correctly
/*
router.get('/protected',loginMiddle,(req,res)=>{
    res.send('Hello from protected route');
})
*/

// Route to handle SignUp requests
router.post("/signup", (req, res) => {
	const { name, email, password } = req.body;
	// Verifying if one of the fields is Empty
	if (!name || !password || !email) {
		return res.json({ error: "Please submit all required field" });
	}
	// Else we search the user with the credentials submitted
	User.findOne({ Email: email })
		.then((savedUser) => {
			// Verify if the user exist in the DB
			if (savedUser) {
				return res.json({ error: "This Email Is Already Used !" });
			}
			// We Hash the pwd before save into DB, more the number is high more it's more secure
			bcrypt.hash(password, 12).then((hashedPwd) => {
				const user = new User({
					Name: name,
					Email: email,
					Password: hashedPwd,
				});
				// We save our new user to DB
				user.save()
					.then((user) => {
						const email = {
							from: "no-reply@insta-clone.com",
							to: user.Email,
							subject: "Your account has been created successfully",
							html: "<h1>Welcome to InstaClone</h1>",
						};
						sgMail.send(email);
						res.json({ message: "Saved successfully " });
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

// Route to handle SignIn requests
router.post("/signin", (req, res) => {
	const { email, password } = req.body;
	// Verification for an empty field
	if (!email || !password) {
		return res.json({ error: "Please provide Email or Password" });
	}
	// Check if email exist in our DB
	User.findOne({ Email: email })
		.then((savedUser) => {
			if (!savedUser) {
				return res.json({ error: "Invalid Email or Password" });
			}
			bcrypt.compare(password, savedUser.Password).then((doMatch) => {
				if (doMatch) {
					// we will generate the token based on the ID of user
					const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
					// retrieve the user info details and send it to the front
					const { _id, Name, Email, Followers, Following } = savedUser;
					res.json({ token, user: { _id, Name, Email, Followers, Following } });
				} else {
					return res.json({
						error: "Invalid Email or Password",
					});
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;

//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
