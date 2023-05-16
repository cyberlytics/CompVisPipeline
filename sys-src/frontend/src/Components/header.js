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
                            <InfoOutlinedIcon fontSize='medium' />
                        </Grid>
                        <Grid item>
                            <SettingsOutlinedIcon fontSize='medium' />
                        </Grid>
                        <Grid item>
                            {theme ? <DarkModeOutlinedIcon onClick={() => setTheme(!theme)} /> : <LightModeOutlinedIcon onClick={() => setTheme(!theme)} />}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}