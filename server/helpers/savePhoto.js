const savePhoto = (post, photoEncoded, photoType) => {
	if (photoEncoded != null) {
		post.Photo = new Buffer.from(photoEncoded, "base64");
		post.PhotoType = photoType;
	}
};

module.exports = { savePhoto };
