import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
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
	},
	settings: {},
	follow_info: { paddingRight: 40 },
	post_box: { padding: 16 },
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const ProfilePage = () => {
	const URL = `http://localhost:5000/mypost`;
	const [data, setData] = useState([]);
	const [value, setValue] = useState("Posts");
	const classes = useStyles();
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
		<React.Fragment>
			<CssBaseline />
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
										{state ? state.Name : "IsLoading ..."}
									</Typography>
									<Button
										className={classes.editButton}
										variant="outlined"
										component={Link}
										to="#"
									>
										Edit Profile
									</Button>
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
										<Typography variant="subtitle1" className={classes.follow_info}>
											<b>{data.length}</b> posts
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="subtitle1" className={classes.follow_info}>
											<b>{state ? state.Followers.length : "IsLoading ..."}</b>{" "}
											followers
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="subtitle1">
											<b>{state ? state.Following.length : "IsLoading ..."}</b>{" "}
											following
										</Typography>
									</Grid>
								</Grid>
							</Box>
							<Typography variant="subtitle1" bold>
								Siriwat Kunaporn
							</Typography>
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
					TabIndicatorProps={{ style: { transform: "translateY(-70px)", backgroundColor: "#262626" } }}
				>
					<Tab label="Posts" value="Posts" icon={<Icon>grid_on_outlined</Icon>} />
					<Tab label="IGTV" icon={<Icon>live_tv</Icon>} disabled />
					<Tab label="Saved" icon={<Icon>bookmark_border_outlined</Icon>} disabled />
					<Tab label="Tagged" icon={<Icon>local_offer_outlined</Icon>} disabled />
				</Tabs>
				<TabPanel value={value} index="Posts">
					<Grid container spacing={32}>
						{data.map((item) => (
							<Grid item xs={4} className={classes.post_box}>
								<img
									alt="post"
									style={{ width: "100%" }}
									src={`data:${item.photoType};base64,${item.photo}`}
								/>
							</Grid>
						))}

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
						<Grid item xs={4}>
							<img
								alt="post"
								style={{ width: "100%" }}
								src="https://via.placeholder.com/500/f5f5f5"
							/>
						</Grid>
						<Grid item xs={4}>
							<img
								alt="post"
								style={{ width: "100%" }}
								src="https://via.placeholder.com/500/f5f5f5"
							/>
						</Grid>
						<Grid item xs={4}>
							<img
								alt="post"
								style={{ width: "100%" }}
								src="https://via.placeholder.com/500/f5f5f5"
							/>
						</Grid>
						<Grid item xs={4}>
							<img
								alt="post"
								style={{ width: "100%" }}
								src="https://via.placeholder.com/500/f5f5f5"
							/>
						</Grid>
						<Grid item xs={4}>
							<img
								alt="post"
								style={{ width: "100%" }}
								src="https://via.placeholder.com/500/f5f5f5"
							/>
						</Grid>
						<Grid item xs={4}>
							<img
								alt="post"
								style={{ width: "100%" }}
								src="https://via.placeholder.com/500/f5f5f5"
							/>
						</Grid>
					</Grid>
				</TabPanel>
			</Box>
		</React.Fragment>
	);
};

export default ProfilePage;
