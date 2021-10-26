/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { config as axiosConfig, CREATE_POST_URL } from "../config/constants";
import Navbar from "../components/Navbar";

// Material-UI deps
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Alert from "@material-ui/lab/Alert";
// FilePond deps
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginFileEncode,
	FilePondPluginImageResize,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateType
);

// General Style
const useStyles = makeStyles((theme) => ({
	root: {
		width: "70%",
		margin: "40px auto",
	},
	filesContainer: { maxWidth: "500px", margin: "auto" },
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		width: "30%",
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: "6px 24px",
	},
	TextField: {
		margin: "10px 0px",
	},
	reviewRoot: {
		maxWidth: 400,
		flexGrow: 1,
		margin: "10px auto",
	},
	reviewImg: {
		height: 255,
		display: "block",
		maxWidth: 400,
		overflow: "hidden",
		width: "100%",
	},
	reviewBottom: {
		display: "flex",
		alignItems: "center",
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	finishStyle: {
		width: "fit-content",
		margin: "auto",
	},
}));

const getSteps = () => {
	return ["Select you image", "Tag a Friend", "Submit the post"];
};

const CreatePoste = () => {
	const classes = useStyles();
	const history = useHistory();
	const [files, setFiles] = useState([]);
	const [caption, setCaption] = useState("");
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const [query, setQuery] = useState("idle");
	const timerRef = useRef();

	const config = axiosConfig(localStorage.getItem("jwt"));

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[]
	);

	const handlePostData = () => {
		// the Index 0 means the first file , we will add in the future the support of multiple
		// images upload , the max will be 10 images per post
		const photoEncode = files[0].getFileEncodeBase64String();
		const photoType = files[0].fileType;
		Axios.post(
			CREATE_POST_URL,
			{
				title: caption,
				body: caption,
				photoEncode,
				photoType,
			},
			config
		).then((rep) => {
			if (rep.data.message) {
				setQuery("success");
			}
		});
	};

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<div className={classes.filesContainer}>
						<FilePond
							labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
							files={files}
							allowMultiple={false}
							onupdatefiles={setFiles}
							imageResizeTargetWidth={450}
							imageResizeTargetHeight={450}
							acceptedFileTypes={["image/jpeg", "image/png", "images/gif"]}
							required={true}
						/>
						<TextField
							className={classes.TextField}
							id="outlined-search"
							label="Caption"
							type="text"
							variant="outlined"
							fullWidth="true"
							multiline="true"
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>
					</div>
				);
			case 1:
				return "This functionality isn't available for the moment";
			case 2:
				return;
			default:
				return "Unknown step";
		}
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleClickQuery = () => {
		clearTimeout(timerRef.current);
		if (query !== "idle") {
			setQuery("idle");
			return;
		}
		setQuery("progress");
		timerRef.current = setTimeout(() => {
			history.push("/");
		}, 4000);
	};

	const handleSubmit = () => {
		handleNext();
		handleClickQuery();
		handlePostData();
	};

	return (
		<>
			<Navbar />
			<div className={classes.root}>
				<Stepper component={Paper} elevation={3} activeStep={activeStep} orientation="vertical">
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								<Typography>{getStepContent(index)}</Typography>
								<div className={classes.actionsContainer}>
									<div>
										<Button
											disabled={activeStep === 0}
											onClick={handleBack}
											className={classes.button}
										>
											Back
										</Button>
										<Button
											disabled={files.length === 0 || caption === ""}
											variant="contained"
											color="primary"
											onClick={
												activeStep === steps.length - 1
													? handleSubmit
													: handleNext
											}
											className={classes.button}
										>
											{activeStep === steps.length - 1 ? "Submit" : "Next"}
										</Button>
									</div>
								</div>
							</StepContent>
						</Step>
					))}
					{activeStep === steps.length && (
						<Paper square elevation={0} className={classes.resetContainer}>
							<div className={classes.finishStyle}>
								{query === "success" ? (
									<Alert variant="outlined" severity="success">
										Your post has been successfully submitted — check it out!
									</Alert>
								) : (
									<Fade
										className={classes.finishStyle}
										in={query === "progress"}
										style={{
											transitionDelay:
												query === "progress" ? "100ms" : "0ms",
										}}
										unmountOnExit
									>
										<CircularProgress />
									</Fade>
								)}
							</div>
						</Paper>
					)}
				</Stepper>
			</div>
		</>
	);
};

export default CreatePoste;
