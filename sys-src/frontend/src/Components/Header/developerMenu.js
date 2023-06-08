import React, { useState } from 'react';
import { Button, Tooltip} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import DeleteWindow from '../../ModalWindow/DeleteWindow';
import S3Manager from '../Connections/awsS3';

/**
 * Developer Menu with some functions for the developer.
 * Just visible in develop mode (after login)
 * @returns Developer Menu Card
 */
export default function DeveloperMenu() {

    const dialogTitle = "Delete all Images in S3";
    const dialogText = "Are you sure you want to delete all images in S3?";

    const [openDialog, setOpenDialog] = useState(false);
    
    const handleDeleteAllImages = () => {
        const s3Manager = new S3Manager();
        s3Manager.deleteAllImagesFromS3();

        setOpenDialog(false);
    };
    

    return (
        <Grid container spacing={2} >
            <Grid item>
                <Tooltip title="Delete all Images in S3">
                    <DeleteOutlineIcon fontSize='medium' onClick={ () => setOpenDialog(true) } data-testid="deleteButton-icon"/>
                </Tooltip>
            </Grid>
            <Grid item >
                <Divider orientation="vertical" flexItem style={{ height: "100%"}} />
            </Grid>
        

            {/* Accept Dialog */}
            <DeleteWindow open={openDialog} onClose={setOpenDialog} handleFunction={handleDeleteAllImages} dialogTitle={dialogTitle} dialogText={dialogText} />
        </Grid>
    );
}