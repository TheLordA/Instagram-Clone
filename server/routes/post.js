/**
 *
 * @author Anass Ferrak aka " TheLordA " <an.ferrak@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Web-App-MERN-Stack-Clone
 *
 */

const express = require("express");
const mongoose = require("mongoose");
const loginmiddleware = require("../middleware/loginMiddleware");

const Post = mongoose.model("Post");
const router = express.Router();

router.get("/allpost", loginmiddleware, (req, res) => {
	Post.find()
		.populate("PostedBy", "_id Name")
		.populate("Comments.PostedBy", "_id Name")
		.sort("-createdAt")
		.then((data) => {
			let posts = [];
			data.map((item) => {
				posts.push({
					_id: item._id,
					Title: item.Title,
					Body: item.Body,
					PostedBy: item.PostedBy,
					Photo: item.Photo.toString("base64"),
					PhotoType: item.PhotoType,
					Likes: item.Likes,
					Comments: item.Comments,
				});
			});
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});
router.get("/subspost", loginmiddleware, (req, res) => {
	Post.find({ PostedBy: { $in: req.user.Following } })
		.populate("PostedBy", "_id Name")
		.populate("Comments.PostedBy", "_id Name")
		.sort("-createdAt")
		.then((data) => {
			let posts = [];
			data.map((item) => {
				posts.push({
					_id: item._id,
					Title: item.Title,
					Body: item.Body,
					PostedBy: item.PostedBy,
					Photo: item.Photo.toString("base64"),
					PhotoType: item.PhotoType,
					Likes: item.Likes,
					Comments: item.Comments,
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
		.populate("Comments.PostedBy", "_id Name")
		.sort("-createdAt")
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
					likes: item.Likes,
					Comments: item.Comments,
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
			res.json({ message: "Post created successfully" });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.put("/like", loginmiddleware, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { Likes: req.user._id },
		},
		{ new: true }
	)
		.populate("PostedBy", "_id Name")
		.populate("Comments.PostedBy", "_id Name")
		.exec((err, result) => {
			if (err) return res.status(422).json({ Error: err });
			else {
				res.json({
					_id: result._id,
					Title: result.Title,
					Body: result.Body,
					PostedBy: result.PostedBy,
					Photo: result.Photo.toString("base64"),
					PhotoType: result.PhotoType,
					Likes: result.Likes,
					Comments: result.Comments,
				});
			}
		});
});

router.put("/Unlike", loginmiddleware, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$pull: { Likes: req.user._id },
		},
		{ new: true }
	)
		.populate("PostedBy", "_id Name")
		.populate("Comments.PostedBy", "_id Name")
		.exec((err, result) => {
			if (err) return res.status(422).json({ Error: err });
			else {
				console.log(result);
				res.json({
					_id: result._id,
					Title: result.Title,
					Body: result.Body,
					PostedBy: result.PostedBy,
					Photo: result.Photo.toString("base64"),
					PhotoType: result.PhotoType,
					Likes: result.Likes,
					Comments: result.Comments,
				});
			}
		});
});

router.put("/comment", loginmiddleware, (req, res) => {
	const comment = { Text: req.body.text, PostedBy: req.user._id };
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { Comments: comment },
		},
		{ new: true }
	)
		.populate("Comments.PostedBy", "_id Name")
		.populate("PostedBy", "_id Name")
		.exec((err, result) => {
			if (err) return res.status(422).json({ Error: err });
			else {
				res.json({
					_id: result._id,
					Title: result.Title,
					Body: result.Body,
					PostedBy: result.PostedBy,
					Photo: result.Photo.toString("base64"),
					PhotoType: result.PhotoType,
					Likes: result.Likes,
					Comments: result.Comments,
				});
			}
		});
});

router.delete("/deletepost/:postId", loginmiddleware, (req, res) => {
	Post.findOne({ _id: req.params.postId })
		.populate("PostedBy", "_id")
		.exec((err, post) => {
			if (err || !post) return res.status(422).json({ Error: err });
			if (post.PostedBy._id.toString() === req.user._id.toString()) {
				post.remove()
					.then((result) => {
						res.json(result._id);
					})
					.catch((err) => console.log(err));
			}
		});
});

function savePhoto(post, photoEncoded, photoType) {
	if (photoEncoded != null) {
		post.Photo = new Buffer.from(photoEncoded, "base64");
		post.PhotoType = photoType;
	}
}

module.exports = router;
