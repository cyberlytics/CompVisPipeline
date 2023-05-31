import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { v4 as uuidv4 } from 'uuid';
import S3Manager from './Connections/awsS3';

export default function Upload({originalImageID, setOriginalImageID}) {

    const handleUpload = (event) => {
        const imageFile = event.target.files[0];

        console.log("S3 Manager");
        let s3Manager = new S3Manager();

        let uuid = uuidv4();
        console.log('UUID: ', uuid);
        console.log("Image File: ", imageFile);
    
        s3Manager.deleteAllImagesFromS3().then((res) => {
            console.log("Delete done");
            console.log(res);
        })

        // s3Manager.pushImageToS3(imageFile, uuid).then((result) => {
        //     console.log("Upload done");
        //     console.log("uuid: " + uuid);
        //     console.log(result);
        //     // setOriginalImageID(uuid);
        // })
        // .catch( (error) => {
        //     console.log(error);
        // });


    }

    return (
        <Card style={{ height: 90 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Upload</Typography>
                
                <input id="upload-photo" type="file" accept=".jpg" onClick={handleUpload} style={{ display: "none"}} />
                <label htmlFor="upload-photo">
                    <Button variant="contained" color="primary" component="span" startIcon={<FileUploadOutlinedIcon />}>
                        Upload Image
                    </Button>
                </label>
            </CardContent>
        </Card>
    );
}