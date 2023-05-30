import { useState } from 'react';
import { Card, CardContent, Button } from '@mui/material';

export default function StartPipeline(props) {
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async () => {
        console.log(props.steps)
        const endpoint = "/start-pipeline/";
        const imageID = 4;
        const path = endpoint + imageID;
        setLoading(true);

        try {
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.steps)
            });
            setLoading(false);
        } catch (error) {
            console.error('Fehler beim Aufrufen des Endpunkts:', error);
            setLoading(false);
        }
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
