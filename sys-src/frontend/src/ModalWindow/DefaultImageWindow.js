import React from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * PopupWindow to pick defaultImage or fetch an AI generated Cat from a website
 * @param  {[boolean]} open                open dialog, if true
 * @param  {[function]} onClose            function to close the dialog, when the user clicks on cancel button
 * @param  {[function]} handleFunction1    function to handle the button1 action, is called if the user clicks on default image button
 * @param  {[function]} handleFunction2    function to handle the button2 action, is called if the user clicks on ai image button
 * @return {[Dialog]}                      Dialog
 * Stuff you need to use this component:
 * - You need a stateVariable                const [openDialog, setOpenDialog] = useState(false);
 * - This manages the open state of the dialog
 * - You need 2 handlerFunctios, one for each button
 */

export default function DeleteWindow({ open, onClose, handleFunction1, handleFunction2 }) {

    return (
        <Dialog open={open} data-testid="defaultImageDialog">
        <DialogTitle data-testid="defaultImageDialog-title">
            {"Pick a method"}
            <IconButton data-testid="defaultImageWindow-abort" onClick={() => onClose(false) } sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }} >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <p>{"Pick 'default image' button for a default cat image or pick the 'AI image' button cat to generate a cat image from an AI"}</p>
        </DialogContent>
        <DialogActions >
            <Button onClick={ () => { handleFunction1(); onClose(false); }} variant="contained" style={{backgroundColor: "#d22819", width: "150px"}} >Default Image</Button>
            <Button onClick={() => { handleFunction2(); onClose(false); }} variant="contained" style={{backgroundColor: "#d22819", width: "150px"}} >AI Image</Button>
        </DialogActions>
    </Dialog>
    );
}