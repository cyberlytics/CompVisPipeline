import { useState } from 'react';
import { Card, CardContent, Button } from '@mui/material';

export default function StartPipeline() {
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async () => {
        setLoading(true);

        try {
            const response = await fetch('/step');
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
