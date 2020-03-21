import React from 'react';
import { Typography } from '@material-ui/core';

import Job from './Job';
import JobModal from './JobModal';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


export default function Jobs({ jobs }) {

    //modal state
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    //pagination
    const jobsLength = jobs.length;
    const numPages = Math.ceil(jobsLength / 50);
    console.log(numPages);
    const [activeStep, setActiveStep] = React.useState(0);

    //step 0 is 0 to 49
    //step 1 is 50 to 99 so on

    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    console.log(jobs[0]);

    return (
        <div className="Jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose} />
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                Found {jobsLength} Jobs
            </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        console.log("clicked");
                        handleClickOpen();
                        selectJob(job)
                    }}
                />)
            }
            <div>

            </div>
            Found {activeStep * 50 + 1} to {(activeStep * 50) + 50} jobs
            <div>
                Page {activeStep + 1} of {numPages}
            </div>

            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                // className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                        Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </div>
    )
}