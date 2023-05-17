import React, { useState } from 'react';
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
import Parameter from './parameter.js'
import { useDrag } from 'react-dnd'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InformationPopup from '../../ModalWindow/InformationPopup.js';

export default function Step(props) {
    const {deleteStep, index, dragDropEnabled, expandButtonActive, showButtonActive, deleteButtonActive, title, params, info, id } = props;
    const [isExpanded, setIsExpandend] = useState(false)
    const [informationPopupIsOpen, setInformationPopupIsOpen] = useState(false);

    //function for move and copy to pipeline
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'Step',
        item: { dragDropEnabled: false, expandButtonActive: true, showButtonActive: true, deleteButtonActive: true, title: title, params: params, info: info, id:id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
        canDrag: () => dragDropEnabled,
    }),
    [dragDropEnabled]
    );

    //variable to change opacity from dragged item
    const opacity = isDragging ? 0.2 : 1

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
        //todo - Bild anzeigen 
    };

    //function to open modul window to show 
    const handleInfoClick = () => {
        setInformationPopupIsOpen(true);
    };

    //function to delete step from list. returns index to given function
    const handleDeleteClick = () => {
        deleteStep(index)
    };

    //returns a single step with containing parameters
    return (
        <Box ref={drag} style={{ opacity }} sx={{bgcolor: 'background.default' }}>
            <ListItem>
                {expandButtonActive &&
                    <ListItemIcon onClick={handleExpandClick} >
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemIcon>
                }
                <ListItemText primary={title} />
                <InfoOutlinedIcon onClick={handleInfoClick} sx={{ mr: 1 }} />
                {showButtonActive && <VisibilityOutlinedIcon onClick={handleShowResultClick} sx={{ mr: 1 }} />}
                {deleteButtonActive && <DeleteOutlineOutlinedIcon onClick={handleDeleteClick} />}
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {params.map((param, index) => {
                        return (
                            <Parameter key={index} sx={{ pl: 4 }} parameterName={param.title} defaultValue={param.defaultValue} info={param.info}/>
                        );
                    })}
                </List>
            </Collapse>
            <InformationPopup open={informationPopupIsOpen} onClose={handleClosePopup} headerText={title} text={info} />
        </Box>
    );
}