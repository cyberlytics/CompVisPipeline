import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * PopupWindow to show some informations
 * @param  {[boolean]} open         open dialog, if true
 * @param  {[function]} onClose     function to close the dialog
 * @param  {[string]} headerText    defines the header text
 * @param  {[string]} text          defines the information text
 * @return {[Dialog]}               Dialog
 */
export default function InformationPopup({ open, onClose, headerText, text }) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {headerText}
        </DialogTitle>
        <pre>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
        </pre>
      </Dialog>
    );
  }