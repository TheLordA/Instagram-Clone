import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { UserContext } from "../../App";

registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginFileEncode,
	FilePondPluginImageResize,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop
);

const Profile = () => {
	const URL = `http://localhost:5000/mypost`;
	const [data, setData] = useState([]);
	const [image, setImage] = useState([]);
	const { state } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("jwt"),
		},
	};
	useEffect(() => {
		axios.get(URL, config).then((res) => {
			setData(res.data.posts);
		});
	}, []);
	return (
		<div className="main">
			<div className="info-bar">
				<div className="profile-pic">
					<FilePond
						labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
						files={image}
						allowMultiple={false}
						onupdatefiles={setImage}
						imagePreviewHeight={160}
						imageCropAspectRatio="1:1"
						imageResizeTargetWidth={200}
						imageResizeTargetHeight={200}
						stylePanelLayout="compact circle"
						styleLoadIndicatorPosition="center bottom"
						styleProgressIndicatorPosition="center bottom"
						styleButtonRemoveItemPosition="center bottom"
						acceptedFileTypes={["image/jpeg", "image/png"]}
					/>
				</div>
				<div>
					<h4>{state ? state.Name : "IsLoading ..."}</h4>
					<div className="profile-detail">
						<h5>{data.length} posts</h5>
						<h5>{state ? state.Followers.length : "IsLoading ..."} followers</h5>
						<h5>{state ? state.Following.length : "IsLoading ..."} following</h5>
					</div>
				</div>
				<div>
					<MoreVertIcon />
					<SettingsIcon />
				</div>
			</div>
			<div className="gallery">
				{data.map((item) => (
					<img
						key={item.id}
						className="item"
						alt=""
						src={`data:${item.photoType};base64,${item.photo}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
