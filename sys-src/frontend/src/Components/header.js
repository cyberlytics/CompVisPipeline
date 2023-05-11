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
    const { theme, setTheme } = props;

    return (
        <Card style={{ height: 50 }} >
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
                            {theme ? <DarkModeIcon onClick={() => setTheme(!theme)} /> : <LightModeIcon onClick={() => setTheme(!theme)} />}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}