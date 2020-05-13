import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "./CreatePost.css";
import Axios from "axios";

registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginFileEncode,
	FilePondPluginImageResize,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateType
);

const Post = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [files, setFiles] = useState([]);

	const URL = `http://localhost:5000/createpost`;
	const headers = {
		"Content-Type": "application/json",
		Authorization: "Bearer " + localStorage.getItem("jwt"),
	};
	const PostData = () => {
		const photoEncode = files[0].getFileEncodeBase64String();
		const photoType = files[0].fileType;
		const user = JSON.parse(localStorage.getItem("user"));

		Axios.post(
			URL,
			{
				title,
				body,
				photoEncode,
				photoType,
				postedBy: user._id,
			},
			headers
		).then((rep) => {
			console.log(rep.data.post);
		});
	};
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
			<FilePond
				files={files}
				allowMultiple={false}
				onupdatefiles={setFiles}
				imageResizeTargetWidth={450}
				imageResizeTargetHeight={450}
				acceptedFileTypes={[
					"image/jpeg",
					"image/png",
					"images/gif",
				]}
			/>
			<button
				className="btn waves-effect waves-light #64b5f6 blue darken-1"
				onClick={() => PostData()}
			>
				Submit Post
			</button>
		</div>
	);
};

export default Post;
