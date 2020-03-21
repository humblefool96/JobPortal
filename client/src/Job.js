import React from 'react';
import { Paper, Typography } from '@material-ui/core'

export default function Job({job, onClick}) {
    return(
        <Paper onClick={onClick} className='job'>
            <div>
                <Typography variant='h6'>{job.title}</Typography>
                <Typography variant='h5'>{job.company}</Typography>
                <Typography variant='h5'>{job.location}</Typography>
            </div>
            <div>
            <Typography variant='h5'>{job.created_at.split(" ").slice(0, 3).join(" ")} </Typography>
            </div>
            
        </Paper>
    )
}