/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../contexts/auth/Auth.context";
import { UPDATE_FOLLOW_DATA } from "../contexts/types";
import { config as axiosConfig } from "../config/constants";
// Material-UI Components
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// General Styles
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 935,
		margin: "auto",
		padding: "60px 20px 0",
	},
	avatar_container: { margin: "auto" },
	avatar: { width: 152, height: 152 },
	editButton: {
		marginLeft: 20,
		backgroundColor: "paleturquoise",
	},
	settings: {},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const UserProfilePage = () => {
	const classes = useStyles();
	const [value, setValue] = useState("Posts"); // to switch between different tabs
	const { state, dispatch } = useContext(AuthenticationContext);
	const { userid } = useParams();
	const [data, setData] = useState(null);
	const [showFollow, setShowFollow] = useState(state ? !state.Following.includes(userid) : null);

	const config = axiosConfig(localStorage.getItem("jwt"));

	useEffect(() => {
		axios.get(`http://localhost:5000/user/${userid}`, config).then((res) => {
			setData(res.data);
		});
	}, []);

	const followUser = () => {
		axios.put(`http://localhost:5000/follow`, { followId: userid }, config).then((result) => {
			dispatch({
				type: UPDATE_FOLLOW_DATA,
				payload: { Followers: result.data.Followers, Following: result.data.Following },
			});
			localStorage.setItem("user", JSON.stringify(result.data));
			setData((prevState) => {
				return {
					...prevState,
					user: {
						...prevState.user,
						Followers: [...prevState.user.Followers, result.data._id],
					},
				};
			});
			setShowFollow(false);
		});
	};

	const unfollowUser = () => {
		axios.put(`http://localhost:5000/unfollow`, { unfollowId: userid }, config).then((result) => {
			dispatch({
				type: UPDATE_FOLLOW_DATA,
				payload: { Followers: result.data.Followers, Following: result.data.Following },
			});
			localStorage.setItem("user", JSON.stringify(result.data));
			setData((prevState) => {
				const newFollower = prevState.user.Followers.filter((item) => item !== result.data._id);
				return {
					...prevState,
					user: {
						...prevState.user,
						Followers: newFollower,
					},
				};
			});
			setShowFollow(true);
		});
	};

	return (
		<React.Fragment>
			<CssBaseline />
			{data ? (
				<Box component="main" className={classes.root}>
					<Box mb="44px">
						<Grid container>
							<Grid item xs={4} className={classes.avatar_container}>
								<Avatar
									className={classes.avatar}
									style={{ margin: "auto" }}
									src="https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg"
								/>
							</Grid>
							<Grid item xs={8}>
								<Box clone mb="20px">
									<Grid container alignItems="center">
										<Typography variant="h5">
											{data.user ? data.user.Name : "Is Loading ..."}
										</Typography>
										{showFollow ? (
											<Button
												className={classes.editButton}
												variant="outlined"
												onClick={() => followUser()}
											>
												Follow
											</Button>
										) : (
											<Button
												className={classes.editButton}
												variant="outlined"
												onClick={() => unfollowUser()}
											>
												UnFollow
											</Button>
										)}

										<div className={classes.settings}>
											<IconButton component={Link} to="#">
												<Icon>settings</Icon>
											</IconButton>
										</div>
									</Grid>
								</Box>
								<Box mb="20px">
									<Grid container spacing={4}>
										<Grid item>
											<Typography variant="subtitle1">
												<b>
													{data.posts
														? data.posts.length
														: "IsLoading..."}
												</b>{" "}
												posts
											</Typography>
										</Grid>
										<Grid item>
											<Typography variant="subtitle1">
												<b>
													{data.user
														? data.user.Followers.length
														: "IsLoading..."}
												</b>{" "}
												followers
											</Typography>
										</Grid>
										<Grid item>
											<Typography variant="subtitle1">
												<b>
													{data.user
														? data.user.Following.length
														: "IsLoading..."}
												</b>{" "}
												following
											</Typography>
										</Grid>
									</Grid>
								</Box>
								<Typography variant="subtitle1">Siriwat Kunaporn</Typography>
								<Typography variant="subtitle1">Bangkok Christian College</Typography>
								<Typography variant="subtitle1">CU intania 96.</Typography>
							</Grid>
						</Grid>
					</Box>
					<Tabs
						value={value}
						centered
						onChange={(event, value) => {
							setValue(value);
						}}
						TabIndicatorProps={{
							style: { transform: "translateY(-70px)", backgroundColor: "#262626" },
						}}
					>
						<Tab label="Posts" value="Posts" icon={<Icon>grid_on_outlined</Icon>} />
						<Tab label="IGTV" value="IGTV" icon={<Icon>live_tv</Icon>} disabled />
						<Tab
							label="Tagged"
							value="Tagged"
							icon={<Icon>local_offer_outlined</Icon>}
							disabled
						/>
					</Tabs>
					<TabPanel value={value} index="Posts">
						<Grid container spacing={2}>
							{data.posts
								? data.posts.map((item) => (
										<Grid item xs={4} key={item.id}>
											<img
												alt="post"
												style={{ width: "100%", height: "100%" }}
												src={`data:${item.PhotoType};base64,${item.Photo}`}
											/>
										</Grid>
								  ))
								: "Is Loading ..."}

							<Grid item xs={4} className={classes.post_box}>
								<img
									alt="post"
									style={{ width: "100%" }}
									src="https://via.placeholder.com/500/f5f5f5"
								/>
							</Grid>
							<Grid item xs={4} className={classes.post_box}>
								<img
									alt="post"
									style={{ width: "100%" }}
									src="https://via.placeholder.com/500/f5f5f5"
								/>
							</Grid>
						</Grid>
					</TabPanel>
				</Box>
			) : (
				"Is Loading ..."
			)}
		</React.Fragment>
	);
};

export default UserProfilePage;
