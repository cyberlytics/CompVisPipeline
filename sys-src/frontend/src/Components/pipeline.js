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
    const [steps, setSteps] = useState([{ dragDropEnabled: false, expandButtonActive: false, showButtonActive: false, deleteButtonActive: false, title: "Uploaded Picture", params: [], info: "Uploaded Image as default." }]);

    //function for move and copy from pipelinesteps
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'Step',
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                setSteps((prevSteps) => [...prevSteps, item]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    //variable to change the style from the box to drop steps
    const dropfieldIsVisible = canDrop || isOver
    const isActive = canDrop && isOver
    let boxBackgroundColor = 'background'
    if (isActive) {
        boxBackgroundColor = 'darkgreen'
    } else if (canDrop) {
        boxBackgroundColor = 'darkkhaki'
    }

    //function to delete a single step from list
    const deleteStep = (index) => {
        const updatedSteps = [...steps];    
        updatedSteps.splice(index, 1);      
        setSteps(updatedSteps);            
    };

    //returns the view for the pipeline configuration
    return (
        <Card style={{ height: 900 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Pipeline</Typography>
            </CardContent>
            <CardContent>
                <Stack spacing={1} sx={{ width: '100%', maxHeight: '740px', overflow: 'auto' }}>
                    {steps.map((step, index) => (
                        <Step deleteStep={deleteStep} index={index} dragDropEnabled={step.dragDropEnabled} expandButtonActive={step.expandButtonActive} showButtonActive={step.showButtonActive} deleteButtonActive={step.deleteButtonActive} title={step.title} params={step.params} info={step.info} />
                    ))}
                </Stack>
                {dropfieldIsVisible &&
                    <Box ref={drop} sx={{ bgcolor: boxBackgroundColor, width: '100%', height: '60px', mt: 1, display: 'flex', align: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <AddCircleOutlineOutlinedIcon fontSize='large' />
                    </Box>
                }
            </CardContent>
        </Card>
    );
}