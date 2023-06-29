import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';

import S3Manager from './Connections/awsS3';

/**
 * function to display the image that is currently selected
 * @param {string} currentImageID    ID of the image to be displayed 
 * @returns Image view card
 */
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
            .then((res) => {
                // success handling
                setImageURL(URL.createObjectURL(new Blob([res.Body], { type: res.ContentType })));
            })
            .catch((err) => {
                // error handling
                //console.log("Image retrieval failed");
                //console.log(err);
            });
    }

    const handleDownload = () => {
        // create a link element, set the href and download attributes, and then simulate a click event on the element
        // to start the download of the image
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = currentImageID;
        link.click();
    };
    
    return(
        <Card style={{ height: "400px" }} data-testid='imageview-card'>
            <CardContent style={{ height: "10px" }}>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Selected Image</Typography>
            </CardContent>
            <CardContent style={{ height: "390px" }}>
            {currentImageID && (
                <div style={{ height: "100%" }}>
                    <CardMedia data-testid="uploaded_image" component="img" src={imageURL} alt="" align="center" style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto", objectFit: "contain"}} />
                    <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="small" variant="contained" style={{backgroundColor: "#d22819", width: "175px", marginTop: "5px"}} onClick={handleDownload} component="span" startIcon={ <GetAppOutlinedIcon /> }>
                            Download Image
                        </Button>
                    </CardContent>
                </div>
            )}                
            </CardContent>
        </Card>
    );
}