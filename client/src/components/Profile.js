/**
 *
 * @author Anass Ferrak aka " TheLordA " <an.ferrak@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Web-App-MERN-Stack-Clone
 *
 */

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
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

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import DeleteIcon from "@material-ui/icons/Delete";

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
	posts: {
		width: "270px",
		height: "230px",
	},
	posts_img: {
		width: "100%",
		height: "100%",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const ProfilePage = () => {
	const classes = useStyles();
	const { state } = useContext(UserContext);
	const [data, setData] = useState([]);
	const [bookmarks, setBookmarks] = useState([]);
	const [value, setValue] = useState("Posts");

	const config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("jwt"),
		},
	};
	useEffect(() => {
		const URL = `http://localhost:5000/mypost`;
		axios.get(URL, config).then((res) => {
			setData(res.data.posts);
		});
		axios.get(`http://localhost:5000/bookmarks`, config).then((res) => {
			setBookmarks(res.data.bookmark);
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
										<Typography variant="subtitle1">
											<b>{data.length}</b> posts
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="subtitle1">
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
					TabIndicatorProps={{ style: { transform: "translateY(-70px)", backgroundColor: "#262626" } }}
				>
					<Tab label="Posts" value="Posts" icon={<Icon>grid_on_outlined</Icon>} />
					<Tab label="IGTV" value="IGTV" icon={<Icon>live_tv</Icon>} disabled />
					<Tab label="Saved" value="Saved" icon={<Icon>bookmark_border_outlined</Icon>} />
					<Tab label="Tagged" value="Tagged" icon={<Icon>local_offer_outlined</Icon>} disabled />
				</Tabs>
				<TabPanel value={value} index="Posts">
					<Grid container spacing={2}>
						{data.map((item) => (
							<Grid item xs={4} key={item.id} className={classes.posts}>
								<img
									className={classes.posts_img}
									alt="post image"
									src={`data:${item.photoType};base64,${item.photo}`}
								/>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index="Saved">
					<GridList cellHeight={230} cols={3} spacing={15}>
						{bookmarks.map((item) => (
							<GridListTile key={item._id}>
								<img src={`data:${item.PhotoType};base64,${item.Photo}`} alt={item.Title} />
								<GridListTileBar
									title={item.Title}
									subtitle={<span>By : {item.PostedBy.Name}</span>}
									actionIcon={
										<IconButton aria-label={`info about`} className={classes.icon}>
											<DeleteIcon />
										</IconButton>
									}
								/>
							</GridListTile>
						))}
					</GridList>
				</TabPanel>
			</Box>
		</React.Fragment>
	);
};

export default ProfilePage;
