const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginmiddleware = require("../middleware/loginMiddleware");

const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", loginmiddleware, (req, res) => {
	User.findOne({ _id: req.params.id })
		.select("-Password")
		.then((user) => {
			Post.find({ PostedBy: req.params.id })
				.populate("PostedBy", "_id Name")
				.exec((err, result) => {
					if (err) return res.status(422).json();
					const posts = [];
					result.map((item) => {
						posts.push({
							_id: item._id,
							Title: item.Title,
							Body: item.Body,
							Photo: item.Photo.toString("base64"),
							PhotoType: item.PhotoType,
							Likes: item.Likes,
							Comments: item.Comments,
							Followers: item.Followers,
							Following: item.Following,
						});
					});
					res.json({ user, posts });
				});
		})
		.catch((err) => {
			return res.status(404).json({ Error: "User not found" });
		});
});
router.put("/follow", loginmiddleware, (req, res) => {
	User.findByIdAndUpdate(
		req.body.followId,
		{
			$push: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$push: { Following: req.body.followId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
});

router.put("/unfollow", loginmiddleware, (req, res) => {
	User.findByIdAndUpdate(
		req.body.unfollowId,
		{
			$pull: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: { Following: req.body.unfollowId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
});

// Just Wrote the logic of it but not yet tested and the client implementation doesn't exist yet
router.put("/update-picture", loginmiddleware, (req, res) => {
	User.findByIdAndUpdate(req.user._id, { $set: { pic: req.body.pic } }, { new: true }, (err, result) => {
		if (err) {
			return res.status(422).json({ error: "pic canot post" });
		}
		res.json(result);
	});
});

router.post("/users-research", (req, res) => {
	let pattern = new RegExp("^" + req.body.pattern);
	User.find({ Email: { $regex: pattern } })
		.select("_id Email Name")
		.then((user) => {
			res.json({ user });
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
