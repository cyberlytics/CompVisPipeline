import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * PopupWindow to show loading screen
 * @param  {[boolean]} open         open dialog, if true
 * @param  {[function]} onClose     function to close the dialog
 * @return {[Dialog]}               Dialog
 */

export default function LoadingWindow({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle data-testid="loading-screen-title">
        Loading...
      </DialogTitle>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
}