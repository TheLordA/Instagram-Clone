/**
 *
 * @author Anass Ferrak aka " TheLordA " <an.ferrak@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Web-App-MERN-Stack-Clone
 *
 */

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

//Handle retrieving all the bookmarks available
router.get("/bookmarks", loginmiddleware, (req, res) => {
	User.find({ _id: req.user._id })
		.select("-Password")
		.then((user) => {
			const data = user[0].Bookmarks;
			Post.find({ _id: { $in: data } })
				.populate("PostedBy", "_id Name")
				.then((result) => {
					let bookmark = [];
					result.map((item) => {
						bookmark.push({
							_id: item._id,
							PostedBy: item.PostedBy,
							Title: item.Title,
							Body: item.Body,
							Photo: item.Photo.toString("base64"),
							PhotoType: item.PhotoType,
							Likes: item.Likes,
							Comments: item.Comments,
						});
					});
					res.json({ bookmark });
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			return res.status(404).json({ Error: "User not found" });
		});
});

// Create a post Bookmark
router.put("/bookmark-post", loginmiddleware, (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{
			$push: { Bookmarks: req.body.postId },
		},
		{ new: true }
	)
		.select("-Password")
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			return res.json({ error: err });
		});
});

// Remove a post from Bookmarks
router.put("/remove-bookmark", loginmiddleware, (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{
			$pull: { Bookmarks: req.body.postId },
		},
		{ new: true }
	)
		.select("-Password")
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			return res.json({ error: err });
		});
});

// Just Wrote the logic of it but not yet tested and the client implementation doesn't exist yet
router.put("/update-picture", loginmiddleware, (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{ $set: { Photo: req.body.Photo, PhotoType: req.body.PhotoType } },
		{ new: true },
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: "pic canot post" });
			}
			res.json(result);
		}
	);
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
