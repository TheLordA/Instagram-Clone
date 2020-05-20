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
		{ new: true },
		(err, result) => {
			if (err) return res.status(422).json({ Error: err });

			User.findByIdAndUpdate(
				req.use._id,
				{
					$push: { Following: req.body.followId },
				},
				{ new: true }
			);
		}
	)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => res.status(422).json({ Error: err }));
});

router.put("/unfollow", loginmiddleware, (req, res) => {
	User.findByIdAndUpdate(
		req.body.unfollowId,
		{
			$pull: { Followers: req.user._id },
		},
		{ new: true },
		(err, result) => {
			if (err) return res.status(422).json({ Error: err });

			User.findByIdAndUpdate(
				req.use._id,
				{
					$pull: { Following: req.body.unfollowId },
				},
				{ new: true }
			);
		}
	)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => res.status(422).json({ Error: err }));
});

module.exports = router;
