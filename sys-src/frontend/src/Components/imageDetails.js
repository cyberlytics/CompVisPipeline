import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ImageDetails() {

    return (
        <Card style={{ height: 445 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Imagedetails</Typography>
            </CardContent>
        </Card>
    );
}