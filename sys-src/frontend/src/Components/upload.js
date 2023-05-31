import React from 'react';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
//import Typography from '@mui/material/Typography';

import { Card, CardContent, Typography, Button } from '@mui/material';

export default function Upload(originalImageID) {

    return (
        <Card style={{ height: 90 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Upload</Typography>
                
            </CardContent>
        </Card>
    );
}