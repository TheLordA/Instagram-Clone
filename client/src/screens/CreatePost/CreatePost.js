import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
		padding: theme.spacing(3),
	},
}));

function getSteps() {
	return ["Select you image", "Add a post description", "Review the post"];
}

const CreatePoste = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [files, setFiles] = useState([]);
	const steps = getSteps();

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<div className={classes.filesContainer}>
						<FilePond
							files={files}
							allowMultiple={false}
							onupdatefiles={setFiles}
							imageResizeTargetWidth={450}
							imageResizeTargetHeight={450}
							acceptedFileTypes={["image/jpeg", "image/png", "images/gif"]}
							required={true}
						/>
					</div>
				);
			case 1:
				return (
					<TextField
						id="outlined-search"
						label="Post Body"
						type="text"
						variant="outlined"
						fullWidth="true"
						multiline="true"
					/>
				);
			case 2:
				return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
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

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleSubmit = () => {
		console.log("finnish line");
	};

	return (
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
										disabled={files.length === 0}
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? "Finish" : "Next"}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep ===
				steps.length(
					<Paper square elevation={0} className={classes.resetContainer}>
						<Typography>All steps completed - you&apos;re finished</Typography>
						<Button onClick={handleReset} className={classes.button}>
							Reset
						</Button>
					</Paper>
				)}
		</div>
	);
};

export default CreatePoste;
