import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ImageView() {

    return (
        <Card style={{ height: 445 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Image</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    Test
                </Box>
                
            </CardContent>
        </Card>
    );
}