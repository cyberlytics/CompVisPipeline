import React, { useState } from 'react';


import { Card, CardContent, Typography, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import { v4 as uuidv4 } from 'uuid';
import S3Manager from './Connections/awsS3';

export default function Upload({setOriginalImageID}) {
    const [imageFileFlag, setImageFileFlag] = useState(false);
    const [imageDefaultFlag, setImageDefaultFlag] = useState(false);

    const handleUpload = (event) => {
        const imageFile = event.target.files[0];

        let s3Manager = new S3Manager();
        let uuid = uuidv4();

        console.log(event.target.id);

        s3Manager.pushImageToS3(imageFile, uuid)
            .then((result) => {
                console.log("Upload successful");
                setOriginalImageID(uuid);
                
                setImageDefaultFlag(false);
                setImageFileFlag(true);
            })
            .catch( (error) => {
                // error handling
                console.log("Upload failed");
                console.log(error);
            });
    };

    const handleDefaultUpload = () => {
        setOriginalImageID("defaultImage.jpg");

        setImageDefaultFlag(true);
        setImageFileFlag(false);
    };

    imageDefaultFlag ? console.log("Default image") : console.log("Not default image");

    return (
        <Card style={{ height: 90 }} data-testid='upload-card'>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Upload</Typography>
                
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <div style={{ marginRight: "20px"}}>
                    <label htmlFor="upload-image">
                        <input id="upload-image" type="file" accept=".jpg" onChange={handleUpload} style={{ display: "none" }}/> 
                        <Button variant="contained" color="primary" component="span" startIcon={ imageFileFlag ? <AddPhotoAlternateIcon /> : <AddPhotoAlternateOutlinedIcon /> }>
                            Upload Image
                        </Button>
                    </label>
                    </div>
                    <label htmlFor="upload-default-image"> 
                        <Button variant="contained" color="primary" onClick={handleDefaultUpload} startIcon={ imageDefaultFlag ? <AddPhotoAlternateIcon /> : <AddPhotoAlternateOutlinedIcon /> }>
                            Default Image
                        </Button>
                    </label>
                </div>
            </CardContent>
        </Card>
    );
}