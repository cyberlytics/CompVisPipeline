import { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import Controller from "../controller";

export default function StartPipeline(props) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(props.originalImageID === null);
    }, [props.originalImageID]);

    const handleButtonClick = async () => {
        props.setIsLoading(true)
        await Controller.sendPipelineSteps(props)
        props.setIsLoading(false)
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
