import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';

import S3Manager from './Connections/awsS3';

export default function ImageView({ currentImageID }) {
    const [imageKey, setImageKey] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    if (imageKey !== currentImageID) {
        const s3Manager = new S3Manager();
        setImageKey(currentImageID);

        s3Manager.getImageFromS3(currentImageID)
            .then( (res) => {
                // success handling
                console.log("Image retrieval successful");
                setImageURL(URL.createObjectURL(new Blob([res.Body], {type: "image/jpg"})));
            })
            .catch( (err) => {
                console.log("Image retrieval failed");
                console.log(err);
            });

    }


    return (
        <Card style={{ height: "445px" }} >
            <CardContent style={{ height: "100%" }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    {imageKey && <img src={imageURL} />}
                </Box>
            </CardContent>
        </Card>
    );
}