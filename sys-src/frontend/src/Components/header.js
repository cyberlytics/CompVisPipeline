import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Typography from '@mui/material/Typography';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import InformationPopup from '../ModalWindow/InformationPopup';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import LoginWindow from '../ModalWindow/LoginWindow';

export default function Header(props) {
    const { theme, setTheme, developMode, setDevelopMode } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [toastOpen, setToastOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("")

    useEffect(() => {
        if (developMode) {
            setToastMessage('Developer mode active');
        }
        handleToastClick()
    }, [developMode]);

    //function to open toast message
    const handleToastClick = () => setToastOpen(true);

    //function to handle login
    const handleLoginClick = () => setLoginIsOpen(true);

    //function to handle logout
    const handleLogoutClick = () => setDevelopMode(false);

    //function to handle close login window
    const handleCloseLoginWindow = () => setLoginIsOpen(false);

    //function to close toast message
    const handleToastClose = () => setToastOpen(false);

    //function to refresh the page
    const refresh = () => window.location.reload()

    //function to open modalwindow for information
    const handleInfoClick = () => setIsOpen(true);

    //function to close modalwindow
    const handleClosePopup = () => setIsOpen(false);

    let infotext = "Welcome to our cutting-edge computer vision pipeline! Unleash the power of visual intelligence and redefine the way you interact with images. Discover hidden details, gain meaningful insights, and effortlessly achieve remarkable results. Get ready to revolutionize your workflow and immerse yourself in a world of unlimited possibilities."

    return (
        <Card style={{ height: 50 }} >
            <CardContent>
                <Grid container>
                    <Grid item md={4}>
                        <Typography align="left">Computer Vision Pipeline</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Tooltip title="Refresh page.">
                                    <RestartAltIcon onClick={refresh} fontSize='medium' />
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <InfoOutlinedIcon fontSize='medium' onClick={handleInfoClick} />
                            </Grid>
                            <InformationPopup open={isOpen} onClose={handleClosePopup} headerText={"Computer Vision Pipeline"} text={infotext} />
                            <Grid item>
                                {developMode ?
                                    <Tooltip title="Logout to user mode.">
                                        <PersonOutlineOutlinedIcon fontSize='medium' onClick={handleLogoutClick} />
                                    </Tooltip> :
                                    <Tooltip title="Login to develop mode.">
                                        <PersonOffOutlinedIcon fontSize='medium' onClick={handleLoginClick} />
                                    </Tooltip>
                                }
                                <LoginWindow open={loginIsOpen} onClose={handleCloseLoginWindow} setState={setDevelopMode} />
                            </Grid>
                            <Grid item>
                                {theme ? <DarkModeOutlinedIcon onClick={() => setTheme(!theme)} /> : <LightModeOutlinedIcon onClick={() => setTheme(!theme)} />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <Snackbar open={toastOpen} autoHideDuration={4000} onClose={handleToastClose} message={toastMessage} />
        </Card>
    );
}