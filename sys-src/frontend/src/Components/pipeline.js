import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useDrop } from 'react-dnd'
import Step from './PipelineSteps/step';
import Box from '@mui/material/Box';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function Pipeline() {
    const [steps, setSteps] = useState([{dragDropEnabled: false, expandButtonActive:false, showButtonActive:false, deleteButtonActive:false, title: "Uploaded Picture", params: [], info: "Uploaded Image as default." }]);

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

    const dropfieldIsVisible = canDrop || isOver
    const isActive = canDrop && isOver
    let boxBackgroundColor = 'background'
    let space = 1
    if (isActive) {
        boxBackgroundColor = 'darkgreen'
        space = 1
    } else if (canDrop) {
        boxBackgroundColor = 'darkkhaki'
        space = 1
    }

    return (
        <Card style={{ height: 900 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Pipeline</Typography>
            </CardContent>
            <CardContent>
                <Stack spacing={space} sx={{ width: '100%', maxHeight: '740px', overflow: 'auto' }}>
                    {steps.map((step, index) => (
                        <Step dragDropEnabled={step.dragDropEnabled} expandButtonActive={step.expandButtonActive} showButtonActive={step.showButtonActive} deleteButtonActive={step.deleteButtonActive} title={step.title} params={step.params} info={step.info} />
                    ))}
                </Stack>
                {dropfieldIsVisible &&
                <Box ref={drop} sx={{ bgcolor: boxBackgroundColor, width:'100%', height: '60px', mt: 1, display: 'flex', align:'center', alignItems: 'center', justifyContent: 'center'}}>
                    <AddCircleOutlineOutlinedIcon fontSize='large'/>
                </Box>
                    }
            </CardContent>
        </Card>
    );
}