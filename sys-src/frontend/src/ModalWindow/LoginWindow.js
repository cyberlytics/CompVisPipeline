import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Controller from '../controller';

/**
 * PopupWindow to show some informations
 * @param  {[boolean]} open           open dialog, if true
 * @param  {[function]} onClose       function to close the dialog
 * @param  {[boolean]} setState       sets a state 
 * @param  {[useState Function]} setIsLoading  setLoadingStatus
 * @return {[Dialog]}                 Dialog
 */
export default function LoginWindow({ open, onClose, setState, setIsLoading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (open) {
      setUsername('');
      setPassword('');
      setErrorMessage('');
    }
  }, [open]);

  const handleLogin = async () => {
    setIsLoading(true)
    const isAuthenticated = await Controller.login(username, password);
    if (isAuthenticated) {
      setState(true);
      onClose();
    } else {
      setErrorMessage('Incorrect Username or Password');
    }
    setIsLoading(false)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Dialog data-testid="login-window" open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle id="login-title" textAlign={'center'}>Login as developer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your username and password.
        </DialogContentText>
        <TextField autoFocus margin="dense" label="Username" type="text" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress}/>
        <TextField margin="dense" label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
        {errorMessage && (
          <DialogContentText role="alert" style={{ color: "red" }} data-testid='error-message'>
            {errorMessage}
          </DialogContentText>
        )}
        <Button variant="contained" onClick={handleLogin} style={{backgroundColor: "#d22819", marginTop: "20px"}} fullWidth data-testid='login-button'> Login </Button>
      </DialogContent>
    </Dialog>
  );
}