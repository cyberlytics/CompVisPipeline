import React from 'react';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
//import Typography from '@mui/material/Typography';

import { Card, CardContent, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Upload({originalImageID, setOriginalImageID}) {

    setOriginalImageID = (event) => {
        console.log("Image Upload");
    }

    return (
        <Card style={{ height: 90 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Upload</Typography>
                <Button variant="contained" color="primary">
                    {/* <AddIcon />  */}
                    Upload Image
                    <input type="file" accept=".jpg" onChange={setOriginalImageID} hidden />
                </Button>
            </CardContent>
        </Card>
    );
}