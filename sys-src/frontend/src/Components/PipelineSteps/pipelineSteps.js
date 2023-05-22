import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Step from './step';
import Controller from '../../controller';
import AvailablePipelineSteps from './availablePipelineSteps.json';

export default function PipelineSteps() {
    const [pipelineSteps, setPipelineSteps] = React.useState([])

    //use this variable to map with local defined steps
    const localPipelineSteps = AvailablePipelineSteps

    //get pipelinesteps from backend
    Controller.getPipelineStepsFromBackend(setPipelineSteps);

    //returns a list of steps from steps which are defined in availablePipelineSteps.json
    return (
        <Card style={{ height: 1000 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Available Steps</Typography>
            </CardContent>
            <CardContent>
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={1} style={{ maxHeight: '900px', overflow: 'auto' }}>
                        {pipelineSteps.map((step, index) => {
                            return (
                                <Step key={index} dragDropEnabled={true} expandButtonActive={false} showButtonActive={false} deleteButtonActive={false} title={step.title} params={step.params} info={step.info} />
                            );
                        })}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}