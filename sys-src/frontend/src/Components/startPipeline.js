import { useState } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import Controller from "../controller";

export default function StartPipeline(props) {
    const [loading, setLoading] = useState(false);



    //todo Richtige Image ID über props an sendPipelineSteps mitschicken und imageID parameter löschen
    let imageID = 4;


    const handleButtonClick = async () => {
        await Controller.sendPipelineSteps(props, setLoading, imageID)
    };

    return (
        <Card style={{ height: 90 }}>
            <CardContent>
                <Button
                    sx={{ width: '100%' }}
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
