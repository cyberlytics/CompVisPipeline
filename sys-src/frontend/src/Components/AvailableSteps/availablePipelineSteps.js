import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AvailableStep from './availableStep';
import Controller from '../../controller';
import LocalAvailablePipelineSteps from './localAvailablePipelineSteps.json';
import SearchBar from './searchBar';

export default function AvailablePipelineSteps() {
    const [availablePipelineSteps, setAvailablePipelineSteps] = useState([])
    const [searchQuery, setSearchQuery] = useState("");


    //use this variable to map with local defined steps
    const localAvailablePipelineSteps = LocalAvailablePipelineSteps

    //get pipelinesteps from backend
    Controller.getPipelineStepsFromBackend(setAvailablePipelineSteps);

    //returns a list of steps from steps which are defined in availablePipelineSteps.json
    return (
        <Card style={{ height: 1000 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Available Steps</Typography>
            </CardContent>
            <CardContent>
                <Box sx={{ width: '100%' }}>
                    <SearchBar spacing={1} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <Stack spacing={1} style={{ maxHeight: '830px', overflow: 'auto', marginTop: '1rem' }}>
                        {availablePipelineSteps.map((step, index) => {
                            if (step.title.toLowerCase().startsWith(searchQuery.toLowerCase())) {
                                return (
                                    <AvailableStep key={index} title={step.title} params={step.params} info={step.info} id={step.id} />
                                );
                            };
                        })}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}