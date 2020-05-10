import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [image, setImage] = useState("");
	return (
		<div className="card input-filed">
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Body"
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>
			<div className="file-field input-field">
				<div className="btn #64b5f6 blue darken-1">
					<span>Upload Image</span>
					<input
						type="file"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</div>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text" />
				</div>
			</div>
			<button className="btn waves-effect waves-light #64b5f6 blue darken-1">
				Submit Post
			</button>
		</div>
	);
};

export default CreatePost;
