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

        const s3Manager = new S3Manager();
        const imageKey = uuidv4() + '.jpg';

        console.log(event.target.id);

        s3Manager.pushImageToS3(imageFile, imageKey)
            .then((result) => {
                console.log("Upload successful");
                setOriginalImageID(imageKey);
                
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

    return (
        <Card style={{ height: 90 }} data-testid='upload-card'>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Upload</Typography>
                
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                    <div style={{ marginRight: "20px"}}>
                    <label htmlFor="upload-image">
                        <input id="upload-image" type="file" accept=".jpg" onChange={handleUpload} style={{ display: "none" }}/> 
                        <Button size="small" variant="contained" color="primary" component="span" startIcon={ imageFileFlag ? <AddPhotoAlternateIcon /> : <AddPhotoAlternateOutlinedIcon /> }>
                            Upload Image
                        </Button>
                    </label>
                    </div>
                    <label htmlFor="upload-default-image"> 
                        <Button size="small" variant="contained" color="primary" onClick={handleDefaultUpload} startIcon={ imageDefaultFlag ? <AddPhotoAlternateIcon /> : <AddPhotoAlternateOutlinedIcon /> }>
                            Default Image
                        </Button>
                    </label>
                </div>
            </CardContent>
        </Card>
    );
}