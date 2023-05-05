import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Header(props) {
    const { setTheme } = props;

    const [darkMode, setDarkMode] = useState(true)

    function onDarkModeClick(value) {
        setDarkMode(value)
        darkMode ? setTheme('dark') : setTheme('light')
    }

    return (
        <Card style={{ backgroundColor: "#d9d9d9", height: 50 }}>
            <CardContent>
                <Grid container>
                    <Grid md={4}>
                        <Typography align="left">Welcome</Typography>
                    </Grid>
                    <Grid container justifyContent="flex-end" md={8} spacing={2}>
                        <Grid item>
                            <RestartAltIcon fontSize='medium' />
                        </Grid>
                        <Grid item>
                            <InfoIcon fontSize='medium' />
                        </Grid>
                        <Grid item>
                            <SettingsIcon fontSize='medium' />
                        </Grid>
                        <Grid item>
                            {darkMode ? <DarkModeIcon onClick={() => onDarkModeClick(false)} /> : <LightModeIcon onClick={() => onDarkModeClick(true)} />}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}