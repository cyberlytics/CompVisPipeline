import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Typography from '@mui/material/Typography';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import InformationPopup from '../ModalWindow/InformationPopup';

export default function Header(props) {
    const { theme, setTheme } = props;
    const [isOpen, setIsOpen] = useState(false);

    //function to open modalwindow for information
    const handleInfoClick = () => {
        setIsOpen(true);
    };

    //function to close modalwindow
    const handleClosePopup = () => {
        setIsOpen(false);
    };

    let infotext = "Welcome to our cutting-edge computer vision pipeline! Unleash the power of visual intelligence and redefine the way you interact with images. Discover hidden details, gain meaningful insights, and effortlessly achieve remarkable results. Get ready to revolutionize your workflow and immerse yourself in a world of unlimited possibilities."

    return (
        <Card style={{ height: 50 }} >
            <CardContent>
                <Grid container>
                    <Grid item md={4}>
                        <Typography align="left">Welcome</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <RestartAltIcon fontSize='medium' />
                            </Grid>
                            <Grid item>
                                <InfoOutlinedIcon fontSize='medium' onClick={handleInfoClick}/>
                            </Grid>
                            <InformationPopup open={isOpen} onClose={handleClosePopup} headerText={"Computer Vision Pipeline"} text={infotext} />
                            <Grid item>
                                <SettingsOutlinedIcon fontSize='medium' />
                            </Grid>
                            <Grid item>
                                {theme ? <DarkModeOutlinedIcon onClick={() => setTheme(!theme)} /> : <LightModeOutlinedIcon onClick={() => setTheme(!theme)} />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}