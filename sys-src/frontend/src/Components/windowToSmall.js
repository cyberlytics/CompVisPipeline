import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import AngryCat from "../resources/AngryCat.png";

export default function WindowToSmall() {

    return (
        <div>
            <Card style={{ height: 260 }} align="center">
                <CardContent >
                    <img src={AngryCat} alt="Angry Cat" style={{ width: 250, marginBottom: 10 }} align="center" />
                </CardContent>
                <CardContent>
                    <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Maximize the window immediately!</Typography>
                </CardContent>
            </Card>
        </div>
    );
}