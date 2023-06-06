import React, { useState } from 'react';
import { Button, Tooltip} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import S3Manager from '../Connections/awsS3';

/**
 * Developer Menu with some functions for the developer.
 * Just visible in develop mode (after login)
 * @returns Developer Menu Card
 */
export default function DeveloperMenu() {

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
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} data-testid="deleteDialog">
                <DialogTitle data-testid="deleteDialog-title">Delete all Images in S3</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete all images in S3?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteAllImages} variant="contained" style={{backgroundColor: "#d22819", width: "90px"}} >Delete</Button>
                    <Button onClick={() => setOpenDialog(false)} variant="contained" style={{backgroundColor: "#d22819", width: "90px"}} >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}