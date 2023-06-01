import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';

import S3Manager from './Connections/awsS3';

export default function ImageView({ currentImageID }) {
    // imageKey is the key to check if image has changed -> just load image from S3 Bucket if a new currentImageID is passed in
    // imageURL is the URL to the image to be displayed
    const [imageKey, setImageKey] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    if (imageKey !== currentImageID) {
        const s3Manager = new S3Manager();
        setImageKey(currentImageID);

        s3Manager.getImageFromS3(currentImageID)
            .then( (res) => {
                // success handling
                setImageURL(URL.createObjectURL(new Blob([res.Body], {type: "image/jpg"})));
            })
            .catch( (err) => {
                // error handling
                //console.log("Image retrieval failed");
                //console.log(err);
            });
    }

    return (
        <Card style={{ height: "445px" }} data-testid='imageview-card' >
            <CardContent style={{ height: "100%" }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    {imageKey && <img src={imageURL} />}
                </Box>
            </CardContent>
        </Card>
    );
}