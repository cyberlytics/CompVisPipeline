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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import LoginWindow from '../../ModalWindow/LoginWindow';
import RollingCat from './rollingCat';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import DeveloperMenu from './developerMenu';
import licenseTextFile from '../../resources/license.txt'

export default function Header(props) {
    const { theme, setTheme, developMode, setDevelopMode } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [licenseOpen, setLicenseIsOpen] = useState(false);
    const [licenseText, setLicenseText] = useState("");

    useEffect(() => {
        fetch(licenseTextFile)
        .then(r => r.text())
        .then(text => setLicenseText(text))
    }, []);

    //function to handle login
    const handleLoginClick = () => setLoginIsOpen(true);

    //function to handle logout
    const handleLogoutClick = () => setDevelopMode(false);

    //function to handle close login window
    const handleCloseLoginWindow = () => setLoginIsOpen(false);

    //function to refresh the page
    const refresh = () => window.location.reload()

    //function to open modalwindow for information
    const handleInfoClick = () => setIsOpen(true);

    //function to close modalwindow
    const handleClosePopup = () => setIsOpen(false);

    // function to open license window
    const handleLicenseWindowOpen = () => setLicenseIsOpen(true);

    const handleLicenseWindowClose = () => setLicenseIsOpen(false);

    let infotext = "Welcome to our cutting-edge computer vision pipeline! Unleash the power of \nvisual intelligence and redefine the way you interact with images. Discover \nhidden details, gain meaningful insights, and effortlessly achieve remarkable \nresults. Get ready to revolutionize your workflow and immerse yourself in a \nworld of unlimited possibilities."

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
                                <Grid item >
                                    { 
                                    developMode &&
                                        <DeveloperMenu />
                                    }   
                                </Grid>
                            {/* Other symboles */}
                            <Grid item>
                                <Tooltip title="License Information">
                                    <CardMembershipOutlinedIcon onClick={handleLicenseWindowOpen} fontSize='medium' data-testid="license-button"/>
                                </Tooltip>
                            </Grid>
                            <InformationPopup open={licenseOpen} onClose={handleLicenseWindowClose} headerText={"License"} text={licenseText} data-testid='license-dialog'/>
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
                                        <PersonOutlineOutlinedIcon data-testid="logout-button" fontSize='medium' onClick={handleLogoutClick} />
                                    </Tooltip> :
                                    <Tooltip title="Login to develop mode.">
                                        <PersonOffOutlinedIcon data-testid="login-button" fontSize='medium' onClick={handleLoginClick} />
                                    </Tooltip>
                                }
                                <LoginWindow data-testid="login-window" open={loginIsOpen} onClose={handleCloseLoginWindow} setState={setDevelopMode} setIsLoading={props.setIsLoading}/>
                            </Grid>
                            <Grid item>
                                {theme ?
                                    <Tooltip title="Switch to darkmode.">
                                        <DarkModeOutlinedIcon data-testid="darkmode-button" onClick={() => setTheme(!theme)} />
                                    </Tooltip> :
                                    <Tooltip title="Switch to lightmode.">
                                        <LightModeOutlinedIcon data-testid="lightmode-button" onClick={() => setTheme(!theme)} />
                                    </Tooltip>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}