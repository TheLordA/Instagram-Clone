/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			style={{ width: 430 }}
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		height: "100%",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	fieldContainer: { display: "flex", marginBottom: "10px" },
	fieldContainerUnderInfo: { display: "flex", marginBottom: "10px", marginTop: "10px" },
	fieldLabel: { margin: "auto 0px", marginRight: "10px", width: "25%", fontWeight: "bold" },
	fieldInput: { "& .MuiOutlinedInput-input": { padding: "10px 14px" } },
	textInfo: { color: "rgba(var(--f52,142,142,142),1)", marginBottom: "10px" },
}));

export default function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}
			>
				<Tab label="Edit Profile" {...a11yProps(0)} />
				<Tab label="Change Password" {...a11yProps(1)} />
				<Tab label="Apps and Websites" {...a11yProps(2)} />
				<Tab label="Email ans SMS" {...a11yProps(3)} />
				<Tab label="Push Notifications" {...a11yProps(4)} />
				<Tab label="Privacy and Security" {...a11yProps(5)} />
				<Tab label="Email From Insta-Clone" {...a11yProps(6)} />
			</Tabs>
			<TabPanel value={value} index={0} style={{ width: "100%" }}>
				<form noValidate autoComplete="off">
					<div className={classes.fieldContainer}>
						<Typography variant="caption" gutterBottom className={classes.fieldLabel}>
							Name
						</Typography>
						<TextField
							id="outlined-basic"
							variant="outlined"
							className={classes.fieldInput}
						/>
					</div>
					<Typography variant="caption" className={classes.textInfo}>
						Help people discover your account by using the name you're known by: either your
						full name, nickname, or business name.
					</Typography>
					<div className={classes.fieldContainerUnderInfo}>
						<Typography variant="caption" gutterBottom className={classes.fieldLabel}>
							Username
						</Typography>
						<TextField
							id="outlined-basic"
							variant="outlined"
							className={classes.fieldInput}
						/>
					</div>
					<div className={classes.fieldContainer}>
						<Typography variant="caption" gutterBottom className={classes.fieldLabel}>
							Website
						</Typography>
						<TextField
							id="outlined-basic"
							variant="outlined"
							className={classes.fieldInput}
						/>
					</div>
					<div className={classes.fieldContainer}>
						<Typography variant="caption" gutterBottom className={classes.fieldLabel}>
							Bio
						</Typography>
						<TextField
							id="outlined-basic"
							variant="outlined"
							className={classes.fieldInput}
						/>
					</div>
					<Typography variant="caption" className={classes.textInfo}>
						Personal Information
					</Typography>
					<Divider />
					<Typography variant="caption" className={classes.textInfo}>
						Provide your personal information, even if the account is used for a business, a
						pet or something else. This won't be a part of your public profile.
					</Typography>
					<div className={classes.fieldContainerUnderInfo}>
						<Typography variant="caption" gutterBottom className={classes.fieldLabel}>
							Email
						</Typography>
						<TextField
							id="outlined-basic"
							variant="outlined"
							className={classes.fieldInput}
						/>
					</div>
					<div className={classes.fieldContainer}>
						<Typography variant="caption" gutterBottom className={classes.fieldLabel}>
							Phone Number
						</Typography>
						<TextField
							id="outlined-basic"
							variant="outlined"
							className={classes.fieldInput}
						/>
					</div>
					<div className={classes.fieldContainer}>
						<Typography variant="caption" gutterBottom className={classes.fieldLabel}>
							Gender
						</Typography>
						<TextField
							id="outlined-basic"
							variant="outlined"
							className={classes.fieldInput}
						/>
					</div>
				</form>
			</TabPanel>
			<TabPanel value={value} index={1}>
				Implementation Coming Soon
			</TabPanel>
			<TabPanel value={value} index={2}>
				Implementation Coming Soon
			</TabPanel>
			<TabPanel value={value} index={3}>
				Implementation Coming Soon
			</TabPanel>
			<TabPanel value={value} index={4}>
				Implementation Coming Soon
			</TabPanel>
			<TabPanel value={value} index={5}>
				Implementation Coming Soon
			</TabPanel>
			<TabPanel value={value} index={6}>
				Implementation Coming Soon
			</TabPanel>
		</div>
	);
}
