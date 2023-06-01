import React from 'react';

import { Card, CardContent, Box, Button } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import { v4 as uuidv4 } from 'uuid';
import S3Manager from './Connections/awsS3';

export default function Upload({setOriginalImageID, setCurrentImageID}) {
    const handleUpload = (event) => {
        const imageFile = event.target.files[0];

        const s3Manager = new S3Manager();
        const imageKey = uuidv4() + '.jpg';

        console.log(event.target.id);

        s3Manager.pushImageToS3(imageFile, imageKey)
            .then((result) => {
                setOriginalImageID(imageKey);
                setCurrentImageID(imageKey);
            })
            .catch( (error) => {
                // error handling
                console.log(error);
            });
    };

    const handleDefaultUpload = () => {
        setOriginalImageID("defaultImage.jpg");
        setCurrentImageID("defaultImage.jpg");
    };

    return (
        <Card style={{ height: "90px" }} data-testid='upload-card'>
          <CardContent style={{ height: "100%" }}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <div style={{ marginRight: "40px"}}>
                    <label htmlFor="upload-image">
                        <input id="upload-image" type="file" accept=".jpg" onChange={handleUpload} style={{ display: "none" }}/> 
                        <Button size="medium" variant="contained" style={{backgroundColor: "#d22819"}} component="span" startIcon={ <AddPhotoAlternateOutlinedIcon /> }>
                            Upload Image
                        </Button>
                    </label>
                </div>
                <label htmlFor="upload-default-image"> 
                    <Button size="medium" variant="contained" style={{backgroundColor: "#d22819"}} onClick={handleDefaultUpload} startIcon={<AddPhotoAlternateOutlinedIcon /> }>
                        Default Image
                    </Button>
                </label>
            </Box>
          </CardContent>
        </Card>
      );
}