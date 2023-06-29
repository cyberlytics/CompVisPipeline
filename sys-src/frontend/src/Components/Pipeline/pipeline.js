import update from 'immutability-helper'
import React, { useCallback, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useDrop } from 'react-dnd'
import PipelineStep from './pipelineStep';
import Box from '@mui/material/Box';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { v4 as uuidv4 } from 'uuid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Pipeline(props) {

    //function for drag and drop in pipeline
    const [{ canDrop, isOver }, drop] = useDrop(() => ({

        accept: ['AvailableStep'],
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                const newItem = {
                    ...item,
                    uuid: uuidv4(), //unique uuid for each item in list
                    params: JSON.parse(JSON.stringify(item.params))
                };
                props.setSteps((prevSteps) => [...prevSteps, newItem]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    //empty pipelineresult when pipeline changed.
    useEffect(() => {
        if (props.pipelineResult.length !== 0) {
            let result = props.pipelineResult.result
            props.setCurrentImageID(result[0].imageId)
            props.setCurrentHistogramIDandMetadata(result[0])
            props.setPipelineResult([]) 
            toast.info("Pipeline result deleted due to pipeline changed.")
        }
    }, [props.steps]);

    //variable to change the style from the box to drop steps
    const dropfieldIsVisible = canDrop || isOver
    const isActive = canDrop && isOver
    let boxBackgroundColor = 'background'
    if (isActive) {
        boxBackgroundColor = 'darkgreen'
    } else if (canDrop) {
        boxBackgroundColor = 'darkkhaki'
    }

    // Function to delete a single step from list
    const deleteStep = (uuid) => {
        props.setSteps((prevSteps) => prevSteps.filter((step) => step.uuid !== uuid));
        if (props.pipelineResult.length !== 0) {
            let result = props.pipelineResult.result
            props.setCurrentImageID(result[0].imageId)
            props.setCurrentHistogramIDandMetadata(result[0])
            props.setPipelineResult([]) //empty result when pipeline changed
            toast.info("Pipeline result deleted due to pipeline changed.")
        }
    };

    //function to show uploaded picture
    const handleShowUploadedPictureClick = () => {
        if (props.pipelineResult.length !== 0) {
            let result = props.pipelineResult.result
            props.setCurrentImageID(result[0].imageId)
            props.setCurrentHistogramIDandMetadata(result[0])
        }
    };

    // Function to move the items in the stack
    const moveStep = useCallback((dragIndex, hoverIndex) => {
        props.setSteps((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])

    // Function to rerender the steps
    const renderStep = useCallback((step, index) => {
        return (
            <PipelineStep
                key={step.uuid}
                deleteStep={deleteStep}
                stepIndex={index}
                title={step.title}
                params={step.params}
                info={step.info}
                id={step.id}
                moveStep={moveStep}
                uuid={step.uuid}
                setCurrentImageID={props.setCurrentImageID}
                setCurrentHistogramIDandMetadata={props.setCurrentHistogramIDandMetadata}
                pipelineResult={props.pipelineResult}
                setPipelineResult={props.setPipelineResult}
            />
        )
    }, [props.pipelineResult])

    //returns the view for the pipeline configuration
    return (
        <Card style={{ height: 900 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Pipeline</Typography>
            </CardContent>
            <CardContent>
                <Stack spacing={1} sx={{ width: '100%', maxHeight: '740px', overflow: 'auto' }}>
                    <Box className={'step-uploadedPicture'} sx={{ bgcolor: 'background.default' }}>
                        <ListItem>
                            <ListItemText primary={'Uploaded Picture'} />
                            <VisibilityOutlinedIcon data-testid="showuploadedpicture-button" onClick={handleShowUploadedPictureClick} sx={{ mr: 1 }} />
                        </ListItem>
                    </Box>
                    {props.steps.map((step, index) => (
                        renderStep(step, index)
                    ))}
                </Stack>
                {dropfieldIsVisible &&
                    <Box data-testid="dropzone" ref={drop} sx={{ bgcolor: boxBackgroundColor, width: '100%', height: '60px', mt: 1, display: 'flex', align: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <AddCircleOutlineOutlinedIcon fontSize='large' />
                    </Box>
                }
            </CardContent>
        </Card>
    );
}