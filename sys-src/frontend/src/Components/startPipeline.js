import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StartPipeline() {

    return (
        <Card style={{ backgroundColor: "#d9d9d9", height: 90 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Start Pipeline</Typography>
            </CardContent>
        </Card>
    );
}