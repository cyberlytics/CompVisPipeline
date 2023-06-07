import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Controller from '../controller';
import S3Manager from './Connections/awsS3';

export default function ImageDetails({currentImageID}) {

    const [metadata, setMetadata] = useState(null)
    const [histId, setHistId] = useState("")
    const [height, setHeight] = useState("")
    const [width, setWidth] = useState("")
    const [channels, setChannels] = useState("")
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        Controller.getImageMetadataFromBackend(currentImageID, setMetadata)
    }, [currentImageID]);

    useEffect(() => {
        setHistId(metadata["histId"])
        setHeight(metadata["heigth"])
        setWidth(metadata["width"])
        setChannels(metadata["channels"])

        const s3Manager = new S3Manager();

        s3Manager.getImageFromS3(histId)
            .then( (res) => {
                // success handling
                setImageURL(URL.createObjectURL(new Blob([res.Body], {type: res.ContentType})));
            })
            .catch( (err) => {
                // error handling
                //console.log("Image retrieval failed");
                //console.log(err);
            });
    }, [metadata]);

    return (
        <Card style={{ height: 445 }}>
            <CardContent>
                <Typography
                    sx={{ width: "100%" }}
                    align="center"
                    variant="h5"
                    component="div"
                >
                    Imagedetails
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                alt="green iguana"
                align="center"
                sx={{
                    maxHeight: "70%",
                    maxWidth: "80%",
                    margin: "auto",
                    objectFit: "contain"
                }}
                src= {imageURL}
            />
            <CardContent>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Chip
                                label={"Height: " + height}
                                sx={{ width: "100%", fontSize: 16, borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Chip
                                label={"Width: " + width}
                                sx={{ width: "100%", fontSize: 16, borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Chip
                                label={"Channels: " + channels}
                                sx={{ width: "100%", fontSize: 16, borderRadius: 2 }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}
