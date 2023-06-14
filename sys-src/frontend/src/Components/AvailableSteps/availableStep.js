import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDrag } from 'react-dnd'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InformationPopup from '../../ModalWindow/InformationPopup.js';

export default function AvailableStep(props) {
    const {title, params, info, id } = props;
    const [informationPopupIsOpen, setInformationPopupIsOpen] = useState(false);

    //function for move and copy to pipeline
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'AvailableStep',
        item: { title: title, params: params, info: info, id:id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }),
    );

    //variable to change opacity from dragged item
    const opacity = isDragging ? 0.2 : 1

    //function to close information popup
    const handleClosePopup = () => {
        setInformationPopupIsOpen(false);
    };

    //function to open modul window to show 
    const handleInfoClick = () => {
        setInformationPopupIsOpen(true);
    };

    //returns a single step with containing parameters
    return (
    <Box className={'single-step'} ref={drag} style={{ opacity }} sx={{bgcolor: 'background.default' }}>
            <ListItem>
                <ListItemText primary={title} />
                <InfoOutlinedIcon onClick={handleInfoClick} sx={{ mr: 1 }} />
            </ListItem>
            <InformationPopup open={informationPopupIsOpen} onClose={handleClosePopup} headerText={title} text={info} />
        </Box>
    );
}