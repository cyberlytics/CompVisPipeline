import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Step from './step';
import Controller from '../../controller';
import ExampleAvailablePipelineSteps from './availablePipelineSteps.json';

export default function PipelineSteps() {

    //If FRONTENDDEVELOPMENT, availablesteps are genereated from json in folder. This is necessary when the backend is inactive
    let FRONTENDDEVELOPMENT = true
    const AvailablePipelineSteps = FRONTENDDEVELOPMENT ? ExampleAvailablePipelineSteps : Controller.getAvailableSteps();

    //returns a list of steps from steps which are defined in availablePipelineSteps.json
    return (
        <Card style={{ height: 1000 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Available Steps</Typography>
            </CardContent>
            <CardContent>
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={1} style={{ maxHeight: '900px', overflow: 'auto' }}>
                        {AvailablePipelineSteps.map((step, index) => {
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