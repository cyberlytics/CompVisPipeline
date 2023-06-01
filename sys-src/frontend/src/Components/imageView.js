import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';

export default function ImageView({ currentImageID }) {
    console.log("ImageView: " + currentImageID);

    return (
        <Card style={{ height: "445px" }}>
            <CardContent style={{ height: "100%" }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    Test
                </Box>
            </CardContent>
        </Card>
    );
}