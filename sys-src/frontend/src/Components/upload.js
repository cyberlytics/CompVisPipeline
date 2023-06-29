import React, { useState } from 'react';

import { Card, Box, Button } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import { v4 as uuidv4 } from 'uuid';
import S3Manager from './Connections/awsS3';
import Controller from '../controller';
import DefaultImageWindow from '../ModalWindow/DefaultImageWindow'

/**
 * function to upload an image to the S3 Bucket (own image | default image )
 * @param {useState Function} setOriginalImageID    set Function for originalImageID (the image that was uploaded)
 * @param {useState Function} setCurrentImageID     set Function for currentImageID (the image that is currently being displayed)
 * @param {useState Function} setCurrentHistogramIDandMetadata     set Function for setCurrentHistogramIDandMetadata (the histogram that is currently being displayed)
 * @param {useState Function} setIsLoading          set Function for setIsLoading
 * @returns upload card
 */
export default function Upload({setOriginalImageID, setCurrentImageID, setCurrentHistogramIDandMetadata, setIsLoading}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleUpload = (event) => {
        setIsLoading(true)
        const imageFile = event.target.files[0];

        let fileExtension;
        let contentType;

        // get file extension from imageFile
        if (imageFile && imageFile.name) {
            const fileName = imageFile.name;
            fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
            contentType = imageFile.type;
        } else {
            // default values if no extension can read from file (normally just for testing purposes)
            fileExtension = ".jpg";
            contentType = "image/jpeg";
        }

        const s3Manager = new S3Manager();
        const imageKey = uuidv4() + fileExtension;

        s3Manager.pushImageToS3(imageFile, imageKey, contentType)
            .then((result) => {
                setOriginalImageID(imageKey);
                setCurrentImageID(imageKey);
                Controller.getImageMetadataFromBackend(imageKey, setCurrentHistogramIDandMetadata)
                setIsLoading(false)
            })
            .catch( (error) => {
                // error handling
                // console.log(error);
                setIsLoading(false)
            });
    };
    
    const handleDefaultUpload = () => {
        setIsLoading(true)
        setOriginalImageID("defaultImage.jpg");
        setCurrentImageID("defaultImage.jpg");
        Controller.getImageMetadataFromBackend("defaultImage.jpg", setCurrentHistogramIDandMetadata)
        .then(() => setIsLoading(false));
    };

    const handleAIUpload = () => {
        setIsLoading(true);
        Controller.getAiImageFromBackend(setOriginalImageID, setCurrentImageID, setCurrentHistogramIDandMetadata)
        .then(() => setIsLoading(false));
    };

    return (
        <Card style={{ height: "50px" }} data-testid='upload-card'>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <div style={{ marginRight: "30px"}}>
                    <label htmlFor="upload-image">
                        <input id="upload-image" type="file" accept=".jpg, .jpeg, .png" onChange={handleUpload} style={{ display: "none" }}/> 
                        <Button size="small" variant="contained" style={{backgroundColor: "#d22819", width: "155px"}} component="span" startIcon={ <AddPhotoAlternateOutlinedIcon /> }>
                            Upload Image
                        </Button>
                    </label>
                </div>
                <label htmlFor="upload-default-image"> 
                    <Button size="small" variant="contained" style={{backgroundColor: "#d22819", width: "155px"}} onClick={ () => {setOpenDialog(true)}} startIcon={<AddPhotoAlternateOutlinedIcon /> }>
                        Default Image
                    </Button>
                </label>

                <DefaultImageWindow open={openDialog} onClose={setOpenDialog} handleFunction1={handleDefaultUpload} handleFunction2={handleAIUpload} />

            </Box>
        </Card>
      );
}