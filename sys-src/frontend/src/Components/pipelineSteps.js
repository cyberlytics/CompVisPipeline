import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function PipelineSteps() {

    return (
        <Card style={{ height: 1000 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Available Steps</Typography>
            </CardContent>
        </Card>
    );
}