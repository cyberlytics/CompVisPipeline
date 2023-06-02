import React, { useState } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

import S3Manager from './Connections/awsS3';

export default function ImageView({ currentImageID }) {
    // imageKey is the key to check if image has changed -> just load image from S3 Bucket if a new currentImageID is passed in
    // imageURL is the URL to the image to be displayed
    const [imageKey, setImageKey] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    // just load image from S3 Bucket if a new image key is needed
    // without if -> React would make to many requests to S3 even if image to load has not changed
    if (imageKey !== currentImageID) {
        const s3Manager = new S3Manager();
        setImageKey(currentImageID);

        s3Manager.getImageFromS3(currentImageID)
            .then( (res) => {
                // success handling
                setImageURL(URL.createObjectURL(new Blob([res.Body], {type: res.ContentType})));
            })
            .catch( (err) => {
                // error handling
                //console.log("Image retrieval failed");
                //console.log(err);
            });
    }

    return (
        <Card style={{ height: "485px"}} data-testid='imageview-card' >
            <CardContent style={{ height: "470px" }}>
                <Typography sx={{ width: "100%"}} align="center" variant="h5" component="div">Selected Image</Typography>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                    {imageKey && <img src={imageURL} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }}/>}
                </Box>
            </CardContent>
        </Card>
    );
}