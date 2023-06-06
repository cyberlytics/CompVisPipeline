import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Typography from '@mui/material/Typography';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import InformationPopup from '../../ModalWindow/InformationPopup';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import LoginWindow from '../../ModalWindow/LoginWindow';
import RollingCat from './rollingCat';

import DeveloperMenu from './developerMenu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


export default function Header(props) {
    const { theme, setTheme, developMode, setDevelopMode } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [toastOpen, setToastOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("")

    useEffect(() => {
        if (developMode) {
            setToastMessage('Enjoy the developer mode.'); 
        }
        else {
            setToastMessage('Enjoy the user mode.');
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
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <Typography align="left">Computer Vision Pipeline</Typography>
                            </Grid>
                            <Grid item>
                                <RollingCat/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={8} >
                        <Grid container justifyContent="flex-end" spacing={2}>
                                {/* Developer Menu */}
                                <Grid item>
                                    { developMode &&
                                        <DeveloperMenu />
                                    }   
                                </Grid>
                            {/* Other symboles */}
                            <Grid item>
                                <Tooltip title="Refresh page.">
                                    <RestartAltIcon onClick={refresh} fontSize='medium' data-testid='refresh-button'/>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Show Information">
                                    <InfoOutlinedIcon fontSize='medium' onClick={handleInfoClick} data-testid='info-button' />
                                </Tooltip>
                            </Grid>
                            <InformationPopup open={isOpen} onClose={handleClosePopup} headerText={"Computer Vision Pipeline"} text={infotext} data-testid='info-dialog'/>
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
                                {theme ?
                                    <Tooltip title="Switch to darkmode.">
                                        <DarkModeOutlinedIcon onClick={() => setTheme(!theme)} />
                                    </Tooltip> :
                                    <Tooltip title="Switch to lightmode.">
                                        <LightModeOutlinedIcon onClick={() => setTheme(!theme)} />
                                    </Tooltip>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleToastClose} message={toastMessage} />
        </Card>
    );
}