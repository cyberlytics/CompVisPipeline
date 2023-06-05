import { useState } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import Controller from "../controller";

export default function StartPipeline(props) {
    const [loading, setLoading] = useState(false);
    const handleButtonClick = async () => {
        await Controller.sendPipelineSteps(props, setLoading)
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
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    Start Pipeline
                </Button>
            </CardContent>
        </Card>
    );
}
