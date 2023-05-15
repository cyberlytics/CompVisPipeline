import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Step from './step'
import AvailablePipelineSteps from './availablePipelineSteps.json';

export default function PipelineSteps() {
    return (
        <Card style={{ height: 1000 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Available Steps</Typography>
            </CardContent>
            <CardContent>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List component="nav">
                        {AvailablePipelineSteps.map(step => {
                            return (
                                <>
                                {step.id > 0 && 
                                    <Divider/>
                                }
                                <Step isClickable={true} title={step.title} id={step.id} params={step.params} />
                                </>       
                            );
                        })}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
}