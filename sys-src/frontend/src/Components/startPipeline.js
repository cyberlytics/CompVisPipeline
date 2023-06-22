import { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import Controller from "../controller";
import soundFile from '../resources/cat2.wav'; // Passe den Pfad zur MP3-Datei entsprechend an

export default function StartPipeline(props) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(props.originalImageID === null);
    }, [props.originalImageID]);

    const handleButtonClick = async () => {
        props.setIsLoading(true);
        const audio = new Audio(soundFile);
        audio.play();
        await Controller.sendPipelineSteps(props);
        props.setIsLoading(false);
    };

    return (
        <Card style={{ height: 90 }}>
            <CardContent>
                <Button
                    sx={{
                        width: '100%',
                        bgcolor: '#d22819' // Setze die Hintergrundfarbe auf "#d22819"
                    }}
                    variant="contained"
                    color="primary"
                    disabled={isButtonDisabled || props.isLoading}
                    onClick={handleButtonClick}
                >
                    Start Pipeline
                </Button>
            </CardContent>
        </Card>
    );
}
