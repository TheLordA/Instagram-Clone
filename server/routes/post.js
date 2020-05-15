const express = require("express");
const mongoose = require("mongoose");
const loginmiddleware = require("../middleware/loginMiddleware");

const Post = mongoose.model("Post");
const router = express.Router();

router.get("/allpost", loginmiddleware, (req, res) => {
	Post.find()
		.populate("PostedBy", "_id Name")
		.then((data) => {
			let posts = [];
			data.map((item) => {
				posts.push({
					id: item._id,
					title: item.Title,
					body: item.body,
					postedBy: item.PostedBy,
					photo: item.Photo.toString("base64"),
					photoType: item.PhotoType,
				});
			});
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/mypost", loginmiddleware, (req, res) => {
	Post.find({ PostedBy: req.user._id })
		.populate("PostedBy", "_id Name")
		.then((data) => {
			let posts = [];
			data.map((item) => {
				posts.push({
					id: item._id,
					title: item.Title,
					body: item.body,
					//postedBy: item.PostedBy,
					photo: item.Photo.toString("base64"),
					photoType: item.PhotoType,
				});
			});
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/createpost", loginmiddleware, (req, res) => {
	const { title, body, photoEncode, photoType } = req.body;
	if (!title || !body || !photoEncode) {
		return res.json({
			error: "Please submit all the required fields.",
		});
	}
	const post = new Post({
		Title: title,
		Body: body,
		PostedBy: req.user,
	});

	savePhoto(post, photoEncode, photoType);

	post.save()
		.then((result) => {
			res.json({ post: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

function savePhoto(post, photoEncoded, photoType) {
	if (photoEncoded != null) {
		post.Photo = new Buffer.from(photoEncoded, "base64");
		post.PhotoType = photoType;
	}
}

module.exports = router;
