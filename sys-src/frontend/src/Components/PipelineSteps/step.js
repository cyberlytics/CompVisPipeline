import React, { useState } from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
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
    const { expandButtonActive, showButtonActive, deleteButtonActive, title, params, info } = props;
    const [isExpanded, setIsExpandend] = useState(false)
    const [informationPopupIsOpen, setInformationPopupIsOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'Step',
        item: { expandButtonActive: true, showButtonActive: true, deleteButtonActive: true, title: title, params: params, info: info },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));

    const opacity = isDragging ? 0.4 : 1

    const handleClosePopup = () => {
        setInformationPopupIsOpen(false);
    };

    const handleItemClick = () => {
        //todo
    };

    const handleExpandClick = () => {
        setIsExpandend(!isExpanded);
    };

    const handleShowResultClick = () => {
        //todo
    };

    const handleInfoClick = () => {
        setInformationPopupIsOpen(true);
    };

    const handleDeleteClick = () => {
        //todo
    };

    //returns a single parameterstep with containing parameters
    return (
        <Box ref={drag} style={{ opacity }} sx={{bgcolor: 'background.default' }}>
            <ListItemButton onClick={handleItemClick}>
                {expandButtonActive &&
                    <ListItemIcon onClick={handleExpandClick} >
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemIcon>
                }
                <ListItemText primary={title} />
                <InfoOutlinedIcon onClick={handleInfoClick} sx={{ mr: 1 }} />
                {showButtonActive && <VisibilityOutlinedIcon onClick={handleShowResultClick} sx={{ mr: 1 }} />}
                {deleteButtonActive && <DeleteOutlineOutlinedIcon onClick={handleDeleteClick} />}
            </ListItemButton>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {params.map(param => {
                        return (
                            <Parameter sx={{ pl: 4 }} parameterName={param.title} defaultValue={param.defaultValue} info={param.info} key={param.id} />
                        );
                    })}
                </List>
            </Collapse>
            <InformationPopup open={informationPopupIsOpen} onClose={handleClosePopup} headerText={title} text={info} />
        </Box>
    );
}