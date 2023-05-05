import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Pipeline() {

    return (
        <Card style={{ backgroundColor: "#d9d9d9", height: 900 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Pipeline</Typography>
            </CardContent>
        </Card>
    );
}