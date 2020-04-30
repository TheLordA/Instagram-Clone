import React from "react";
import "./Profile.css";

const Profile = () => {
	return (
		<div className="main">
			<div className="info-bar">
				<div>
					<img
						className="profile-pic"
						src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
						alt=""
					/>
				</div>
				<div>
					<h4>TheLordA</h4>
					<div className="profile-detail">
						<h5>40 posts</h5>
						<h5>40 followers</h5>
						<h5>40 following</h5>
					</div>
				</div>
			</div>
			<div className="gallery">
				<img
					className="item"
					src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
					alt=""
				/>
				<img
					className="item"
					src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
					alt=""
				/>
				<img
					className="item"
					src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
					alt=""
				/>
				<img
					className="item"
					src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
					alt=""
				/>
				<img
					className="item"
					src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
					alt=""
				/>
			</div>
		</div>
	);
};

export default Profile;
