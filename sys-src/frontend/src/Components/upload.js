import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { v4 as uuidv4 } from 'uuid';
import S3Manager from './Connections/awsS3';

export default function Upload({originalImageID, setOriginalImageID}) {

    const handleUpload = (event) => {
        const imageFile = event.target.files[0];

        let s3Manager = new S3Manager();
        let uuid = uuidv4();

        s3Manager.pushImageToS3(imageFile, uuid)
            .then((result) => {
                setOriginalImageID(uuid);
            })
            .catch( (error) => {
                console.log("Upload failed");
                console.log(error);
            });
    }

    return (
        <Card style={{ height: 90 }} data-testid='upload-card'>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Upload</Typography>
                
                <input id="upload-photo" type="file" accept=".jpg" onChange={handleUpload} style={{ display: "none"}} />
                <label htmlFor="upload-photo">
                    <Button variant="contained" color="primary" component="span" startIcon={<FileUploadOutlinedIcon />}>
                        Upload Image
                    </Button>
                </label>
            </CardContent>
        </Card>
    );
}