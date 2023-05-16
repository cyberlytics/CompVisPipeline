import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useDrop } from 'react-dnd'
import Step from './PipelineSteps/step';

export default function Pipeline() {
    const [steps, setSteps] = useState([{expandButtonActive:false, showButtonActive:false, deleteButtonActive:false, title: "Uploaded Picture", params: [], info: "Uploaded Image as default." }]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'Step',
        drop: (item, monitor) => {
            if (!monitor.didDrop()) { //only drop if element from outside
                setSteps((prevSteps) => [...prevSteps, item]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver
    let boxBackgroundColor = 'background'
    let space = 1
    if (isActive) {
        boxBackgroundColor = 'darkgreen'
        space = 2
    } else if (canDrop) {
        boxBackgroundColor = 'darkkhaki'
        space = 2
    }

    return (
        <Card style={{ height: 900 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Pipeline</Typography>
            </CardContent>
            <CardContent>
                <Stack ref={drop} spacing={space} sx={{ width: '100%', pb:2, bgcolor: boxBackgroundColor, maxHeight: '800px', overflow: 'auto' }}>
                    {steps.map((step, index) => (
                        <Step expandButtonActive={step.expandButtonActive} showButtonActive={step.showButtonActive} deleteButtonActive={step.deleteButtonActive} title={step.title} params={step.params} info={step.info} />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}