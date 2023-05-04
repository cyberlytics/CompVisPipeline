import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function Calculator() {
    const [number1, setNumber1] = useState("")
    const [number2, setNumber2] = useState("")
    const [result, setResult] = useState("")

    async function calculateClick () {
        const response = await fetch('http://127.0.0.1:5000/get-sum?x=' + number1 + '&y=' + number2)
        const responseText = await response.text()

        setResult(responseText)
    }

    const handleText1InputChange = event => {
        setNumber1(event.target.value);
    };

    const handleText2InputChange = event => {
        setNumber2(event.target.value);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            padding={10}
        >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ width:'100%' }} align="center" variant="h5" component="div">
                        Calculator
                    </Typography>
                </CardContent>
                <CardContent>
                    <TextField id="number1" label="Zahl 1" type='number' variant="filled" onChange={handleText1InputChange}/>
                </CardContent>
                <CardContent>
                    <Typography sx={{ width:'100%' }} align="center" variant="h5"> + </Typography>
                </CardContent>
                <CardContent>
                    <TextField id="number2" label="Zahl 2" type='number'  variant="filled" onChange={handleText2InputChange}/>
                </CardContent>
                <CardActions>
                    <Button sx={{ width:'100%' }} align="center" size="small" onClick={calculateClick}>Calculate</Button>
                </CardActions>
                <CardContent>
                    <TextField id="result" label="Ergebnis" value={result} variant="filled" disabled/>
                </CardContent>
            </Card>
        </Grid>
    );
}