/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

const controller = require("../controllers/post.controller");
const loginmiddleware = require("../middleware/login.middleware");

module.exports = (app) => {
	// Getting all posts
	app.get("/allpost", loginmiddleware, controller.allPost);

	// Getting post for subscribed/followed users
	app.get("/subspost", loginmiddleware, controller.subPost);

	// Getting the user posts
	app.get("/mypost", loginmiddleware, controller.myPost);

	// Create a post
	app.post("/createpost", loginmiddleware, controller.createPost);

	// Like a post
	app.put("/like", loginmiddleware, controller.like);

	// Unlike a post
	app.put("/Unlike", loginmiddleware, controller.unlike);

	// Commenting a post
	app.put("/comment", loginmiddleware, controller.comment);

	// Deleting a post
	app.delete("/deletepost/:postId", loginmiddleware, controller.deletePost);
};
