import React from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

/**
 * PopupWindow to show some informations
 * @param  {[boolean]} open                open dialog, if true
 * @param  {[function]} onClose            function to close the dialog, when the user clicks on cancel button
 * @param  {[function]} handleFunction     function to handle the delete action, is called if the user clicks on delete button
 * @param  {[string]} dialogTitle          title of the dialog
 * @param  {[string]} dialogText           text of the dialog
 * @return {[Dialog]}                      Dialog
 * Stuff you need to use this component:
 * - You need a stateVariable                const [openDialog, setOpenDialog] = useState(false);
 * - This manages the open state of the dialog
 * - You need a function that handles the delete action
 */

export default function DeleteWindow({ open, onClose, handleFunction, dialogTitle, dialogText }) {
    
    return (
        <Dialog open={open} onClose={onClose} data-testid="deleteDialog">
        <DialogTitle data-testid="deleteDialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
            <p>{dialogText}</p>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleFunction} variant="contained" style={{backgroundColor: "#d22819", width: "90px"}} >Delete</Button>
            <Button onClick={ () => onClose(false) } variant="contained" style={{backgroundColor: "#d22819", width: "90px"}} >Cancel</Button>
        </DialogActions>
    </Dialog>
    );
}