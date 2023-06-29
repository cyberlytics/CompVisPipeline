import React, { useState, useRef } from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Collapse from '@mui/material/Collapse';
import { useDrag, useDrop } from 'react-dnd'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InformationPopup from '../../ModalWindow/InformationPopup.js';
import Parameter from './parameter.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PipelineStep(props) {
    const { stepIndex, deleteStep, title, params, info, id, moveStep, uuid, setCurrentImageID, setCurrentHistogramIDandMetadata, pipelineResult, setPipelineResult} = props;
    const [isExpanded, setIsExpandend] = useState(false)
    const [informationPopupIsOpen, setInformationPopupIsOpen] = useState(false);
    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
        accept: ['PipelineStep'],
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.stepIndex
            const hoverIndex = stepIndex
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Perform the action
            moveStep(dragIndex, hoverIndex)
            item.stepIndex = hoverIndex
            if(props.pipelineResult.length !== 0) 
            {
                let result = props.pipelineResult.result
                props.setCurrentImageID(result[0].imageId)
                props.setCurrentHistogramIDandMetadata(result[0])
                props.setPipelineResult([]) //empty result when pipeline changed
                toast.info("Pipeline result deleted due to pipeline changed.")
            }
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'PipelineStep',
        item: () => {
            return { id, stepIndex }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // Opacity for current selected item
    const opacity = isDragging ? 0.3 : 1

    drag(drop(ref))

    //function to close information popup
    const handleClosePopup = () => {
        setInformationPopupIsOpen(false);
    };

    //function to open parameters
    const handleExpandClick = () => {
        setIsExpandend(!isExpanded);
    };

    //function to show result image from selected step
    const handleShowResultClick = () => {
        if (pipelineResult.length !== 0) {
            let result = pipelineResult.result
            setCurrentImageID(result[stepIndex + 1].imageId)
            setCurrentHistogramIDandMetadata(result[stepIndex + 1])
          }
    };

    //function to open modul window to show 
    const handleInfoClick = () => {
        setInformationPopupIsOpen(true);
    };

    //function to delete step from list. returns index to given function
    const handleDeleteClick = () => {
        deleteStep(uuid)
    };

    function setValue(index, newValue) {
        params[index].value = newValue;
    }

    //returns a single step with containing parameters
    return (
        <Box data-testid={`pipeline-step-${uuid}`} className={'single-step'} ref={ref} style={{ opacity }} sx={{ bgcolor: 'background.default' }}>
            <ListItem>
                {params.length !== 0 &&
                    <ListItemIcon data-testid="expand-button" onClick={handleExpandClick}>
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemIcon>
                }
                <ListItemText primary={title} />
                <InfoOutlinedIcon data-testid="info-button" onClick={handleInfoClick} sx={{ mr: 1 }} />
                <VisibilityOutlinedIcon data-testid="showresult-button" onClick={handleShowResultClick} sx={{ mr: 1 }} />
                <DeleteOutlineOutlinedIcon data-testid="deletestep-button" onClick={handleDeleteClick} />
            </ListItem>
            {params.length !== 0 &&
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {params.map((param, index) => {
                            return (
                                <Parameter data-testid={`parameter-${index}`} key={index} index={index} sx={{ pl: 4 }} parameterName={param.title} defaultValue={param.defaultValue} value={param.value} setValue={setValue} info={param.info} />
                            );
                        })}
                    </List>
                </Collapse>
            }
            <InformationPopup data-testid={"informationpopup"} open={informationPopupIsOpen} onClose={handleClosePopup} headerText={title} text={info} />
        </Box>
    );
}