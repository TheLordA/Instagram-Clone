const express = require("express");
const mongoose = require("mongoose");
const loginmiddleware = require("../middleware/loginMiddleware");

const Post = mongoose.model("Post");
const router = express.Router();
//const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

router.get("/allpost", (req, res) => {
	Post.find()
		.populate("PostedBy", "_id Name")
		.then((posts) => {
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/mypost", loginmiddleware, (req, res) => {
	Post.find({ PostedBy: req.user._id })
		.populate("PostedBy", "_id Name")
		.then((myposts) => {
			res.json(myposts);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/createpost", (req, res) => {
	const { title, body, photoEncode, photoType } = req.body;
	if (!title || !body || !photoEncode) {
		return res.json({ error: "Please submit all the required fields." });
	}
	const post = new Post({
		Title: title,
		Body: body,
		PostedBy: req.user,
	});

	savePhoto(post, photoEncode, photoType);

	post.save()
		.then((result) => {
			console.log(result);
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
